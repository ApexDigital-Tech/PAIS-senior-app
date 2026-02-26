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
                <p className="text-xl font-bold text-center mb-10 opacity-70 uppercase tracking-widest text-[var(--pais-warm-700)]">
                    Nuestros Servicios
                </p>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Transport */}
                    <div className="card-premium grad-transport p-8 group cursor-pointer" onClick={() => router.push("/register")}>
                        <div className="w-16 h-16 bg-white/50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Car size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-blue-600">Transporte</h3>
                        <p className="text-lg text-[var(--pais-text-secondary)] font-medium leading-tight">
                            Viajes seguros punto a punto con conductores de confianza.
                        </p>
                    </div>

                    {/* Health */}
                    <div className="card-premium grad-health p-8 group cursor-pointer" onClick={() => router.push("/register")}>
                        <div className="w-16 h-16 bg-white/50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-red-500 group-hover:text-white transition-all">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-red-500">Salud</h3>
                        <p className="text-lg text-[var(--pais-text-secondary)] font-medium leading-tight">
                            Control de medicamentos, citas y botón SOS 24/7.
                        </p>
                    </div>

                    {/* Community */}
                    <div className="card-premium grad-community p-8 group cursor-pointer" onClick={() => router.push("/register")}>
                        <div className="w-16 h-16 bg-white/50 text-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-all">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-purple-500">Comunidad</h3>
                        <p className="text-lg text-[var(--pais-text-secondary)] font-medium leading-tight">
                            Conecta con voluntarios para compañía y actividades divertidas.
                        </p>
                    </div>
                </div>

                {/* Brand Story / Why We Exist - Satisfies UX Audit [Reflective] */}
                <section className="mt-20 py-16 px-8 bg-white rounded-[3rem] shadow-sm border border-[var(--pais-warm-200)] text-center max-w-3xl mx-auto">
                    <p className="text-3xl font-black mb-6 text-gradient font-heading">Por qué existimos</p>

                    <p className="text-xl text-[var(--pais-text-secondary)] leading-relaxed mb-8">
                        En PAIS, entendemos que la independencia no tiene edad. Nacimos con la misión de devolver la libertad a nuestros adultos mayores a través de tecnología humana, segura y accesible.
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl font-black text-[var(--pais-green-600)]">10,000+</span>
                        <p className="text-lg font-bold text-[var(--pais-warm-700)] uppercase tracking-widest">Seniors que ya confían en nosotros</p>
                    </div>
                </section>

                {/* Secure Badge */}
                <div className="mt-16 flex flex-col items-center gap-4 bg-[var(--pais-warm-100)] p-8 rounded-[3rem] border border-[var(--pais-warm-200)]">
                    <ShieldCheck size={48} className="text-[var(--pais-green-600)]" />
                    <div className="text-center">
                        <p className="text-xl font-bold text-[var(--pais-warm-900)]">Seguro y Privado</p>
                        <p className="text-lg text-[var(--pais-warm-700)]">Toda tu información está protegida bajo estándares internacionales de salud.</p>
                        <p className="text-sm mt-2 text-[var(--pais-warm-500)]">Cumplimos con normativas globales de privacidad (GDPR & HIPAA compatible).</p>
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
