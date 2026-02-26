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
                            <h1 className="text-5xl font-black text-warm-900 font-heading tracking-tight mb-2">
                                ¡Hola, {firstName}!
                            </h1>
                            <p className="text-2xl text-warm-500 font-bold">
                                Todo está en orden por aquí hoy.
                            </p>
                        </div>
                        <button className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-warm-200 flex items-center justify-center text-warm-400 relative active:scale-90 transition-transform">
                            <Bell size={32} />
                            <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>

                    {/* Today's Highlight Bar */}
                    <div className="mt-10 p-8 bg-white rounded-[3rem] border-4 border-white shadow-xl flex items-center gap-6">
                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center shrink-0">
                            <Car size={44} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <p className="text-warm-500 font-black text-base uppercase tracking-widest mb-1">Próximo viaje</p>
                            <p className="text-3xl font-black text-warm-900 leading-tight">Cita Médica</p>
                            <div className="flex items-center gap-2 text-xl font-bold text-warm-500 mt-1">
                                <Clock size={20} /> 11:30 AM · Hospital Central
                            </div>
                        </div>
                        <ChevronRight className="text-warm-300" size={32} />
                    </div>
                </motion.section>

                {/* 2. Primary Pillars Grid */}
                <motion.section variants={itemVariants} className="space-y-6">
                    <h2 className="text-3xl font-black text-warm-900 font-heading">¿Qué necesitas hacer?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Pilar: Transporte */}
                        <div
                            onClick={() => router.push("/transport")}
                            className="group relative h-96 bg-white rounded-[3.5rem] p-10 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-4 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-100/50 transition-colors"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-24 h-24 bg-blue-500 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                                    <Car size={48} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black text-warm-900 mb-3">Pedir Viaje</h3>
                                    <p className="text-xl text-warm-500 font-bold leading-relaxed">Traslados seguros con conductores de confianza.</p>
                                </div>
                            </div>
                        </div>

                        {/* Pilar: Comunidad */}
                        <div
                            onClick={() => router.push("/community")}
                            className="group relative h-96 bg-white rounded-[3.5rem] p-10 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-4 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50/50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-purple-100/50 transition-colors"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-24 h-24 bg-purple-500 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                                    <Users size={48} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black text-warm-900 mb-3">Compañía</h3>
                                    <p className="text-xl text-warm-500 font-bold leading-relaxed">Conversa o pasea con nuestros voluntarios.</p>
                                </div>
                            </div>
                        </div>

                        {/* Pilar: Salud */}
                        <div
                            onClick={() => router.push("/health")}
                            className="group relative h-96 bg-white rounded-[3.5rem] p-10 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-4 border-white active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-red-50/50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-red-100/50 transition-colors"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-24 h-24 bg-red-500 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-red-500/20">
                                    <Heart size={48} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black text-warm-900 mb-3">Mi Salud</h3>
                                    <p className="text-xl text-warm-500 font-bold leading-relaxed">Tus citas médicas y medicamentos al día.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 3. Emergency SOS Shortcut */}
                <motion.section variants={itemVariants} className="relative">
                    <div className="p-10 bg-gradient-to-br from-warm-900 to-warm-800 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden ring-4 ring-white/10 group">
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-32 h-32 bg-white/10 rounded-[2.5rem] flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-xl">
                            <Heart size={64} className="text-red-500 animate-pulse" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-4xl font-black mb-3">Centro de Asistencia</h3>
                            <p className="text-xl text-warm-300 font-bold leading-relaxed">Si te sientes mal o necesitas ayuda urgente, comunícate con Carlos o pide un SOS.</p>
                        </div>
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <Button
                                onClick={() => window.location.href = "tel:70000000"}
                                className="h-20 px-8 text-2xl font-black bg-white text-warm-900 rounded-[1.5rem] border-none flex items-center gap-4 hover:bg-warm-50 shadow-xl"
                            >
                                <Phone size={28} /> Llamar a Carlos
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
