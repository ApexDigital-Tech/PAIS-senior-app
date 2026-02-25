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
        <div className="min-h-screen bg-[var(--pais-warm-50)] text-[var(--pais-text-primary)]">
            {/* Simple Hero */}
            <header className="pt-20 pb-12 px-6 text-center max-w-3xl mx-auto animate-fade-in">
                <div className="w-28 h-28 bg-gradient-to-br from-[var(--pais-green-400)] via-[var(--pais-green-600)] to-[var(--pais-blue-600)] rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-[0_20px_40px_-10px_rgba(0,186,97,0.4)] transform rotate-6 animate-pulse-slow">
                    <span className="text-white font-heading text-6xl font-bold -rotate-6">P</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black font-heading mb-6 leading-tight text-gradient tracking-tighter">
                    Bienvenido a PAIS
                </h1>
                <p className="text-2xl text-[var(--pais-text-secondary)] mb-12 leading-relaxed max-w-xl mx-auto font-medium">
                    Tu compañero de vida para una autonomía prolongada y un bienestar integral.
                </p>
                <div className="flex flex-col gap-6 sm:flex-row justify-center items-center">
                    <Button
                        size="lg"
                        onClick={() => router.push("/register")}
                        className="text-2xl py-10 px-14 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,186,97,0.5)] bg-[var(--pais-green-500)] hover:scale-105 active:scale-95 transition-all font-bold"
                    >
                        Comenzar ahora
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => router.push("/login")}
                        className="text-2xl py-10 px-14 rounded-3xl border-2 hover:bg-[var(--pais-warm-100)] transition-all font-bold"
                    >
                        Ya tengo cuenta
                    </Button>
                </div>
            </header>

            {/* Services Grid */}
            <main className="max-w-4xl mx-auto px-6 pb-20">
                <h2 className="text-2xl font-bold text-center mb-10 opacity-70 uppercase tracking-widest text-[var(--pais-green-700)]">
                    Nuestros Servicios
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Transport */}
                    <div className="grad-transport p-8 rounded-[2.5rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border hover:shadow-2xl hover:scale-[1.03] transition-all group cursor-pointer" onClick={() => router.push("/register")}>
                        <div className="w-16 h-16 bg-white/50 text-[var(--pais-blue-600)] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[var(--pais-blue-600)] group-hover:text-white transition-all">
                            <Car size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-[var(--pais-blue-700)]">Transporte</h3>
                        <p className="text-lg text-[var(--pais-text-secondary)] font-medium leading-tight">
                            Viajes seguros punto a punto con conductores de confianza.
                        </p>
                    </div>

                    {/* Health */}
                    <div className="grad-health p-8 rounded-[2.5rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border hover:shadow-2xl hover:scale-[1.03] transition-all group cursor-pointer" onClick={() => router.push("/register")}>
                        <div className="w-16 h-16 bg-white/50 text-[var(--pais-red-500)] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[var(--pais-red-500)] group-hover:text-white transition-all">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-[var(--pais-red-700)]">Salud</h3>
                        <p className="text-lg text-[var(--pais-text-secondary)] font-medium leading-tight">
                            Control de medicamentos, citas y botón SOS 24/7.
                        </p>
                    </div>

                    {/* Community */}
                    <div className="grad-community p-8 rounded-[2.5rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border hover:shadow-2xl hover:scale-[1.03] transition-all group cursor-pointer" onClick={() => router.push("/register")}>
                        <div className="w-16 h-16 bg-white/50 text-[var(--pais-purple-500)] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[var(--pais-purple-500)] group-hover:text-white transition-all">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-[var(--pais-purple-700)]">Comunidad</h3>
                        <p className="text-lg text-[var(--pais-text-secondary)] font-medium leading-tight">
                            Conecta con voluntarios para compañía y actividades.
                        </p>
                    </div>
                </div>

                {/* Secure Badge */}
                <div className="mt-16 flex flex-col items-center gap-4 bg-green-50 p-8 rounded-[3rem] border border-green-100">
                    <ShieldCheck size={48} className="text-green-600" />
                    <div className="text-center">
                        <p className="text-xl font-bold text-green-800">Seguro y Privado</p>
                        <p className="text-lg text-green-700">Toda tu información está protegida bajo estándares médicos.</p>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-10 text-center opacity-50 text-sm">
                <p>&copy; 2026 PAIS — Atención Integral Senior. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
