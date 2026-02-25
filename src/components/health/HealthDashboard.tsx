"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import { Activity, Heart, Calendar, Clock, ChevronRight, Droplets, Scale } from "lucide-react";

export default function HealthDashboard() {
    // Mock data for today's summary
    const todayStats = [
        { label: "Presión", value: "120/80", unit: "mmHg", icon: Activity, color: "text-red-600", bg: "bg-red-50" },
        { label: "Glucosa", value: "95", unit: "mg/dL", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Peso", value: "74.5", unit: "kg", icon: Scale, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Pasos", value: "2,450", unit: "hoy", icon: Heart, color: "text-green-600", bg: "bg-green-50" },
    ];

    return (
        <div className="space-y-8">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {todayStats.map((stat, i) => (
                    <Card key={i} className="p-4 border-b-4 border-b-current flex flex-col items-center text-center group hover:shadow-md transition-all cursor-pointer">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-bold text-text-tertiary uppercase tracking-wider">{stat.label}</p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-2xl font-black text-text-primary">{stat.value}</span>
                            <span className="text-[10px] font-bold text-text-tertiary">{stat.unit}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Next Milestone Card */}
            <Card className="p-6 bg-blue-600 text-white border-none shadow-xl relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-10 w-24 h-24 bg-blue-400/20 rounded-full translate-y-1/2 blur-2xl" />

                <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-100 text-sm font-bold uppercase tracking-widest">
                            <Calendar size={16} />
                            Próxima Cita Médica
                        </div>
                        <h3 className="text-2xl font-bold">Dr. Alberto Rodríguez</h3>
                        <p className="text-blue-100 font-medium">Cardiólogo • Centro Médico Central</p>
                        <div className="flex items-center gap-4 mt-4 bg-white/10 backdrop-blur-md rounded-xl p-3 inline-flex">
                            <div className="flex items-center gap-2 border-r border-white/20 pr-4">
                                <Clock size={18} />
                                <span className="font-bold">Martes 10:30 AM</span>
                            </div>
                            <span className="font-bold">Faltan 2 días</span>
                        </div>
                    </div>
                    <ChevronRight size={48} className="text-white/40 group-hover:text-white transition-colors" />
                </div>
            </Card>

            {/* Recent Activity Mini-log */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <Activity className="text-red-500" size={20} />
                    Actividad Reciente
                </h3>
                <div className="space-y-3">
                    {[
                        { type: "med", action: "Enalapril tomado", time: "8:00 AM", status: "success" },
                        { type: "check", action: "Presión arterial registrada", time: " Ayer 7:00 PM", status: "info" },
                        { type: "med", action: "Atorvastatina pendiente", time: "Hoy 10:00 PM", status: "pending" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-surface border border-border rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
                                        item.status === "info" ? "bg-blue-500" : "bg-amber-500"
                                    }`} />
                                <div>
                                    <p className="font-bold text-text-primary">{item.action}</p>
                                    <p className="text-xs text-text-tertiary font-medium">{item.time}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-text-tertiary" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
