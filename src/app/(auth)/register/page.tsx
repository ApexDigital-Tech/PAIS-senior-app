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
    Mail,
    Chrome
} from "lucide-react";
import type { UserRole } from "@/types";

type Step = "role" | "details" | "otp" | "success";

const roles: { id: UserRole; title: string; desc: string; icon: typeof User; color: string; bg: string }[] = [
    { id: "senior", title: "Senior", desc: "Para personas mayores que buscan autonomía y salud.", icon: User, color: "text-[var(--pais-green-700)]", bg: "bg-[var(--pais-green-50)]" },
    { id: "familiar", title: "Familiar", desc: "Para familiares que quieren cuidar y estar conectados.", icon: Users, color: "text-[var(--pais-blue-700)]", bg: "bg-[var(--pais-blue-50)]" },
    { id: "voluntario", title: "Voluntario", desc: "Para quienes desean brindar compañía y apoyo.", icon: HeartHandshake, color: "text-[var(--pais-orange-700)]", bg: "bg-[var(--pais-orange-50)]" },
    { id: "medico", title: "Médico", desc: "Para profesionales de salud que gestionan pacientes.", icon: Stethoscope, color: "text-red-700", bg: "bg-red-50" },
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

            setStep("success");
        } catch (err: any) {
            setError(err.message || "Código inválido");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!role) {
            setError("Por favor, selecciona un rol primero");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    }
                }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || "Error al conectar con Google");
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[var(--pais-warm-50)] py-12 px-6 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[var(--pais-green-100)] blur-[100px] rounded-full opacity-30"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--pais-blue-100)] blur-[120px] rounded-full opacity-30"></div>

            <div className="relative z-10 max-w-sm mx-auto w-full">

                {/* Header */}
                <div className="mb-10 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-[var(--pais-green-400)] via-[var(--pais-green-600)] to-[var(--pais-blue-600)] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl transform rotate-6">
                        <span className="text-white font-heading text-4xl font-bold -rotate-6">P</span>
                    </div>
                    <h1 className="text-3xl font-black font-heading text-[var(--pais-green-900)] tracking-tight">Crea tu cuenta</h1>
                    <p className="text-lg text-text-secondary font-medium">Únete a nuestra comunidad segura</p>
                </div>

                {/* Step 1: Role Selection */}
                {step === "role" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold text-text-primary">¿Quién eres tú?</h2>
                        </div>
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
                                        className={`flex items-center gap-4 p-6 bg-white rounded-[2rem] border-2 border-transparent hover:border-[var(--pais-green-400)] hover:shadow-xl transition-all active:scale-95 group shadow-sm ring-1 ring-black/5`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${r.bg} ${r.color}`}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-black text-[var(--pais-warm-900)]">{r.title}</h3>
                                            <p className="text-sm text-text-secondary font-medium leading-tight">{r.desc}</p>
                                        </div>
                                        <ChevronRight size={20} className="text-[var(--pais-warm-300)] group-hover:text-[var(--pais-green-600)] transition-transform group-hover:translate-x-1" />
                                    </button>
                                );
                            })}
                        </div>
                        <div className="text-center pt-8 border-t border-black/5">
                            <p className="text-[var(--pais-warm-500)] font-medium mb-3">¿Ya tienes una cuenta?</p>
                            <Button
                                variant="ghost"
                                fullWidth
                                onClick={() => router.push("/login")}
                                className="text-lg font-bold text-[var(--pais-green-700)]"
                            >
                                Inicia sesión aquí
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Personal Details */}
                {step === "details" && role && (
                    <div className="space-y-6 animate-fade-in">
                        <button
                            onClick={() => setStep("role")}
                            className="flex items-center gap-2 text-text-secondary hover:text-[var(--pais-green-700)] mb-4 font-bold"
                        >
                            <ChevronLeft size={20} />
                            <span>Volver a elegir rol</span>
                        </button>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-[var(--pais-warm-100)]">
                            <div className="flex items-center gap-4 mb-8 p-4 bg-[var(--pais-warm-50)] rounded-2xl">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${roles.find(r => r.id === role)?.bg} ${roles.find(r => r.id === role)?.color}`}>
                                    {(() => {
                                        const Icon = roles.find(r => r.id === role)?.icon || User;
                                        return <Icon size={20} />;
                                    })()}
                                </div>
                                <p className="text-lg font-black text-[var(--pais-warm-900)]">Soy: <span className="capitalize">{role}</span></p>
                            </div>

                            <div className="flex flex-col gap-6 mb-8">
                                <Button
                                    onClick={handleGoogleSignUp}
                                    variant="secondary"
                                    className="h-16 rounded-2xl border-2 border-[var(--pais-warm-200)] hover:bg-[var(--pais-green-50)] transition-all font-bold text-[var(--pais-warm-900)]"
                                >
                                    <Chrome className="text-[var(--pais-green-600)] mr-3" size={24} />
                                    Registro rápido con Google
                                </Button>

                                <div className="flex items-center gap-3">
                                    <div className="h-px bg-[var(--pais-warm-200)] flex-1"></div>
                                    <span className="text-xs font-bold text-[var(--pais-warm-400)] uppercase tracking-widest">o con tus datos</span>
                                    <div className="h-px bg-[var(--pais-warm-200)] flex-1"></div>
                                </div>
                            </div>

                            <form onSubmit={handleStartRegistration} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="block text-lg font-bold text-[var(--pais-green-800)] ml-1">
                                        Nombre completo
                                    </label>
                                    <div className="h-16 bg-[var(--pais-warm-50)] border-2 border-transparent focus-within:border-[var(--pais-green-500)] focus-within:bg-white rounded-2xl flex items-center px-5 transition-all">
                                        <User className="text-[var(--pais-green-600)]" size={20} />
                                        <input
                                            id="fullName"
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Tu nombre aquí"
                                            className="w-full h-full ml-4 text-xl bg-transparent border-none focus:outline-none placeholder:text-[var(--pais-warm-300)] font-bold text-[var(--pais-warm-900)]"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {usePhone ? (
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="block text-lg font-bold text-[var(--pais-green-800)] ml-1">
                                            Tu celular
                                        </label>
                                        <div className="h-16 bg-[var(--pais-warm-50)] border-2 border-transparent focus-within:border-[var(--pais-green-500)] focus-within:bg-white rounded-2xl flex items-center px-5 transition-all">
                                            <Phone className="text-[var(--pais-green-600)]" size={20} />
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="70000000"
                                                className="w-full h-full ml-4 text-xl bg-transparent border-none focus:outline-none placeholder:text-[var(--pais-warm-300)] font-bold text-[var(--pais-warm-900)]"
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-lg font-bold text-[var(--pais-green-800)] ml-1">
                                            Tu correo
                                        </label>
                                        <div className="h-16 bg-[var(--pais-warm-50)] border-2 border-transparent focus-within:border-[var(--pais-green-500)] focus-within:bg-white rounded-2xl flex items-center px-5 transition-all">
                                            <Mail className="text-[var(--pais-green-600)]" size={20} />
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="ejemplo@correo.com"
                                                className="w-full h-full ml-4 text-lg bg-transparent border-none focus:outline-none placeholder:text-[var(--pais-warm-300)] font-bold text-[var(--pais-warm-900)]"
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
                                    className="text-[var(--pais-green-700)] font-bold text-sm hover:underline"
                                >
                                    {usePhone ? "Registrarse con correo" : "Registrarse con celular"}
                                </button>

                                {error && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p className="text-sm font-bold">{error}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    loading={loading}
                                    className="h-20 text-2xl font-black rounded-2xl bg-gradient-to-r from-[var(--pais-green-500)] to-[var(--pais-green-600)] shadow-lg shadow-green-100"
                                >
                                    ¡Registrarme!
                                </Button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Step 3: OTP Verification */}
                {step === "otp" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-[var(--pais-warm-100)] text-center">
                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-[var(--pais-warm-900)]">Verificación</h2>
                                <p className="text-lg text-text-secondary font-medium mt-2">
                                    Copia el código enviado a tu celular
                                </p>
                            </div>

                            <form onSubmit={handleVerifyOtp} className="space-y-8">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="000000"
                                    className="w-full h-24 text-center text-6xl tracking-[0.4em] font-black bg-[var(--pais-warm-50)] border-3 border-[var(--pais-green-500)] rounded-3xl focus:outline-none focus:ring-12 focus:ring-[var(--pais-green-50)] transition-all"
                                    maxLength={6}
                                    required
                                    autoFocus
                                />

                                {error && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-left">
                                        <AlertCircle size={24} className="shrink-0" />
                                        <p className="text-sm font-bold">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="lg"
                                        loading={loading}
                                        className="h-20 text-2xl font-black rounded-2xl"
                                    >
                                        Verificar ahora
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setStep("details")}
                                        className="text-[var(--pais-green-700)] font-bold text-lg hover:underline"
                                    >
                                        Corregir mis datos
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Step 4: Success / Confirmation */}
                {step === "success" && (
                    <div className="animate-fade-in space-y-10 py-6 text-center">
                        <div className="relative mx-auto w-40 h-40">
                            <div className="absolute inset-0 bg-[var(--pais-green-500)] rounded-[3rem] opacity-10 animate-pulse"></div>
                            <div className="absolute inset-2 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center">
                                <ShieldCheck size={72} className="text-[var(--pais-green-600)]" />
                            </div>
                        </div>

                        {!usePhone ? (
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-black font-heading text-[var(--pais-warm-900)]">¡Confirma tu correo!</h2>
                                    <p className="text-xl text-text-secondary leading-relaxed font-medium">
                                        Hemos enviado un botón de acceso a:<br />
                                        <span className="text-[var(--pais-green-700)] font-bold block mt-2 text-2xl break-all px-2">{email}</span>
                                    </p>
                                </div>
                                <div className="bg-white/60 p-6 rounded-3xl border border-white max-w-xs mx-auto shadow-sm">
                                    <p className="text-lg text-text-secondary font-medium italic">
                                        "Solo abre tu correo y haz clic en el botón. ¡Así de simple!"
                                    </p>
                                </div>
                                <div className="pt-8 space-y-6">
                                    <Button
                                        variant="secondary"
                                        fullWidth
                                        size="lg"
                                        className="h-16 text-xl font-bold rounded-2xl border-2"
                                        onClick={() => router.push("/login")}
                                    >
                                        Ir al inicio de sesión
                                    </Button>
                                    <p className="text-base text-text-secondary italic">
                                        ¿No ves el correo? Revisa tu carpeta de Spam.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <h2 className="text-4xl font-black font-heading text-[var(--pais-warm-900)] tracking-tight">¡Bienvenido!</h2>
                                    <p className="text-xl text-text-secondary max-w-[320px] mx-auto leading-relaxed font-medium">
                                        Tu cuenta ha sido creada. Estamos felices de cuidarte.
                                    </p>
                                </div>
                                <Button
                                    size="lg"
                                    fullWidth
                                    onClick={() => router.push("/dashboard")}
                                    className="h-20 text-2xl font-black rounded-2xl bg-gradient-to-r from-[var(--pais-green-500)] to-[var(--pais-green-600)] shadow-xl"
                                >
                                    ¡Comenzar ahora!
                                </Button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
