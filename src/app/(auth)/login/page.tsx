"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Card } from "@/components/ui";
import { Phone, Mail, ChevronRight, AlertCircle, Loader2, Chrome } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [method, setMethod] = useState<"phone" | "email">("phone");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<"identifier" | "otp">("identifier");

    // State for inputs
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;

            if (method === "phone") {
                if (step === "identifier") {
                    const { error } = await supabase.auth.signInWithOtp({
                        phone: phone.startsWith("+") ? phone : `+591${phone}`,
                    });
                    if (error) throw error;
                    setStep("otp");
                } else {
                    const { error } = await supabase.auth.verifyOtp({
                        phone: phone.startsWith("+") ? phone : `+591${phone}`,
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
                            emailRedirectTo: `${appUrl}/dashboard`,
                        }
                    });
                    if (error) throw error;
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
            setError(err.message || "Ocurrió un error al intentar iniciar sesión");
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
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || "Error al conectar con Google");
            setLoading(false);
        }
    };

    if (otpSent && method === "email") {
        return (
            <div className="min-h-screen flex flex-col px-6 py-12 bg-[var(--pais-warm-50)] animate-fade-in relative overflow-hidden">
                <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[var(--pais-green-200)] blur-[100px] rounded-full opacity-20"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--pais-blue-100)] blur-[120px] rounded-full opacity-30"></div>

                <div className="relative z-10 flex-1 max-w-sm mx-auto w-full flex flex-col justify-center text-center space-y-10">
                    <div className="relative mx-auto w-40 h-40">
                        <div className="absolute inset-0 bg-[var(--pais-green-500)] rounded-[3rem] opacity-10 animate-pulse"></div>
                        <div className="absolute inset-2 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center border border-[var(--pais-green-100)]">
                            <Mail className="text-[var(--pais-green-600)]" size={64} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl font-extrabold font-heading text-text-primary tracking-tight">¡Revisa tu buzón!</h1>
                        <p className="text-xl text-text-secondary leading-relaxed font-medium">
                            Hemos enviado un botón mágico de acceso a:<br />
                            <span className="block mt-2 font-bold text-[var(--pais-green-700)] text-2xl truncate px-2">{email}</span>
                        </p>
                        <div className="bg-white/60 p-6 rounded-[2rem] border border-white mx-auto max-w-xs shadow-sm shadow-black/5">
                            <p className="text-lg text-text-secondary font-medium italic">
                                "Haz clic en el enlace del correo y estarás dentro. ¡Así de fácil!"
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 space-y-6">
                        <Button
                            variant="secondary"
                            fullWidth
                            size="lg"
                            className="text-xl py-10 rounded-[1.5rem] shadow-lg border-2"
                            onClick={() => setOtpSent(false)}
                        >
                            Usar otro medio
                        </Button>
                        <p className="text-base text-text-secondary italic">
                            ¿No ves el correo? Revisa en tu carpeta de Spam.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col px-6 py-12 overflow-hidden bg-[var(--pais-warm-50)]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--pais-green-100)] blur-[120px] rounded-full opacity-30"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--pais-blue-100)] blur-[120px] rounded-full opacity-30"></div>

            <div className="relative z-10 flex-1 max-w-sm mx-auto w-full flex flex-col justify-center">
                <div className="text-center mb-10 animate-fade-in">
                    <div className="w-24 h-24 bg-gradient-to-br from-[var(--pais-green-400)] via-[var(--pais-green-600)] to-[var(--pais-blue-600)] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl transform rotate-6">
                        <span className="text-white font-heading text-5xl font-bold -rotate-6">P</span>
                    </div>
                    <h1 className="font-heading text-4xl font-black tracking-tight text-[var(--pais-green-900)] mb-1">Entrar a PAIS</h1>
                    <p className="text-lg text-text-secondary font-medium">Acceso rápido y seguro</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-[var(--pais-warm-100)]">
                    <div className="flex flex-col gap-6">
                        <Button
                            onClick={handleGoogleSignIn}
                            fullWidth
                            variant="secondary"
                            className="h-20 rounded-[1.5rem] border-2 border-[var(--pais-warm-200)] hover:border-[var(--pais-green-300)] hover:bg-[var(--pais-green-50)] active:scale-95 transition-all text-xl font-bold"
                            disabled={loading}
                        >
                            <div className="flex items-center gap-4 text-[var(--pais-warm-900)]">
                                <Chrome className="text-[var(--pais-green-600)]" size={32} />
                                Entrar con Google
                            </div>
                        </Button>

                        <div className="flex items-center gap-4 py-2">
                            <div className="h-px bg-[var(--pais-warm-200)] flex-1"></div>
                            <span className="text-sm font-bold text-text-secondary uppercase">o con tu celular/correo</span>
                            <div className="h-px bg-[var(--pais-warm-200)] flex-1"></div>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-6">
                            {step === "identifier" ? (
                                <>
                                    {method === "phone" ? (
                                        <div className="space-y-3">
                                            <label htmlFor="phone" className="block text-xl font-bold text-[var(--pais-green-800)] ml-1">
                                                Número de Celular
                                            </label>
                                            <div className="h-20 bg-[var(--pais-warm-50)] border-2 border-transparent focus-within:border-[var(--pais-green-500)] focus-within:bg-white rounded-[1.5rem] flex items-center px-6 transition-all ring-1 ring-black/5">
                                                <Phone className="text-[var(--pais-green-600)]" size={24} />
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="70000000"
                                                    className="w-full h-full ml-4 text-2xl bg-transparent border-none focus:outline-none placeholder:text-[var(--pais-warm-300)] font-bold text-[var(--pais-warm-900)]"
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <label htmlFor="email" className="block text-xl font-bold text-[var(--pais-green-800)] ml-1">
                                                Tu Correo
                                            </label>
                                            <div className="h-20 bg-[var(--pais-warm-50)] border-2 border-transparent focus-within:border-[var(--pais-green-500)] focus-within:bg-white rounded-[1.5rem] flex items-center px-6 transition-all ring-1 ring-black/5">
                                                <Mail className="text-[var(--pais-green-600)]" size={24} />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="tu@correo.com"
                                                    className="w-full h-full ml-4 text-xl bg-transparent border-none focus:outline-none placeholder:text-[var(--pais-warm-300)] font-bold text-[var(--pais-warm-900)]"
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="space-y-6 text-center">
                                    <h2 className="text-2xl font-bold text-text-primary">Escribe el código</h2>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="000000"
                                        className="w-full h-24 text-center text-6xl tracking-[0.4em] font-black bg-[var(--pais-warm-50)] border-2 border-[var(--pais-green-500)] rounded-[1.5rem] focus:outline-none focus:ring-8 focus:ring-[var(--pais-green-100)] transition-all"
                                        maxLength={6}
                                        required
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setStep("identifier")}
                                        className="text-[var(--pais-green-700)] font-bold text-lg hover:underline"
                                    >
                                        Reenviar código
                                    </button>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 animate-shake">
                                    <AlertCircle size={24} className="shrink-0" />
                                    <p className="text-sm font-bold">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                loading={loading}
                                className="h-20 text-2xl font-black rounded-[1.5rem] bg-gradient-to-r from-[var(--pais-green-500)] to-[var(--pais-green-600)] shadow-lg shadow-green-200"
                            >
                                {step === "identifier" ? "Continuar" : "Entrar"}
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 items-center">
                    <button
                        onClick={() => {
                            setMethod(method === "phone" ? "email" : "phone");
                            setStep("identifier");
                            setError(null);
                        }}
                        className="text-text-secondary font-bold hover:text-[var(--pais-green-700)] transition-colors flex items-center gap-2"
                    >
                        {method === "phone" ? <Mail size={18} /> : <Phone size={18} />}
                        Usar {method === "phone" ? "Correo" : "Celular"}
                    </button>

                    <div className="pt-6 border-t border-black/5 w-full text-center">
                        <p className="text-[var(--pais-warm-500)] font-medium mb-4 italic">¿Eres nuevo?</p>
                        <Button
                            variant="ghost"
                            fullWidth
                            onClick={() => router.push("/register")}
                            className="h-16 text-xl font-bold text-[var(--pais-green-700)]"
                        >
                            Crear una cuenta <ChevronRight size={20} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
