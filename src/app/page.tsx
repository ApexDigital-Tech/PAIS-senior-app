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
    ArrowRight,
    Star
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
        <div className="min-h-screen bg-warm-50 text-warm-900 font-sans selection:bg-green-100 selection:text-green-900">
            {/* Header (Match Stitch exactly) */}
            <header className="sticky top-0 z-50 w-full border-b border-green-500/10 bg-white/80 backdrop-blur-md px-6 md:px-20 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => router.push("/")}>
                        <div className="bg-green-500 p-2.5 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:rotate-12 transition-transform duration-500">
                            <Heart size={28} fill="white" />
                        </div>
                        <h2 className="text-warm-900 text-3xl font-black tracking-tighter font-heading">PAIS</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-14">
                        <a className="text-warm-700 text-xl font-bold hover:text-green-600 transition-colors" href="#servicios">Servicios</a>
                        <a className="text-warm-700 text-xl font-bold hover:text-green-600 transition-colors" href="#nosotros">Nosotros</a>
                        <a className="text-warm-700 text-xl font-bold hover:text-green-600 transition-colors" href="#contacto">Contacto</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="primary"
                            size="default"
                            onClick={() => router.push("/login")}
                            className="rounded-2xl px-10 h-14 text-xl font-black"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section (Match code_dashboard_pais.html exactly) */}
                <section className="relative px-6 py-20 md:py-36 bg-[#F5F5F0] overflow-hidden">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-20">
                        <div className="flex flex-col gap-10 animate-fade-in text-left">
                            <div className="flex flex-col gap-6">
                                <h1 className="text-warm-900 text-6xl md:text-8xl font-black leading-[1.05] tracking-tight font-heading">
                                    Bienvenido a <span className="text-green-500">PAIS</span>
                                </h1>
                                <p className="text-warm-700 text-2xl md:text-3xl font-medium leading-relaxed max-w-xl">
                                    Tu compañero para una vida autónoma, segura y siempre conectada con los que amas a través de la tecnología.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => router.push("/register")}
                                    className="min-w-[260px] h-20 text-2xl rounded-[1.5rem] shadow-2xl shadow-green-500/30"
                                >
                                    Comenzar ahora
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => router.push("/login")}
                                    className="min-w-[260px] h-20 text-2xl rounded-[1.5rem] border-blue-500 text-blue-600 bg-white hover:bg-blue-50"
                                >
                                    Ya tengo cuenta
                                </Button>
                            </div>
                        </div>

                        {/* Hero Image with Floating Badge (Stitch Style) */}
                        <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
                            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-warm-200 border-[12px] border-white ring-1 ring-black/5">
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
                                    alt="Seniors felices usando tecnología"
                                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                />
                            </div>
                            {/* Floating Badge (Crucial for Stitch Aesthetic) */}
                            <div className="absolute -bottom-10 -right-4 md:-right-12 bg-white/95 backdrop-blur-md p-8 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] flex items-center gap-6 max-w-sm border-2 border-green-500/10 animate-float">
                                <div className="bg-green-100 p-5 rounded-[1.5rem] text-green-600">
                                    <Users size={44} strokeWidth={2.5} />
                                </div>
                                <p className="text-warm-900 font-black text-xl leading-tight font-heading">
                                    Siempre cerca de tu familia con un solo toque.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section (Stitch Grid) */}
                <section id="servicios" className="px-6 py-32 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-6 mb-24 text-center max-w-3xl mx-auto">
                            <h2 className="text-warm-900 text-5xl md:text-6xl font-black font-heading tracking-tight">Nuestros Servicios</h2>
                            <p className="text-warm-500 text-2xl font-medium leading-relaxed">Diseñados pensando en la facilidad de uso y alta legibilidad para seniors y sus familias.</p>
                            <div className="h-2.5 w-32 bg-green-500 mx-auto rounded-full mt-2 shadow-sm shadow-green-500/20"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Transport */}
                            <div className="group flex flex-col gap-10 rounded-[4rem] border-4 border-slate-50 bg-white p-14 hover:border-green-500/40 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,184,95,0.1)]">
                                <div className="w-24 h-24 rounded-[2rem] bg-green-50 flex items-center justify-center text-green-500 transition-all duration-500 group-hover:bg-green-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                                    <Car size={48} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col gap-5">
                                    <h3 className="text-warm-900 text-3xl font-black font-heading leading-tight">Transporte Seguro</h3>
                                    <p className="text-warm-600 text-xl md:text-2xl leading-relaxed font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                                        GPS integrado y conductores certificados de total confianza para todos tus traslados diarios.
                                    </p>
                                </div>
                            </div>

                            {/* Health */}
                            <div className="group flex flex-col gap-10 rounded-[4rem] border-4 border-slate-50 bg-white p-14 hover:border-red-500/40 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(239,68,68,0.1)]">
                                <div className="w-24 h-24 rounded-[2rem] bg-red-50 flex items-center justify-center text-red-500 transition-all duration-500 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                                    <ShieldCheck size={48} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col gap-5">
                                    <h3 className="text-warm-900 text-3xl font-black font-heading leading-tight">Salud Digital</h3>
                                    <p className="text-warm-600 text-xl md:text-2xl leading-relaxed font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                                        Recordatorios de medicación y botón SOS inteligente conectado directamente con emergencias.
                                    </p>
                                </div>
                            </div>

                            {/* Community */}
                            <div className="group flex flex-col gap-10 rounded-[4rem] border-4 border-slate-50 bg-white p-14 hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_40_80px_-20px_rgba(59,130,246,0.1)]">
                                <div className="w-24 h-24 rounded-[2rem] bg-blue-50 flex items-center justify-center text-blue-500 transition-all duration-500 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                                    <Users size={48} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col gap-5">
                                    <h3 className="text-warm-900 text-3xl font-black font-heading leading-tight">Compañía Solidaria</h3>
                                    <p className="text-warm-600 text-xl md:text-2xl leading-relaxed font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                                        Red de voluntarios y comunidad activa para mantenerte socialmente conectado y siempre acompañado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof (10k Seniors Trust Us) */}
                <section className="px-6 py-36 bg-[#F5F5F0]">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-warm-900 text-4xl md:text-6xl font-black font-heading leading-tight mb-16 tracking-tight">
                            Más de 10,000 seniors confían en nosotros
                        </h2>
                        <div className="flex justify-center mb-16">
                            <div className="flex -space-x-8">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-28 h-28 rounded-full border-[6px] border-white bg-warm-200 overflow-hidden shadow-2xl transition-transform hover:translate-y-[-10px] cursor-pointer">
                                        <img src={`https://i.pravatar.cc/150?u=senior${i}`} alt="Senior" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-28 h-28 rounded-full border-[6px] border-white bg-green-500 flex items-center justify-center text-white text-3xl font-black shadow-2xl transition-transform hover:translate-y-[-10px] cursor-pointer">
                                    +10k
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-black/5 border-4 border-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 text-green-500">
                                <Star size={120} fill="currentColor" />
                            </div>
                            <p className="text-warm-800 text-3xl md:text-5xl font-black italic leading-tight font-heading">
                                "PAIS me devolvió la libertad de salir a caminar tranquila. Es como tener a mi familia en el bolsillo."
                            </p>
                            <div className="flex flex-col items-center mt-12 gap-3">
                                <p className="text-green-600 font-black text-3xl font-heading">— Elena, 72 años</p>
                                <div className="flex text-amber-500 gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={24} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Custom Footer (Match Stitch) */}
            <footer className="bg-green-500 px-6 py-24 text-white font-heading">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
                    <div className="flex items-center gap-16 md:gap-24">
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="bg-white/10 p-5 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
                                <ShieldCheck size={56} strokeWidth={2.5} />
                            </div>
                            <span className="font-black text-2xl tracking-tight">Seguro</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="bg-white/10 p-5 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
                                <Users size={56} strokeWidth={2.5} />
                            </div>
                            <span className="font-black text-2xl tracking-tight">Familiar</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="bg-white/10 p-5 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
                                <Heart size={56} strokeWidth={2.5} />
                            </div>
                            <span className="font-black text-2xl tracking-tight">Privado</span>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <h3 className="text-7xl font-black mb-6 tracking-tighter">PAIS</h3>
                        <p className="text-white/80 text-2xl font-medium max-w-sm ml-auto">Cuidado humano que conecta generaciones.</p>
                        <div className="mt-12 flex gap-10 justify-center lg:justify-end text-white/70 font-bold text-xl">
                            <a href="#" className="hover:text-white hover:underline transition-all">Privacidad</a>
                            <a href="#" className="hover:text-white hover:underline transition-all">Términos</a>
                            <a href="#" className="hover:text-white hover:underline transition-all">Ayuda</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-white/20 text-center text-white/50 font-bold text-lg tracking-wide uppercase">
                    © 2026 PAIS - Plataforma de Autonomía e Inclusión Senior.
                </div>
            </footer>
        </div>
    );
}
