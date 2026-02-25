"use client";

import { useState } from "react";
import { Card, Button } from "@/components/ui";
import {
    Heart,
    Calendar,
    MapPin,
    MessageSquare,
    User as UserIcon,
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    CheckCircle2
} from "lucide-react";
import type { CompanionRequestType } from "@/types";

interface SolicitudCompaniaProps {
    volunteer: {
        id: string;
        full_name: string;
        avatar_url?: string | null;
    };
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function SolicitudCompania({ volunteer, onSuccess, onCancel }: SolicitudCompaniaProps) {
    const [step, setStep] = useState<"form" | "confirm" | "success">("form");
    const [type, setType] = useState<CompanionRequestType>("visita");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep("success");
        }, 1500);
    };

    if (step === "success") {
        return (
            <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce-subtle">
                    <CheckCircle2 size={48} className="text-white" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-text-primary">¡Solicitud Enviada!</h2>
                    <p className="text-xl text-text-secondary max-w-xs mx-auto">
                        Hemos avisado a **{volunteer.full_name}**. Te notificaremos cuando acepte la visita.
                    </p>
                </div>
                <Button size="lg" fullWidth onClick={onSuccess} className="text-xl">
                    Volver a Comunidad
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-[var(--radius-md)] border border-purple-100">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    {volunteer.avatar_url ? (
                        <img src={volunteer.avatar_url} alt={volunteer.full_name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <UserIcon size={28} className="text-purple-600" />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-text-primary">Pedir compañía a {volunteer.full_name}</h3>
                    <p className="text-sm text-text-secondary flex items-center gap-1">
                        <ShieldCheck size={14} className="text-green-600" />
                        Voluntario verificado
                    </p>
                </div>
            </div>

            {step === "form" ? (
                <form onSubmit={(e) => { e.preventDefault(); setStep("confirm"); }} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-bold text-text-primary block">¿Qué necesitas?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: "visita", label: "Visita en casa", icon: Heart },
                                { id: "paseo", label: "Paseo", icon: MapPin },
                                { id: "llamada", label: "Solo hablar", icon: MessageSquare },
                                { id: "tramites", label: "Ayuda / Trámites", icon: ShieldCheck },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setType(item.id as CompanionRequestType)}
                                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${type === item.id
                                            ? "border-green-500 bg-green-50 text-green-700 shadow-md"
                                            : "border-border bg-surface text-text-secondary hover:border-green-200"
                                        }`}
                                >
                                    <item.icon size={28} />
                                    <span className="font-bold text-sm">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-lg font-bold text-text-primary block">Fecha</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-14 px-4 bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 text-lg font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-lg font-bold text-text-primary block">Hora</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full h-14 px-4 bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 text-lg font-medium"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-text-primary block">Notas extra (opcional)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Ej: Solo estar un ratito para tomar té."
                            className="w-full p-4 bg-warm-50 border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 text-lg min-h-[100px]"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        {onCancel && (
                            <Button type="button" variant="secondary" fullWidth size="lg" onClick={onCancel}>
                                Cancelar
                            </Button>
                        )}
                        <Button type="submit" fullWidth size="lg" className="text-xl">
                            Continuar
                            <ChevronRight size={24} />
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="space-y-8 animate-fade-in">
                    <div className="bg-warm-50 p-6 rounded-2xl border-2 border-border space-y-4">
                        <h4 className="text-lg font-bold text-text-primary border-b border-border pb-2">Resumen del pedido</h4>
                        <div className="space-y-3">
                            <p className="text-xl font-medium flex items-center gap-3">
                                <span className="text-green-600 font-bold uppercase text-sm bg-green-100 px-2 py-1 rounded-md">Tipo:</span>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </p>
                            <p className="text-xl font-medium flex items-center gap-3">
                                <span className="text-green-600 font-bold uppercase text-sm bg-green-100 px-2 py-1 rounded-md">Cuándo:</span>
                                {date} a las {time}
                            </p>
                            {notes && (
                                <p className="text-lg italic text-text-secondary bg-white p-3 rounded-lg border border-border">
                                    "{notes}"
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setStep("form")}
                            className="flex-1 flex items-center justify-center gap-2 text-text-secondary font-bold hover:text-text-primary py-4"
                        >
                            <ChevronLeft size={20} />
                            Corregir datos
                        </button>
                        <Button
                            fullWidth
                            size="lg"
                            loading={loading}
                            onClick={handleSubmit}
                            className="text-xl shadow-lg"
                        >
                            Confirmar Pedido
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
