"use client";

import { useState } from "react";
import { Card, Button } from "@/components/ui";
import {
    CheckCircle2,
    Circle,
    Clock,
    Info,
    ChevronRight,
    Pill
} from "lucide-react";
import type { Medication, MedicationLog } from "@/types";

export default function RecordatorioMedicina() {
    // Mock data for UI demonstration
    const [meds, setMeds] = useState([
        {
            id: "1",
            name: "Enalapril",
            dosage: "10mg",
            instructions: "Después del desayuno",
            time: "08:00",
            taken: true
        },
        {
            id: "2",
            name: "Atorvastatina",
            dosage: "20mg",
            instructions: "Antes de dormir",
            time: "22:00",
            taken: false
        },
        {
            id: "3",
            name: "Metformina",
            dosage: "850mg",
            instructions: "Con el almuerzo",
            time: "13:30",
            taken: false
        }
    ]);

    const handleToggle = (id: string) => {
        setMeds(prev => prev.map(m =>
            m.id === id ? { ...m, taken: !m.taken } : m
        ));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                    <Pill className="text-blue-600" size={24} />
                    Medicinas de Hoy
                </h2>
                <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
                    {meds.filter(m => m.taken).length} / {meds.length} Tomadas
                </span>
            </div>

            <div className="grid gap-4">
                {meds.sort((a, b) => a.time.localeCompare(b.time)).map((med) => (
                    <Card
                        key={med.id}
                        className={`p-5 transition-all border-2 ${med.taken
                                ? "bg-green-50 border-green-200 opacity-80"
                                : "bg-surface border-border hover:border-blue-200"
                            }`}
                    >
                        <div className="flex items-center gap-5">
                            <div className="flex flex-col items-center justify-center bg-warm-50 rounded-2xl p-3 min-w-[70px] border border-border">
                                <Clock size={20} className="text-text-secondary" />
                                <span className="text-lg font-bold text-text-primary mt-1">{med.time}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className={`text-xl font-bold truncate ${med.taken ? "text-green-800 line-through decoration-2" : "text-text-primary"}`}>
                                    {med.name}
                                </h3>
                                <p className="text-text-secondary font-medium">
                                    {med.dosage} • {med.instructions}
                                </p>
                            </div>

                            <button
                                onClick={() => handleToggle(med.id)}
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-sm border-2 ${med.taken
                                        ? "bg-green-500 border-green-600 text-white"
                                        : "bg-surface border-blue-600 text-blue-600 hover:bg-blue-50"
                                    }`}
                            >
                                {med.taken ? (
                                    <CheckCircle2 size={32} />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-black leading-none mb-1">TOMAR</span>
                                        <Circle size={28} />
                                    </div>
                                )}
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            <Button variant="secondary" fullWidth size="lg" className="h-16 text-lg">
                Ver Listado Completo
                <ChevronRight size={24} />
            </Button>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-4">
                <Info className="text-amber-600 mt-1 shrink-0" size={20} />
                <p className="text-sm text-amber-900 font-medium">
                    Recuerda: Si te saltaste una dosis o te sientes mal, avisa a tu médico o pulsa el botón SOS si es grave.
                </p>
            </div>
        </div>
    );
}
