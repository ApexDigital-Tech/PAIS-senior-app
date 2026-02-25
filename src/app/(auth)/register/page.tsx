"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, Input } from "@/components/ui";
import {
    User,
    Users,
    Stethoscope,
    HeartHandshake,
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
    Phone,
    Mail
} from "lucide-react";
import type { UserRole } from "@/types";

type Step = "role" | "details" | "otp" | "success";

const roles: { id: UserRole; title: string; desc: string; icon: typeof User; color: string }[] = [
    { id: "senior", title: "Senior", desc: "Para personas mayores que buscan autonomía y salud.", icon: User, color: "bg-green-100 text-green-700" },
    { id: "familiar", title: "Familiar", desc: "Para familiares que quieren cuidar y estar conectados.", icon: Users, color: "bg-blue-100 text-blue-700" },
    { id: "voluntario", title: "Voluntario", desc: "Para quienes desean brindar compañía y apoyo.", icon: HeartHandshake, color: "bg-purple-100 text-purple-700" },
    { id: "medico", title: "Médico", desc: "Para profesionales de salud que gestionan pacientes.", icon: Stethoscope, color: "bg-red-100 text-red-700" },
];

export default function RegisterPage() {
    const router = useRouter();
    const supabase = createClient();
    const [step, setStep] = useState<Step>("role");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [role, setRole] = useState<UserRole | null>(null);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [usePhone, setUsePhone] = useState(true);
    const [otp, setOtp] = useState("");

    const handleStartRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const identifier = usePhone ? (phone.startsWith("+") ? phone : `+591${phone}`) : email;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;

        try {
            const { error } = await supabase.auth.signInWithOtp(
                usePhone
                    ? { phone: identifier, options: { data: { full_name: fullName, role: role } } }
                    : {
                        email: identifier,
                        options: {
                            emailRedirectTo: `${appUrl}/dashboard`,
                            data: { full_name: fullName, role: role }
                        }
                    }
            );

            if (error) throw error;

            if (usePhone) {
                setStep("otp");
            } else {
                setStep("success"); // Show "Check your email" message
            }
        } catch (err: any) {
            setError(err.message || "Error al iniciar el registro");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const identifier = usePhone ? (phone.startsWith("+") ? phone : `+591${phone}`) : email;

        try {
            const { error } = await supabase.auth.verifyOtp(
                usePhone
                    ? { phone: identifier, token: otp, type: "sms" }
                    : { email: identifier, token: otp, type: "email" }
            );

            if (error) throw error;

            // Successful registration
            setStep("success");
        } catch (err: any) {
            setError(err.message || "Código inválido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--pais-warm-50)] py-12 px-6">
            <div className="max-w-md mx-auto w-full">

                {/* Progress header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-md mb-4">
                        <ShieldCheck size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold font-heading text-text-primary">Crear Cuenta</h1>
                    <p className="text-lg text-text-secondary mt-2">Únete a la familia PAIS</p>
                </div>

                {/* Step 1: Role Selection */}
                {step === "role" && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold text-text-primary text-center">¿Cuál será tu rol?</h2>
                        <div className="grid gap-4">
                            {roles.map((r) => {
                                const Icon = r.icon;
                                return (
                                    <button
                                        key={r.id}
                                        onClick={() => {
                                            setRole(r.id);
                                            setUsePhone(r.id === "senior" || r.id === "familiar");
                                            setStep("details");
                                        }}
                                        className={`flex items-center gap-4 p-5 text-left bg-surface rounded-[var(--radius-md)] border-2 border-border hover:border-green-500 hover:shadow-md transition-all active:scale-[0.98] group cursor-pointer focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none`}
                                    >
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${r.color}`}>
                                            <Icon size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-text-primary">{r.title}</h3>
                                            <p className="text-base text-text-secondary leading-tight">{r.desc}</p>
                                        </div>
                                        <ChevronRight size={20} className="text-warm-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-center text-text-secondary pt-4">
                            ¿Ya tienes cuenta? <button onClick={() => router.push("/login")} className="text-green-600 font-bold hover:underline">Inicia sesión</button>
                        </p>
                    </div>
                )}

                {/* Step 2: Personal Details */}
                {step === "details" && role && (
                    <div className="space-y-6 animate-fade-in">
                        <button
                            onClick={() => setStep("role")}
                            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 pr-4 py-2"
                        >
                            <ChevronLeft size={20} />
                            <span className="text-lg font-medium">Volver a elegir rol</span>
                        </button>

                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6 p-3 bg-warm-50 rounded-[var(--radius-md)] border border-border">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${roles.find(r => r.id === role)?.color}`}>
                                    {(() => {
                                        const Icon = roles.find(r => r.id === role)?.icon || User;
                                        return <Icon size={20} />;
                                    })()}
                                </div>
                                <p className="text-lg font-bold text-text-primary capitalize">Registrar como: {role}</p>
                            </div>

                            <form onSubmit={handleStartRegistration} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="block text-lg font-medium text-text-primary">
                                        Nombre completo
                                    </label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Ej. María García"
                                        className="w-full h-14 px-4 text-xl bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all font-medium"
                                        required
                                    />
                                </div>

                                {usePhone ? (
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="block text-lg font-medium text-text-primary">
                                            Tu número de celular
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="72030441"
                                                className="w-full h-14 pl-12 pr-4 text-xl bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-lg font-medium text-text-primary">
                                            Correo electrónico
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="tu@correo.com"
                                                className="w-full h-14 pl-12 pr-4 text-xl bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setUsePhone(!usePhone);
                                        setError(null);
                                    }}
                                    className="flex items-center gap-2 text-green-600 font-semibold text-base hover:underline py-1"
                                >
                                    {usePhone ? (
                                        <>
                                            <Mail size={16} />
                                            <span>Prefiero usar correo electrónico</span>
                                        </>
                                    ) : (
                                        <>
                                            <Phone size={16} />
                                            <span>Prefiero usar mi número de celular</span>
                                        </>
                                    )}
                                </button>

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
                                >
                                    Regístrame
                                </Button>
                            </form>
                        </Card>
                    </div>
                )}

                {/* Step 3: OTP Verification */}
                {step === "otp" && (
                    <div className="space-y-6 animate-fade-in">
                        <Card className="p-8 text-center">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-text-primary">Verificación</h2>
                                <p className="text-lg text-text-secondary mt-1">
                                    Ingresa el código enviado a {usePhone ? phone : email}
                                </p>
                            </div>

                            <form onSubmit={handleVerifyOtp} className="space-y-8">
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

                                {error && (
                                    <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-[var(--radius-md)] border border-red-200 text-left">
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="lg"
                                        loading={loading}
                                    >
                                        Confirmar Código
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setStep("details")}
                                        className="text-green-600 font-bold hover:underline py-2"
                                    >
                                        Cambiar datos
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </div>
                )}

                {/* Step 4: Success / Confirmation */}
                {step === "success" && (
                    <div className="animate-fade-in space-y-8 py-10 text-center">
                        <div className="relative mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                            <ShieldCheck size={48} className="text-white" />
                            <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20"></div>
                        </div>

                        {!usePhone ? (
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-text-primary">¡Confirma tu correo!</h2>
                                <p className="text-xl text-text-secondary max-w-sm mx-auto">
                                    Hemos enviado un **enlace de confirmación** a <span className="text-green-600 font-bold">{email}</span>.
                                </p>
                                <p className="text-lg text-text-secondary">
                                    Haz clic en el enlace para completar tu registro y entrar a PAIS.
                                </p>
                                <div className="pt-4">
                                    <Button variant="secondary" onClick={() => router.push("/login")}>
                                        Volver al inicio
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-text-primary">¡Bienvenido!</h2>
                                <p className="text-xl text-text-secondary max-w-[280px] mx-auto">
                                    Tu cuenta ha sido creada exitosamente. Estamos felices de tenerte aquí.
                                </p>
                                <Button
                                    size="lg"
                                    fullWidth
                                    onClick={() => router.push("/dashboard")}
                                    className="text-xl mt-6"
                                >
                                    Comenzar ahora
                                </Button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
