"use client";

import { useState } from "react";
import { DirectorioVoluntarios, CalendarioActividades } from "@/components/community";
import { Users, Calendar, MessageSquare, Heart } from "lucide-react";

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState<"volunteers" | "activities">("activities");

    return (
        <div className="min-h-screen bg-[var(--pais-warm-50)] pb-24">
            {/* Header / Hero */}
            <div className="bg-green-600 text-white pt-12 pb-20 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl font-bold font-heading mb-4">Comunidad PAIS</h1>
                    <p className="text-xl text-green-50 max-w-2xl font-medium">
                        Tu red de compañía y apoyo. Encuentra personas maravillosas para compartir momentos y actividades.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
                {/* Stats / Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Voluntarios", value: "24", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Actividades", value: "8", icon: Calendar, color: "text-green-600", bg: "bg-green-50" },
                        { label: "Mensajes", value: "0", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
                        { label: "Vínculos", value: "12", icon: Heart, color: "text-red-600", bg: "bg-red-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-surface p-4 rounded-2xl shadow-sm border border-border text-center flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} mb-2`}>
                                <stat.icon size={20} />
                            </div>
                            <p className="text-2xl font-bold text-text-primary leading-none">{stat.value}</p>
                            <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <div className="bg-surface rounded-3xl shadow-sm border border-border min-h-[600px] overflow-hidden flex flex-col">
                    <div className="flex p-2 bg-warm-50/50 border-b border-border">
                        <button
                            onClick={() => setActiveTab("activities")}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${activeTab === "activities"
                                    ? "bg-white text-green-600 shadow-sm"
                                    : "text-text-secondary hover:bg-warm-100/50"
                                }`}
                        >
                            <Calendar size={20} />
                            Actividades
                        </button>
                        <button
                            onClick={() => setActiveTab("volunteers")}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${activeTab === "volunteers"
                                    ? "bg-white text-green-600 shadow-sm"
                                    : "text-text-secondary hover:bg-warm-100/50"
                                }`}
                        >
                            <Users size={20} />
                            Voluntarios
                        </button>
                    </div>

                    <div className="p-6 md:p-8 flex-1">
                        {activeTab === "activities" ? (
                            <div className="animate-fade-in">
                                <CalendarioActividades />
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="mb-8 p-6 bg-purple-50 rounded-[var(--radius-md)] border-2 border-purple-100 flex items-center gap-6">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                                        <Heart className="text-purple-600 fill-purple-600" size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-purple-900">Compañía en un toque</h3>
                                        <p className="text-purple-800/80">
                                            Nuestros voluntarios están verificados por PAIS para brindarte la mejor experiencia.
                                        </p>
                                    </div>
                                </div>
                                <DirectorioVoluntarios />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
