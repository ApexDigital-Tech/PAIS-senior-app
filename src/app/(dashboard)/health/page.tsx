"use client";

import { HealthDashboard, RecordatorioMedicina, BotonSOS } from "@/components/health";
import { Heart, ShieldAlert, ChevronRight, Activity } from "lucide-react";

export default function HealthPage() {
    return (
        <div className="min-h-screen bg-[var(--pais-warm-50)] pb-32">
            {/* Header / Hero */}
            <div className="bg-red-600 text-white pt-12 pb-20 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl font-bold font-heading mb-4 flex items-center gap-3">
                        Salud y Bienestar
                        <Heart className="animate-pulse" size={32} />
                    </h1>
                    <p className="text-xl text-red-50 max-w-2xl font-medium">
                        Tu centro de cuidado personal. Gestiona tus medicinas, citas y mantente seguro con SOS.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20 space-y-8">
                {/* Emergency Card */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-red-100 flex items-center justify-between gap-6 group cursor-pointer hover:border-red-500 transition-all">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                            <ShieldAlert className="text-red-600" size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-red-700 uppercase tracking-tight">Zona de Emergencia</h3>
                            <p className="text-red-900/70 font-medium">Usa el botón SOS si necesitas ayuda urgente.</p>
                        </div>
                    </div>
                    <ChevronRight size={32} className="text-red-200 group-hover:text-red-500 transition-colors" />
                </div>

                {/* Dashboard Summary */}
                <HealthDashboard />

                {/* Medication Section */}
                <div className="pt-4">
                    <RecordatorioMedicina />
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-between p-6 bg-surface border-2 border-border rounded-3xl hover:border-blue-500 transition-all text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Activity size={24} />
                            </div>
                            <span className="text-xl font-bold text-text-primary">Registrar Signos</span>
                        </div>
                        <ChevronRight size={24} className="text-text-tertiary" />
                    </button>
                    <button className="flex items-center justify-between p-6 bg-surface border-2 border-border rounded-3xl hover:border-green-500 transition-all text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                                <Heart size={24} />
                            </div>
                            <span className="text-xl font-bold text-text-primary">Historial Médico</span>
                        </div>
                        <ChevronRight size={24} className="text-text-tertiary" />
                    </button>
                </div>
            </div>

            {/* Safety SOS Trigger */}
            <BotonSOS />
        </div>
    );
}
