"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, ChevronLeft, AlertCircle, Loader2, Chrome, Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();

    const [method, setMethod] = useState<"phone" | "email">("email");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<"identifier" | "otp">("identifier");

    // Form inputs
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    // Handle URL errors (like otp_expired)
    useEffect(() => {
        const errorDescription = searchParams.get("error_description");
        if (errorDescription) {
            if (errorDescription.includes("expired")) {
                setError("El enlace de acceso ha caducado. Por favor, solicita uno nuevo.");
            } else {
                setError(errorDescription);
            }
        }
    }, [searchParams]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;

            if (method === "phone") {
                const formattedPhone = phone.startsWith("+") ? phone : `+591${phone}`;
                if (step === "identifier") {
                    const { error } = await supabase.auth.signInWithOtp({
                        phone: formattedPhone,
                    });
                    if (error) throw error;
                    setStep("otp");
                } else {
                    const { error } = await supabase.auth.verifyOtp({
                        phone: formattedPhone,
                        token: otp,
                        type: "sms",
                    });
                    if (error) throw error;
                    router.push("/dashboard");
                }
            } else {
                if (step === "identifier") {
                    const { error } = await supabase.auth.signInWithOtp({
                        email,
                        options: {
                            emailRedirectTo: `${appUrl}/auth/callback?next=/dashboard`,
                        }
                    });
                    if (error) {
                        if (error.message.includes("9 seconds")) {
                            throw new Error("Por seguridad, debes esperar unos segundos antes de pedir otro enlace.");
                        }
                        throw error;
                    }
                    setOtpSent(true);
                } else {
                    const { error } = await supabase.auth.verifyOtp({
                        email,
                        token: otp,
                        type: "email",
                    });
                    if (error) throw error;
                    router.push("/dashboard");
                }
            }
        } catch (err: any) {
            setError(err.message || "Algo no salió bien. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`
                }
            });
            if (error) throw error;
        } catch (err: any) {
            setError("No pudimos conectar con Google. Revisa tu conexión.");
            setLoading(false);
        }
    };

    if (otpSent && method === "email") {
        return (
            <div className="min-h-screen flex flex-col bg-warm-50 font-sans p-6 items-center justify-center text-center animate-fade-in">
                <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border-[12px] border-white ring-1 ring-black/5 max-w-xl w-full">
                    <div className="bg-green-100 p-8 rounded-[2rem] text-green-600 mb-10 inline-block">
                        <Mail size={80} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-5xl font-black text-warm-900 mb-6 font-heading tracking-tight">¡Revisa tu correo!</h1>
                    <p className="text-2xl text-warm-600 font-medium leading-relaxed mb-10">
                        Hemos enviado un botón mágico de acceso a:
                        <span className="block mt-4 text-green-600 font-black text-3xl break-all px-4">{email}</span>
                    </p>
                    <div className="bg-warm-50/50 p-8 rounded-3xl border-2 border-dashed border-warm-200 mb-12 italic text-xl text-warm-500 font-medium">
                        "Solo toca el botón en el correo y estarás dentro. ¡Así de fácil!"
                    </div>
                    <Button
                        variant="outline"
                        fullWidth
                        size="default"
                        className="h-14 text-lg font-bold rounded-xl"
                        onClick={() => setOtpSent(false)}
                    >
                        Intentar otra forma
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-warm-50 font-sans p-6 items-center justify-center relative overflow-hidden">
            {/* Decorative Blobs (Stitch Aesthetic) */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] bg-green-200/50 rounded-full blur-[150px] animate-pulse-slow"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[40rem] h-[40rem] bg-blue-200/50 rounded-full blur-[150px] animate-pulse-slow"></div>
            </div>

            <div className="max-w-xl w-full space-y-12">
                {/* Logo Section */}
                <div className="text-center animate-fade-in">
                    <div
                        className="w-16 h-16 bg-green-500 p-2 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-500/20 mx-auto mb-6 cursor-pointer active:scale-90 transition-transform"
                        onClick={() => router.push("/")}
                    >
                        <Heart size={32} fill="white" />
                    </div>
                    <h1 className="text-4xl font-black text-warm-900 font-heading tracking-tight">Entrar a PAIS</h1>
                    <p className="text-xl text-warm-500 font-bold mt-1">Acceso rápido y seguro</p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white ring-1 ring-black/5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <div className="space-y-10">
                        <Button
                            onClick={handleGoogleSignIn}
                            fullWidth
                            variant="secondary"
                            className="h-14 rounded-xl border-2 border-warm-100 bg-white hover:border-green-500/30 hover:bg-green-50/50 active:scale-95 transition-all text-xl font-bold"
                            disabled={loading}
                        >
                            <div className="flex items-center gap-4 text-warm-900">
                                <Chrome className="text-green-500" size={24} />
                                <span>Entrar con Google</span>
                            </div>
                        </Button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t-2 border-warm-100"></div>
                            <span className="flex-shrink mx-6 text-sm font-black text-warm-400 uppercase tracking-[0.2em]">O CON TU CUENTA</span>
                            <div className="flex-grow border-t-2 border-warm-100"></div>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-8">
                            <AnimatePresence mode="wait">
                                {step === "identifier" ? (
                                    <motion.div
                                        key="identifier"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-between items-end mb-2 px-1">
                                            <label className="text-xl font-black text-warm-900 font-heading">
                                                {method === "email" ? "Tu Correo" : "Número de Celular"}
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setMethod(method === "email" ? "phone" : "email")}
                                                className="text-base font-bold text-green-600 hover:underline"
                                            >
                                                Usar {method === "email" ? "Celular" : "Correo"}
                                            </button>
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-300 group-focus-within:text-green-500 transition-colors">
                                                {method === "email" ? <Mail size={24} /> : <Phone size={24} />}
                                            </div>
                                            <input
                                                type={method === "email" ? "email" : "tel"}
                                                value={method === "email" ? email : phone}
                                                onChange={(e) => method === "email" ? setEmail(e.target.value) : setPhone(e.target.value)}
                                                placeholder={method === "email" ? "tu@correo.com" : "70000000"}
                                                className="w-full h-16 pl-14 pr-6 text-xl font-bold bg-warm-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-xl outline-none transition-all shadow-inner"
                                                required
                                            />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="otp"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8 text-center"
                                    >
                                        <div className="flex items-center gap-4 text-warm-500 mb-4">
                                            <button onClick={() => setStep("identifier")} className="p-2 hover:bg-warm-100 rounded-full transition-colors">
                                                <ChevronLeft size={32} />
                                            </button>
                                            <span className="text-xl font-bold">Verificar código</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="000000"
                                            className="w-full h-20 text-center text-4xl tracking-[0.2em] font-black bg-warm-50 border-2 border-green-500 rounded-2xl focus:ring-8 focus:ring-green-50 outline-none transition-all"
                                            maxLength={6}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setStep("identifier")}
                                            className="text-green-600 font-black text-xl hover:underline"
                                        >
                                            Reenviar código
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-8 bg-red-50 border-4 border-red-100 rounded-[2rem] flex items-start gap-5 text-red-900"
                                >
                                    <AlertCircle className="shrink-0 mt-1" size={32} />
                                    <p className="text-xl font-black leading-tight">{error}</p>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                loading={loading}
                                className="h-16 text-xl font-bold rounded-2xl bg-green-500 shadow-xl shadow-green-500/20 active:scale-95"
                            >
                                {step === "identifier" ? "Continuar" : "Entrar a PAIS"}
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <p className="text-xl font-bold text-warm-500 mb-6">¿Aún no tienes cuenta?</p>
                    <button
                        onClick={() => router.push("/register")}
                        className="inline-flex items-center gap-4 text-green-600 text-2xl font-black hover:gap-6 transition-all"
                    >
                        Crear una ahora <ArrowRight size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-warm-50 flex items-center justify-center"><Loader2 className="animate-spin text-green-500" size={64} /></div>}>
            <LoginContent />
        </Suspense>
    );
}
