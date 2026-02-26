"use client";

import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import {
    Car,
    Users,
    Heart,
    Calendar,
    Pill,
    MapPin,
    ChevronRight,
    Phone,
    Bell,
    Clock,
    Plus,
    Activity,
    ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading } = useUser();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const firstName = user?.full_name?.split(" ")[0] || "María";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <PageContainer className="bg-[var(--background)]">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12 pb-10"
            >
                {/* 1. Greeting & Dynamic Status */}
                <motion.section variants={itemVariants} className="pt-2">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest mb-2"
                            >
                                <Activity size={14} /> Tu cuenta está activa
                            </motion.div>
                            <h1 className="text-4xl md:text-5xl font-black text-warm-900 font-heading tracking-tight leading-none">
                                ¡Hola, {firstName}!
                            </h1>
                            <p className="text-xl text-warm-500 font-bold leading-relaxed">
                                Todo está bajo control hoy.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-warm-200 flex items-center justify-center text-warm-400 relative hover:bg-warm-50 active:scale-90 transition-all">
                                <Bell size={28} />
                                <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-4 border-white"></span>
                            </button>
                        </div>
                    </div>

                    {/* Today's Highlight (Stitch Premium Card) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        onClick={() => router.push("/transport")}
                        className="mt-10 p-8 bg-white rounded-[2.5rem] border-4 border-white shadow-xl shadow-warm-200/50 flex flex-col md:flex-row items-center gap-6 cursor-pointer group transition-all"
                    >
                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Car size={40} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-warm-400 font-black text-xs uppercase tracking-widest mb-1">Próximo viaje programado</p>
                            <h3 className="text-2xl font-black text-warm-900 leading-tight mb-1">Cita Médica — Control</h3>
                            <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-warm-50 rounded-full text-base font-bold text-warm-700">
                                    <Clock size={16} /> 11:30 AM
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-warm-50 rounded-full text-base font-bold text-warm-700">
                                    <MapPin size={16} /> Hospital Central
                                </div>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" className="hidden md:flex rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 border-none transition-colors">
                            Detalles <ChevronRight size={20} />
                        </Button>
                    </motion.div>
                </motion.section>

                {/* 2. Primary Pillars: Big Touch Targets */}
                <motion.section variants={itemVariants} className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-warm-900 font-heading">¿Qué necesitas?</h2>
                        <span className="text-green-600 font-black text-sm uppercase tracking-widest cursor-pointer hover:underline">Ver todo</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Pilar: Transporte */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            onClick={() => router.push("/transport")}
                            className="group relative h-72 bg-white rounded-[3rem] p-10 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-4 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/70 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                                    <Car size={40} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-warm-900 mb-2">Viaje Seguro</h3>
                                    <p className="text-lg text-warm-500 font-bold leading-snug">Solicita un chofer de confianza ahora.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Pilar: Salud */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            onClick={() => router.push("/health")}
                            className="group relative h-72 bg-white rounded-[3rem] p-10 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-4 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-red-50/70 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-20 h-20 bg-red-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-red-500/30 group-hover:rotate-6 transition-transform">
                                    <Heart size={40} strokeWidth={2.5} fill="white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-warm-900 mb-2">Mi Salud</h3>
                                    <p className="text-lg text-warm-500 font-bold leading-snug">Medicamentos, citas y telemedicina.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Pilar: Comunidad */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            onClick={() => router.push("/community")}
                            className="group relative h-72 bg-white rounded-[3rem] p-10 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-4 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50/70 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/30 group-hover:rotate-6 transition-transform">
                                    <Users size={40} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-warm-900 mb-2">Comunidad</h3>
                                    <p className="text-lg text-warm-500 font-bold leading-snug">Conecta con voluntarios y amigos.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* 3. Emergency Center: High Contrast & Visibility */}
                <motion.section variants={itemVariants}>
                    <div className="p-10 bg-warm-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-warm-900/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-xl group-hover:scale-110 transition-transform">
                            <ShieldAlert size={48} className="text-red-500 animate-pulse" />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h3 className="text-3xl font-black tracking-tight">Centro de Ayuda</h3>
                            <p className="text-xl text-warm-300 font-bold leading-relaxed max-w-lg">
                                Si te sientes mal o tienes un problema, estamos aquí para ti las 24 horas.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <Button
                                onClick={() => window.location.href = "tel:70000000"}
                                className="h-16 px-8 text-xl font-bold bg-white text-warm-900 rounded-2xl border-none shadow-xl hover:bg-warm-50 transition-all flex items-center gap-3"
                            >
                                <Phone size={24} /> Llamar Emergencia
                            </Button>
                        </div>
                    </div>
                </motion.section>

                {/* Extra spacing for BottomNav */}
                <div className="h-10"></div>
            </motion.div>
        </PageContainer>
    );
}
