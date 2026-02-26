"use client";

import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
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
    Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
    const router = useRouter();
    const { user } = useUser();
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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <PageContainer className="bg-warm-50/30">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10"
            >
                {/* 1. Greeting & Status Hero */}
                <motion.section variants={itemVariants} className="pt-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-black text-warm-900 font-heading tracking-tight mb-1">
                                ¡Hola, {firstName}!
                            </h1>
                            <p className="text-lg text-warm-500 font-bold">
                                Todo está en orden hoy.
                            </p>
                        </div>
                        <button className="w-12 h-12 bg-white rounded-xl shadow-sm border border-warm-200 flex items-center justify-center text-warm-400 relative active:scale-90 transition-transform">
                            <Bell size={24} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>

                    {/* Today's Highlight Bar */}
                    <div className="mt-8 p-6 bg-white rounded-3xl border-2 border-white shadow-lg flex items-center gap-5">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <Car size={32} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <p className="text-warm-500 font-black text-xs uppercase tracking-widest mb-0.5">Próximo viaje</p>
                            <p className="text-xl font-black text-warm-900 leading-tight">Cita Médica</p>
                            <div className="flex items-center gap-2 text-base font-bold text-warm-500 mt-1">
                                <Clock size={16} /> 11:30 AM · Hospital Central
                            </div>
                        </div>
                        <ChevronRight className="text-warm-300" size={24} />
                    </div>
                </motion.section>

                {/* 2. Primary Pillars Grid */}
                <motion.section variants={itemVariants} className="space-y-6">
                    <h2 className="text-3xl font-black text-warm-900 font-heading">¿Qué necesitas hacer?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Pilar: Transporte */}
                        <div
                            onClick={() => router.push("/transport")}
                            className="group relative h-64 bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border-2 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-100/50 transition-colors"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                    <Car size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-warm-900 mb-1">Pedir Viaje</h3>
                                    <p className="text-lg text-warm-500 font-bold leading-snug">Traslados seguros y confiables.</p>
                                </div>
                            </div>
                        </div>

                        {/* Pilar: Comunidad */}
                        <div
                            onClick={() => router.push("/community")}
                            className="group relative h-64 bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border-2 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-purple-100/50 transition-colors"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                    <Users size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-warm-900 mb-1">Compañía</h3>
                                    <p className="text-lg text-warm-500 font-bold leading-snug">Conversa con voluntarios.</p>
                                </div>
                            </div>
                        </div>

                        {/* Pilar: Salud */}
                        <div
                            onClick={() => router.push("/health")}
                            className="group relative h-64 bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border-2 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-red-100/50 transition-colors"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                                    <Heart size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-warm-900 mb-1">Mi Salud</h3>
                                    <p className="text-lg text-warm-500 font-bold leading-snug">Tus citas y medicamentos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 3. Emergency SOS Shortcut */}
                <motion.section variants={itemVariants} className="relative">
                    <div className="p-8 bg-gradient-to-br from-warm-900 to-warm-800 rounded-3xl text-white flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden ring-2 ring-white/10 group">
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-xl">
                            <Heart size={40} className="text-red-500 animate-pulse" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-black mb-1">Centro de Asistencia</h3>
                            <p className="text-lg text-warm-300 font-bold leading-snug">Si te sientes mal o necesitas ayuda urgente, pide un SOS.</p>
                        </div>
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <Button
                                onClick={() => window.location.href = "tel:70000000"}
                                className="h-14 px-6 text-xl font-bold bg-white text-warm-900 rounded-xl border-none flex items-center gap-3 hover:bg-warm-50 shadow-lg"
                            >
                                <Phone size={24} /> Llamar a Carlos
                            </Button>
                        </div>
                    </div>
                </motion.section>

                {/* Add standard nav spacing */}
                <div className="h-8"></div>
            </motion.div>
        </PageContainer>
    );
}
