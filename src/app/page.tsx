"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import {
    Car,
    Heart,
    Users,
    ShieldCheck,
    ChevronRight,
    ArrowRight,
    Star,
    CheckCircle2,
    Shield,
    PhoneCall,
    Mail
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
    const router = useRouter();
    const { user, loading } = useUser();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    if (!mounted) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
            {/* 1. Navigation Header (Stitch-Style) */}
            <header className="fixed top-0 z-50 w-full border-b border-warm-200/30 bg-white/70 backdrop-blur-xl px-6 md:px-10 py-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <div className="bg-green-500 p-2.5 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:rotate-12 transition-all duration-500">
                            <Heart size={20} fill="white" />
                        </div>
                        <h2 className="text-warm-900 text-2xl font-black tracking-tight font-heading uppercase">PAIS</h2>
                    </motion.div>

                    <nav className="hidden md:flex items-center gap-10">
                        {["Servicios", "Nosotros", "Privacidad"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-warm-500 text-base font-bold hover:text-green-600 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/login")}
                            className="hidden sm:flex text-green-600 font-bold"
                        >
                            Entrar
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => router.push("/register")}
                            className="rounded-xl px-6"
                        >
                            Registro
                        </Button>
                    </motion.div>
                </div>
            </header>

            <main>
                {/* 2. Hero Section: The "María" Test */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                    {/* Dynamic Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full -z-10">
                        <div className="absolute top-[-10%] right-[-5%] w-[50rem] h-[50rem] bg-green-100/40 rounded-full blur-[120px] animate-pulse-slow"></div>
                        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-20">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col gap-10"
                        >
                            <div className="space-y-6">
                                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-black uppercase tracking-wider">
                                    <ShieldCheck size={16} /> Certificado para Seniors 2026
                                </motion.div>
                                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight font-heading text-warm-900">
                                    Cuidamos lo que <br />
                                    <span className="text-green-500">más importa.</span>
                                </motion.h1>
                                <motion.p variants={itemVariants} className="text-xl md:text-2xl text-warm-500 font-medium leading-relaxed max-w-xl">
                                    La plataforma que conecta a los seniors con su familia y comunidad a través de salud, transporte y compañía.
                                </motion.p>
                            </div>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => router.push("/register")}
                                    className="min-w-[220px] h-16 shadow-2xl shadow-green-500/20"
                                    icon={<ArrowRight />}
                                >
                                    Comenzar Gratis
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={() => router.push("/login")}
                                    className="min-w-[220px] h-16"
                                >
                                    Ver Demo
                                </Button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4 border-t border-warm-200/50">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/100?u=s${i}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="Senior user" />
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-warm-500">
                                    <span className="text-warm-900 block font-black text-lg">+10,000 Seniors</span>
                                    disfrutan de mayor autonomía
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Interactive Hero Image Component */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white ring-1 ring-black/5">
                                <img
                                    src="https://images.unsplash.com/photo-1516307361474-3205029857a1?q=80&w=2070"
                                    alt="Seniors felices usando PAIS"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>

                            {/* Floating Feature Cards (Premium Touch) */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-6 top-[20%] glass p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/50"
                            >
                                <div className="bg-blue-500 p-3 rounded-xl text-white">
                                    <Car size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-warm-500 uppercase">Transporte</p>
                                    <p className="text-sm font-bold text-warm-900">Chofer Certificado</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-6 bottom-[20%] glass p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/50"
                            >
                                <div className="bg-red-500 p-3 rounded-xl text-white">
                                    <Heart size={24} fill="white" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-warm-500 uppercase">Salud</p>
                                    <p className="text-sm font-bold text-warm-900">Botón SOS 24/7</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* 3. Services: The 3 Pillars (Premium Grid) */}
                <section id="servicios" className="px-6 py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-warm-900 font-heading tracking-tight">
                                Diseñado para ser <span className="text-green-500 underline decoration-4 underline-offset-8">simple.</span>
                            </h2>
                            <p className="text-xl text-warm-500 font-medium">
                                Tres pilares fundamentales para una vida plena y conectada.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Transporte Seguro",
                                    desc: "GPS integrado y conductores certificados para tus traslados diarios.",
                                    icon: Car,
                                    color: "bg-blue-500",
                                    light: "bg-blue-50",
                                    text: "text-blue-600"
                                },
                                {
                                    title: "Compañía Solidaria",
                                    desc: "Red de voluntarios e integración familiar para evitar la soledad.",
                                    icon: Users,
                                    color: "bg-orange-500",
                                    light: "bg-orange-50",
                                    text: "text-orange-600"
                                },
                                {
                                    title: "Salud Digital",
                                    desc: "Recordatorios de medicina y botón SOS inteligente en tu bolsillo.",
                                    icon: Heart,
                                    color: "bg-red-500",
                                    light: "bg-red-50",
                                    text: "text-red-600"
                                }
                            ].map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="group p-10 rounded-[3rem] bg-warm-50/50 border-2 border-transparent hover:border-green-500/20 hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-default"
                                >
                                    <div className={`${service.light} ${service.text} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                        <service.icon size={40} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-warm-900 mb-4 font-heading">{service.title}</h3>
                                    <p className="text-lg text-warm-500 font-semibold leading-relaxed mb-6">
                                        {service.desc}
                                    </p>
                                    <div className="flex items-center gap-2 text-green-600 font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Saber más <ChevronRight size={16} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Social Proof & Trust */}
                <section className="px-6 py-24 bg-warm-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-green-500/10 rounded-full blur-[100px]"></div>
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-6xl font-black font-heading leading-tight tracking-tight">
                                Tu familia tranquila, <br />
                                Tú siempre <span className="text-green-400">seguro.</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "Botón SOS integrado con línea de emergencia",
                                    "Seguimiento en tiempo real para familiares",
                                    "Privacidad y seguridad de datos garantizada"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="bg-green-500/20 p-1.5 rounded-full text-green-400">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <span className="text-xl font-bold text-white/90">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="primary" size="lg" className="h-16 shadow-none" onClick={() => router.push("/register")}>
                                Únete hoy mismo
                            </Button>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[3rem] border border-white/10 space-y-8">
                            <div className="flex items-center gap-5">
                                <div className="flex text-orange-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="currentColor" />)}
                                </div>
                                <span className="font-bold text-lg text-white/50">Más de 500 reseñas de 5 estrellas</span>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold italic leading-tight text-white/90">
                                "PAIS no es solo una aplicación, es la libertad de saber que si algo pasa, mi hijo está a un toque de distancia. Ahora salgo a caminar sin miedo."
                            </p>
                            <div className="flex items-center gap-4">
                                <img src="https://i.pravatar.cc/100?u=senior1" className="w-16 h-16 rounded-full border-2 border-green-500" alt="Elena" />
                                <div>
                                    <p className="text-xl font-black">Elena Pérez</p>
                                    <p className="text-white/50 font-bold uppercase tracking-widest text-sm">74 años · Usuaria de PAIS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* 5. Footer (Stitch Minimalist) */}
            <footer className="bg-white px-6 pt-24 pb-12 text-warm-900">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16">
                    <div className="flex flex-col items-center gap-6">
                        <div className="bg-green-500 p-4 rounded-3xl text-white shadow-xl">
                            <Heart size={40} fill="white" />
                        </div>
                        <h3 className="text-5xl font-black font-heading tracking-tighter">PAIS</h3>
                        <p className="text-xl text-warm-500 font-bold max-w-md">
                            La plataforma lider en autonomía e inclusión para el adulto mayor en Bolivia y Latinoamérica.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left w-full border-y border-warm-100 py-12">
                        <div className="space-y-4">
                            <p className="font-black text-sm uppercase tracking-widest text-warm-900">Producto</p>
                            <ul className="space-y-2 text-warm-500 font-bold">
                                <li><a href="#" className="hover:text-green-600 transition-colors">Transporte</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Salud</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Comunidad</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="font-black text-sm uppercase tracking-widest text-warm-900">Nosotros</p>
                            <ul className="space-y-2 text-warm-500 font-bold">
                                <li><a href="#" className="hover:text-green-600 transition-colors">Misión</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Voluntariado</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Alianzas</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="font-black text-sm uppercase tracking-widest text-warm-900">Legal</p>
                            <ul className="space-y-2 text-warm-500 font-bold">
                                <li><a href="#" className="hover:text-green-600 transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Términos</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="font-black text-sm uppercase tracking-widest text-warm-900">Contacto</p>
                            <div className="flex gap-4">
                                <Button variant="secondary" size="sm" className="h-10 w-10 p-0 rounded-full">
                                    <PhoneCall size={18} />
                                </Button>
                                <Button variant="secondary" size="sm" className="h-10 w-10 p-0 rounded-full">
                                    <Mail size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-warm-400 font-bold text-sm tracking-wide">
                        <p>© 2026 PAIS Platform. Gerontología Digital Avanzada.</p>
                        <p>Diseñado con ❤️ en Bolivia para el mundo.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
