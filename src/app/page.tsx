"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import {
    Car,
    Heart,
    Users,
    ShieldCheck,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import { useEffect } from "react";

export default function LandingPage() {
    const router = useRouter();
    const { user, loading } = useUser();

    // If logged in, go to dashboard
    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen bg-[var(--pais-warm-100)] text-[var(--pais-warm-900)]">
            {/* Immersive Hero */}
            <header className="relative pt-32 pb-24 px-6 text-center max-w-4xl mx-auto animate-fade-in overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-[var(--pais-green-500)] rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--pais-blue-500)] rounded-full blur-[120px] animate-pulse-slow"></div>
                </div>

                <div className="w-32 h-32 bg-gradient-to-br from-[var(--pais-green-500)] to-[var(--pais-blue-600)] rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-[0_30px_60px_-15px_rgba(0,186,97,0.5)] transform rotate-6 hover:rotate-0 transition-transform duration-500 cursor-default">
                    <span className="text-white font-heading text-7xl font-bold">P</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black font-heading mb-8 leading-[1.1] text-[var(--pais-warm-900)] tracking-tighter">
                    Bienvenido a <span className="text-gradient">PAIS</span>
                </h1>

                <p className="text-2xl md:text-3xl text-[var(--pais-warm-700)] mb-14 leading-relaxed max-w-2xl mx-auto font-medium">
                    Tu compañero de vida para una autonomía prolongada y un bienestar integral.
                </p>

                <div className="flex flex-col gap-8 sm:flex-row justify-center items-center">
                    <Button
                        size="lg"
                        onClick={() => router.push("/register")}
                        className="onboarding-btn shadow-2xl hover:scale-105 transition-all text-white bg-[var(--pais-green-500)]"
                    >
                        Comenzar ahora
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => router.push("/login")}
                        className="onboarding-btn border-[3px] border-[var(--pais-blue-500)] text-[var(--pais-blue-600)] hover:bg-[var(--pais-blue-500)]/10 transition-all font-bold bg-white"
                    >
                        Ya tengo cuenta
                    </Button>
                </div>
            </header>

            {/* Services Grid (Radical Accessibility) */}
            <main className="max-w-5xl mx-auto px-6 pb-32">
                <div className="text-center mb-16">
                    <h2 className="text-xl font-black text-[var(--pais-warm-500)] uppercase tracking-[0.2em] mb-4">Nuestros Servicios</h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-[var(--pais-green-500)] to-[var(--pais-blue-500)] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Transport */}
                    <div className="card-premium grad-transport p-10 group cursor-pointer hover:border-[var(--pais-blue-500)]" onClick={() => router.push("/register")}>
                        <div className="w-20 h-20 bg-white text-[var(--pais-blue-500)] rounded-3xl flex items-center justify-center mb-10 shadow-md group-hover:bg-[var(--pais-blue-500)] group-hover:text-white transition-all transform group-hover:rotate-6">
                            <Car size={40} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-black mb-4 text-[var(--pais-blue-600)]">Transporte Seguro</h3>
                        <p className="text-xl text-[var(--pais-warm-700)] font-medium leading-relaxed">
                            Rastreo GPS en tiempo real y conductores de confianza certificados.
                        </p>
                    </div>

                    {/* Health */}
                    <div className="card-premium grad-health p-10 group cursor-pointer hover:border-[var(--pais-red-500)]" onClick={() => router.push("/register")}>
                        <div className="w-20 h-20 bg-white text-[var(--pais-red-500)] rounded-3xl flex items-center justify-center mb-10 shadow-md group-hover:bg-[var(--pais-red-500)] group-hover:text-white transition-all transform group-hover:rotate-6">
                            <Heart size={40} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-black mb-4 text-[var(--pais-red-600)]">Salud Digital</h3>
                        <p className="text-xl text-[var(--pais-warm-700)] font-medium leading-relaxed">
                            Recordatorios de medicamentos y botón SOS de emergencia 24/7.
                        </p>
                    </div>

                    {/* Community */}
                    <div className="card-premium grad-community p-10 group cursor-pointer hover:border-[var(--pais-purple-500)]" onClick={() => router.push("/register")}>
                        <div className="w-20 h-20 bg-white text-[var(--pais-purple-500)] rounded-3xl flex items-center justify-center mb-10 shadow-md group-hover:bg-[var(--pais-purple-500)] group-hover:text-white transition-all transform group-hover:rotate-6">
                            <Users size={40} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-black mb-4 text-[var(--pais-purple-600)]">Compañía Solidaria</h3>
                        <p className="text-xl text-[var(--pais-warm-700)] font-medium leading-relaxed">
                            Conecta con voluntarios para charlas, caminatas y eventos grupales.
                        </p>
                    </div>
                </div>

                {/* Social Proof & Trust */}
                <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <section className="p-12 bg-white rounded-[3.5rem] shadow-xl border-4 border-white text-left relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--pais-green-500)]/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <p className="text-4xl font-black mb-8 text-[var(--pais-warm-900)] leading-tight">Por qué existimos</p>
                        <p className="text-2xl text-[var(--pais-warm-700)] leading-relaxed mb-10 font-medium">
                            Nacimos para devolver la libertad a nuestros adultos mayores a través de tecnología humana, segura y masivamente accesible.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-5xl font-black text-[var(--pais-green-600)]">10,000+</span>
                                <p className="text-sm font-bold text-[var(--pais-warm-500)] uppercase tracking-widest mt-1">Seniors Activos</p>
                            </div>
                            <div className="h-16 w-1 bg-[var(--pais-warm-200)] rounded-full"></div>
                            <div className="flex flex-col">
                                <span className="text-5xl font-black text-[var(--pais-blue-600)]">★ 4.9</span>
                                <p className="text-sm font-bold text-[var(--pais-warm-500)] uppercase tracking-widest mt-1">Calificación</p>
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-8 bg-white/50 p-10 rounded-[3rem] border-2 border-white shadow-sm hover:bg-white transition-all">
                            <div className="bg-[var(--pais-green-100)] p-5 rounded-2xl text-[var(--pais-green-600)]">
                                <ShieldCheck size={40} />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-[var(--pais-warm-900)] mb-2">Seguro y Privado</p>
                                <p className="text-lg text-[var(--pais-warm-700)] font-medium">Cumplimos con normativas globales (GDPR & HIPAA) para proteger tus datos.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-8 bg-white/50 p-10 rounded-[3rem] border-2 border-white shadow-sm hover:bg-white transition-all">
                            <div className="bg-[var(--pais-blue-100)] p-5 rounded-2xl text-[var(--pais-blue-600)]">
                                <Users size={40} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-[var(--pais-warm-900)] mb-2">Familiar Centrado</p>
                                <p className="text-lg text-[var(--pais-warm-700)] font-medium">Alertas automáticas para que tu familia esté tranquila mientras disfrutas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-20 text-center border-t border-[var(--pais-warm-200)]">
                <p className="text-xl text-[var(--pais-warm-500)] font-medium">
                    &copy; 2026 PAIS — Plataforma de Atención Integral Senior.
                </p>
                <p className="text-sm text-[var(--pais-warm-300)] mt-4">
                    Gerontología Digital para un futuro autónomo.
                </p>
            </footer>
        </div>
    );
}
