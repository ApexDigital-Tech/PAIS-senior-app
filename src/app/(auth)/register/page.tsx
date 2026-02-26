"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
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
    Chrome,
    Heart,
    ArrowRight,
    Car
} from "lucide-react";
import type { UserRole } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type Step = "role" | "details" | "otp" | "success";

const roles: { id: UserRole; title: string; desc: string; icon: any; color: string; bg: string; border: string }[] = [
    { id: "senior", title: "Senior", desc: "Personas mayores buscando salud y autonomía.", icon: User, color: "text-green-600", bg: "bg-green-50", border: "group-hover:border-green-500/30" },
    { id: "familiar", title: "Familiar", desc: "Para hijos y nietos que quieren estar cerca.", icon: Heart, color: "text-blue-600", bg: "bg-blue-50", border: "group-hover:border-blue-500/30" },
    { id: "voluntario", title: "Voluntario", desc: "Para quienes desean brindar compañía.", icon: HeartHandshake, color: "text-orange-600", bg: "bg-orange-50", border: "group-hover:border-orange-500/30" },
    { id: "medico", title: "Médico", desc: "Profesionales gestionando pacientes.", icon: Stethoscope, color: "text-red-600", bg: "bg-red-50", border: "group-hover:border-red-500/30" },
    { id: "conductor", title: "Conductor", desc: "Choferes verificados para traslados.", icon: Car, color: "text-purple-600", bg: "bg-purple-50", border: "group-hover:border-purple-500/30" },
];

function RegisterContent() {
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
                            emailRedirectTo: `${appUrl}/auth/confirm?next=/dashboard`,
                            data: { full_name: fullName, role: role }
                        }
                    }
            );

            if (error) {
                if (error.message.includes("9 seconds")) {
                    throw new Error("Por seguridad, espera unos segundos antes de intentar de nuevo.");
                }
                throw error;
            }

            if (usePhone) {
                setStep("otp");
            } else {
                setStep("success");
            }
        } catch (err: any) {
            setError(err.message || "Error al iniciar el registro. Revisa tus datos.");
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
            router.push("/dashboard");
        } catch (err: any) {
            setError("El código es incorrecto o ha caducado.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!role) {
            setError("Por favor, selecciona para quién es la cuenta.");
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
            setError("Error al conectar con Google.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-warm-50 font-sans p-6 items-center justify-start relative overflow-x-hidden">
            {/* Immersive Background */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-green-200/40 rounded-full blur-[160px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-blue-200/40 rounded-full blur-[160px] animate-pulse-slow"></div>
            </div>

            <div className="max-w-xl w-full pt-10 pb-20 space-y-12">
                {/* Header Section */}
                <div className="text-center animate-fade-in">
                    <div
                        className="w-16 h-16 bg-green-500 p-2 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-500/20 mx-auto mb-6 cursor-pointer rotate-3 active:scale-90 transition-transform"
                        onClick={() => router.push("/")}
                    >
                        <Heart size={32} fill="white" />
                    </div>
                    <h1 className="text-4xl font-black text-warm-900 font-heading tracking-tight">Crea tu cuenta</h1>
                    <p className="text-xl text-warm-500 font-bold mt-1">Únete a la red PAIS</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1: Role Selection */}
                    {step === "role" && (
                        <motion.div
                            key="role-step"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="space-y-10"
                        >
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-warm-900 font-heading tracking-tight">¿Quién usará la plataforma?</h2>
                            </div>
                            <div className="grid gap-6">
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
                                            className={`group flex items-center gap-6 p-6 bg-white rounded-3xl border-2 border-white shadow-lg hover:shadow-xl transition-all active:scale-95 text-left ring-1 ring-black/5 ${r.border}`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${r.bg} ${r.color} group-hover:scale-110 transition-transform duration-500`}>
                                                <Icon size={24} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-warm-900 font-heading leading-tight mb-0.5">{r.title}</h3>
                                                <p className="text-base text-warm-500 font-semibold leading-tight">{r.desc}</p>
                                            </div>
                                            <ChevronRight size={24} className="text-warm-200 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="text-center pt-8 border-t-2 border-warm-100">
                                <p className="text-xl font-bold text-warm-400 mb-6 italic">¿Ya tienes cuenta?</p>
                                <Button
                                    variant="outline"
                                    fullWidth
                                    onClick={() => router.push("/login")}
                                    className="h-14 text-xl font-black rounded-xl bg-white border-green-500 text-green-600"
                                >
                                    Inicia sesión aquí
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Personal Details */}
                    {step === "details" && role && (
                        <motion.div
                            key="details-step"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="space-y-8"
                        >
                            <button
                                onClick={() => setStep("role")}
                                className="flex items-center gap-2 text-warm-400 hover:text-green-600 transition-colors font-bold text-xl"
                            >
                                <ChevronLeft size={24} />
                                <span>Volver</span>
                            </button>

                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-8 border-white ring-1 ring-black/5">
                                <form onSubmit={handleStartRegistration} className="space-y-8">
                                    <div className="flex items-center gap-4 p-4 bg-warm-50 rounded-2xl border-2 border-warm-100">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-sm ${roles.find(r => r.id === role)?.color}`}>
                                            {(() => {
                                                const Icon = roles.find(r => r.id === role)?.icon || User;
                                                return <Icon size={20} strokeWidth={2.5} />;
                                            })()}
                                        </div>
                                        <p className="text-lg font-bold text-warm-900">Soy: <span className="capitalize text-green-600 font-black">{role}</span></p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Name field */}
                                        <div className="space-y-2">
                                            <label className="text-lg font-bold text-warm-900 ml-1">Nombre completo</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-300 group-focus-within:text-green-500 transition-colors">
                                                    <User size={24} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Escribe tu nombre"
                                                    className="w-full h-14 pl-14 pr-6 text-lg font-bold bg-warm-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-xl outline-none transition-all shadow-inner"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Identifier field */}
                                        <div className="space-y-2">
                                            <label className="text-lg font-bold text-warm-900 ml-1">
                                                {usePhone ? "Tu celular" : "Tu correo"}
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-300 group-focus-within:text-green-500 transition-colors">
                                                    {usePhone ? <Phone size={24} /> : <Mail size={24} />}
                                                </div>
                                                <input
                                                    type={usePhone ? "tel" : "email"}
                                                    value={usePhone ? phone : email}
                                                    onChange={(e) => usePhone ? setPhone(e.target.value) : setEmail(e.target.value)}
                                                    placeholder={usePhone ? "70000000" : "hola@pais.com"}
                                                    className="w-full h-14 pl-14 pr-6 text-lg font-bold bg-warm-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-xl outline-none transition-all shadow-inner"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => { setUsePhone(!usePhone); setError(null); }}
                                        className="text-green-600 font-black text-lg hover:underline block mx-auto"
                                    >
                                        Usar {usePhone ? "correo" : "celular"} para registrarme
                                    </button>

                                    {error && (
                                        <div className="p-8 bg-red-50 border-4 border-red-100 rounded-[2rem] flex items-start gap-5 text-red-900">
                                            <AlertCircle className="shrink-0 mt-1" size={32} />
                                            <p className="text-xl font-black leading-tight">{error}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="lg"
                                        loading={loading}
                                        className="h-16 text-xl font-bold rounded-2xl bg-green-500 shadow-xl shadow-green-500/20 active:scale-95"
                                    >
                                        ¡Registrarme ya!
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: OTP */}
                    {step === "otp" && (
                        <motion.div
                            key="otp-step"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-10 rounded-3xl shadow-xl border-8 border-white ring-1 ring-black/5 text-center space-y-8"
                        >
                            <h2 className="text-3xl font-black text-warm-900 font-heading tracking-tight">Escribe el código</h2>
                            <p className="text-xl text-warm-500 font-bold">Enviamos un código a tu celular.</p>
                            <form onSubmit={handleVerifyOtp} className="space-y-10">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="000000"
                                    className="w-full h-20 text-center text-4xl tracking-[0.2em] font-black bg-warm-50 border-2 border-green-500 rounded-2xl focus:ring-8 focus:ring-green-50 outline-none transition-all"
                                    maxLength={6}
                                    required
                                />
                                {error && (
                                    <div className="p-6 bg-red-50 border-2 border-red-100 rounded-xl flex items-start gap-4 text-red-900">
                                        <AlertCircle className="shrink-0 mt-1" size={24} />
                                        <p className="text-lg font-bold leading-tight text-left">{error}</p>
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    loading={loading}
                                    className="h-16 text-xl font-bold rounded-xl"
                                >
                                    ¡Entrar a PAIS!
                                </Button>
                                <button onClick={() => setStep("details")} className="text-warm-400 font-bold text-lg hover:underline">
                                    Corregir mis datos
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* Step 4: Success Message (Email only) */}
                    {step === "success" && (
                        <motion.div
                            key="success-step"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-10 rounded-3xl shadow-xl border-8 border-white ring-1 ring-black/5 text-center space-y-8"
                        >
                            <div className="bg-green-100 p-8 rounded-2xl text-green-600 inline-block">
                                <ShieldCheck size={64} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-3xl font-black text-warm-900 font-heading tracking-tight">¡Casi listo!</h2>
                            <p className="text-xl text-warm-600 font-medium leading-relaxed">
                                Revisa tu correo <span className="text-green-600 font-black">{email}</span> para activar tu cuenta.
                            </p>
                            <Button
                                variant="outline"
                                fullWidth
                                className="h-14 text-lg font-bold rounded-xl"
                                onClick={() => router.push("/login")}
                            >
                                Volver al inicio
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-warm-50 flex items-center justify-center text-2xl font-black text-green-600">Cargando...</div>}>
            <RegisterContent />
        </Suspense>
    );
}
