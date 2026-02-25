"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Card } from "@/components/ui";
import { Phone, Mail, ChevronRight, AlertCircle, Loader2 } from "lucide-react";

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
                        phone: phone.startsWith("+") ? phone : `+591${phone}`, // Default to Bolivia if no prefix
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
                    // This part is for manual OTP if needed, but we prefer the link
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

    if (otpSent && method === "email") {
        return (
            <div className="min-h-screen flex flex-col px-6 py-12 bg-white animate-fade-in">
                <div className="flex-1 max-w-sm mx-auto w-full flex flex-col justify-center text-center space-y-8">
                    <div className="relative mx-auto w-32 h-32 bg-[var(--pais-green-50)] rounded-full flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full animate-ping bg-[var(--pais-green-200)] opacity-20"></div>
                        <Mail className="text-[var(--pais-green-600)]" size={56} />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold font-heading text-text-primary">Revisa tu correo</h1>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            Hemos enviado un enlace de acceso a:<br />
                            <span className="font-bold text-[var(--pais-green-700)] break-all">{email}</span>
                        </p>
                        <p className="text-lg text-text-secondary">
                            Haz clic en el enlace para entrar a PAIS de forma segura.
                        </p>
                    </div>

                    <div className="pt-8 space-y-4">
                        <Button
                            variant="secondary"
                            fullWidth
                            size="lg"
                            className="text-lg py-6"
                            onClick={() => setOtpSent(false)}
                        >
                            Volver a intentar
                        </Button>
                        <p className="text-sm text-text-secondary italic">
                            ¿No ves el correo? Revisa en tu carpeta de Spam.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col px-6 py-12 overflow-hidden bg-white/30">
            {/* Decorative Background Glows - This is what makes it feel "Alive" */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--pais-green-200)] blur-[120px] rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--pais-blue-100)] blur-[120px] rounded-full opacity-30"></div>
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-[var(--pais-orange-100)] blur-[100px] rounded-full opacity-20"></div>

            <div className="relative z-10 flex-1 max-w-sm mx-auto w-full flex flex-col justify-center">
                {/* Logo/Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="w-28 h-28 bg-gradient-to-br from-[var(--pais-green-400)] via-[var(--pais-green-600)] to-[var(--pais-blue-600)] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_20px_40px_-10px_rgba(0,186,97,0.4)] transform rotate-6 hover:rotate-0 transition-transform duration-500">
                        <span className="text-white font-heading text-6xl font-bold -rotate-6">P</span>
                    </div>
                    <h1 className="font-heading text-5xl font-black tracking-tighter text-gradient mb-2">PAIS</h1>
                    <p className="text-xl text-text-secondary font-medium italic">Tu vida, en equilibrio.</p>
                </div>

                <div className="glass p-8 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] mb-8 border border-white/40">
                    <form onSubmit={handleSignIn} className="space-y-8">
                        {step === "identifier" ? (
                            <>
                                {method === "phone" ? (
                                    <div className="space-y-3">
                                        <label htmlFor="phone" className="block text-xl font-bold text-[var(--pais-green-800)] ml-1">
                                            Tu número de celular
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pais-green-500)] to-[var(--pais-blue-500)] rounded-[1.5rem] opacity-0 group-focus-within:opacity-100 blur-[2px] transition-opacity duration-300"></div>
                                            <div className="relative h-18 bg-white/80 border-2 border-transparent group-focus-within:border-transparent rounded-[1.5rem] flex items-center px-5 ring-1 ring-black/5">
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
                                        <p className="text-sm text-[var(--pais-warm-500)] font-medium pl-2">
                                            Seguridad biométrica lista tras el SMS.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <label htmlFor="email" className="block text-xl font-bold text-[var(--pais-green-800)] ml-1">
                                            Correo electrónico
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pais-green-500)] to-[var(--pais-blue-500)] rounded-[1.5rem] opacity-0 group-focus-within:opacity-100 blur-[2px] transition-opacity duration-300"></div>
                                            <div className="relative h-18 bg-white/80 border-2 border-transparent group-focus-within:border-transparent rounded-[1.5rem] flex items-center px-5 ring-1 ring-black/5">
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
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center mb-4">
                                    <h2 className="text-2xl font-black text-text-primary">Ingresa el código</h2>
                                    <p className="text-lg text-text-secondary font-medium">
                                        Enviado a <span className="text-[var(--pais-green-600)]">{method === "phone" ? phone : email}</span>
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="000000"
                                    className="w-full h-24 text-center text-6xl tracking-[0.4em] font-black bg-white/50 border-2 border-[var(--pais-green-500)] rounded-[1.5rem] focus:outline-none focus:ring-8 focus:ring-[var(--pais-green-100)] transition-all shadow-inner"
                                    maxLength={6}
                                    required
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep("identifier")}
                                    className="w-full text-center text-[var(--pais-green-700)] font-bold py-2 hover:scale-105 transition-transform"
                                >
                                    ¿No recibiste nada? Reenviar
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-3 p-5 bg-red-50/80 backdrop-blur-md text-red-700 rounded-3xl border border-red-100 animate-shake">
                                <AlertCircle size={24} className="shrink-0" />
                                <p className="text-sm font-bold">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            loading={loading}
                            className="text-2xl py-10 rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,186,97,0.4)] bg-gradient-to-r from-[var(--pais-green-500)] to-[var(--pais-green-600)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {step === "identifier" ? (
                                <span className="flex items-center gap-3">
                                    Continuar <ChevronRight size={28} />
                                </span>
                            ) : "Acceder"}
                        </Button>
                    </form>
                </div>

                {/* Toggle method */}
                <button
                    onClick={() => {
                        setMethod(method === "phone" ? "email" : "phone");
                        setStep("identifier");
                        setError(null);
                    }}
                    className="flex items-center justify-center gap-3 py-6 text-text-secondary hover:text-[var(--pais-green-700)] transition-all font-bold text-lg"
                >
                    {method === "phone" ? (
                        <>
                            <Mail size={22} className="opacity-70" />
                            <span>Entrar con Correo</span>
                        </>
                    ) : (
                        <>
                            <Phone size={22} className="opacity-70" />
                            <span>Entrar con Celular</span>
                        </>
                    )}
                </button>

                {/* Register link */}
                <div className="mt-8 text-center pt-8 border-t border-black/[0.03]">
                    <p className="text-[var(--pais-warm-500)] text-xl font-medium mb-6">¿Eres nuevo en la comunidad?</p>
                    <Button
                        variant="secondary"
                        fullWidth
                        size="lg"
                        onClick={() => router.push("/register")}
                        className="group py-8 rounded-[1.5rem] bg-white hover:bg-[var(--pais-warm-50)] border-none shadow-md"
                    >
                        <span className="text-xl font-bold text-[var(--pais-green-700)] flex items-center gap-2">
                            Crear mi cuenta
                            <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
