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
            <div className="min-h-screen flex flex-col px-6 py-12 bg-[var(--pais-warm-50)] animate-fade-in">
                <div className="flex-1 max-w-sm mx-auto w-full flex flex-col justify-center text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Mail className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 font-heading">Revisa tu correo</h1>
                    <p className="text-lg text-text-secondary leading-tight mb-8">
                        Hemos enviado un enlace de acceso a <span className="font-bold text-text-primary">{email}</span>.
                        Haz clic en el enlace para confirmar tu identidad y entrar a PAIS.
                    </p>
                    <Button variant="secondary" onClick={() => setOtpSent(false)}>
                        Volver a intentar
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col px-6 py-12 bg-[var(--pais-warm-50)]">
            <div className="flex-1 max-w-sm mx-auto w-full flex flex-col justify-center">
                {/* Logo/Header */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white font-heading text-3xl font-bold">P</span>
                    </div>
                    <h1 className="font-heading text-3xl font-bold text-text-primary">PAIS</h1>
                    <p className="text-lg text-text-secondary mt-2">Bienvenido de nuevo</p>
                </div>

                <Card className="p-6 mb-6">
                    <form onSubmit={handleSignIn} className="space-y-6">
                        {step === "identifier" ? (
                            <>
                                {method === "phone" ? (
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="block text-xl font-medium text-text-primary">
                                            Tu número de celular
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={24} />
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="70000000"
                                                className="w-full h-16 pl-14 pr-4 text-2xl bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all font-medium"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                        <p className="text-sm text-text-secondary">
                                            Te enviaremos un código por SMS para entrar de forma segura.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-xl font-medium text-text-primary">
                                            Correo electrónico
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={24} />
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="tu@correo.com"
                                                className="w-full h-16 pl-14 pr-4 text-xl bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all font-medium"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-bold text-text-primary">Ingresa el código</h2>
                                    <p className="text-base text-text-secondary">
                                        Enviado a {method === "phone" ? phone : email}
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="000000"
                                    className="w-full h-20 text-center text-5xl tracking-[0.5em] font-bold bg-warm-50 border-3 border-green-500 rounded-[var(--radius-md)] focus:outline-none focus:ring-8 focus:ring-green-100 transition-all"
                                    maxLength={6}
                                    required
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep("identifier")}
                                    className="w-full text-center text-green-600 font-semibold py-2 hover:underline"
                                >
                                    ¿No recibiste el código? Volver a intentar
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-[var(--radius-md)] border border-red-200">
                                <AlertCircle size={20} className="shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            loading={loading}
                            className="text-xl"
                        >
                            {step === "identifier" ? "Enviar código" : "Entrar"}
                        </Button>
                    </form>
                </Card>

                {/* Toggle method */}
                <button
                    onClick={() => {
                        setMethod(method === "phone" ? "email" : "phone");
                        setStep("identifier");
                        setError(null);
                    }}
                    className="flex items-center justify-center gap-2 py-4 text-text-secondary hover:text-text-primary transition-colors"
                >
                    {method === "phone" ? (
                        <>
                            <Mail size={18} />
                            <span className="text-base font-medium">Usar correo electrónico</span>
                        </>
                    ) : (
                        <>
                            <Phone size={18} />
                            <span className="text-base font-medium">Usar número de celular</span>
                        </>
                    )}
                </button>

                {/* Register link */}
                <div className="mt-8 text-center pt-8 border-t border-warm-200">
                    <p className="text-text-secondary text-lg mb-4">¿Aún no tienes cuenta?</p>
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => router.push("/register")}
                        className="group"
                    >
                        Regístrate aquí
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
