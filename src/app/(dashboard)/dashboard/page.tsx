"use client";

import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Car, Users, Heart, Calendar, Pill, MapPin } from "lucide-react";

export default function HomePage() {
    const router = useRouter();

    return (
        <PageContainer>
            {/* Welcome Section */}
            <section className="mb-8 animate-fade-in">
                <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
                    ¡Bienvenida!
                </h1>
                <p className="text-lg text-text-secondary">
                    ¿Qué necesitas hoy? Elige una opción.
                </p>
            </section>

            {/* Quick Actions */}
            <section className="space-y-4 mb-10">
                <div className="flex items-center justify-between">
                    <h2 className="font-heading text-2xl font-bold text-text-primary">
                        ¿Cómo te ayudamos hoy?
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Card
                        icon={<Car size={32} className="text-[var(--pais-blue-600)]" />}
                        title="Pedir Transporte"
                        description="Viajes seguros con conductores certificados"
                        onClick={() => router.push("/transport")}
                        className="grad-transport shadow-lg hover:scale-[1.02] transition-transform"
                        badge="ACTIVO"
                    />

                    <Card
                        icon={<Users size={32} className="text-[var(--pais-purple-500)]" />}
                        title="Compañía y Charla"
                        description="Conecta con voluntarios para pasear o conversar"
                        onClick={() => router.push("/community")}
                        className="grad-community shadow-lg hover:scale-[1.02] transition-transform"
                    />

                    <Card
                        icon={<Heart size={32} className="text-[var(--pais-red-500)]" />}
                        title="Mi Salud y Bienestar"
                        description="Tus medicamentos y citas en un solo lugar"
                        onClick={() => router.push("/health")}
                        className="grad-health shadow-lg hover:scale-[1.02] transition-transform"
                    />
                </div>
            </section>

            {/* Today's Schedule */}
            <section className="space-y-4 mb-10">
                <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
                    <span className="w-2 h-6 bg-[var(--pais-orange-500)] rounded-full"></span>
                    Tu Agenda de Hoy
                </h2>

                <div className="space-y-3">
                    <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-[var(--pais-warm-200)] shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--pais-blue-50)] text-[var(--pais-blue-600)] flex items-center justify-center shrink-0">
                            <Pill size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-bold text-text-primary leading-tight">
                                Medicamento: Losartán
                            </p>
                            <p className="text-base text-text-secondary">A las 10:00 — 1 pastilla</p>
                        </div>
                        <div className="text-xs font-bold text-[var(--pais-blue-600)] bg-[var(--pais-blue-50)] px-3 py-1 rounded-full">
                            PENDIENTE
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-[var(--pais-warm-200)] shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--pais-orange-50)] text-[var(--pais-orange-500)] flex items-center justify-center shrink-0">
                            <Calendar size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-bold text-text-primary leading-tight">
                                Visita de Voluntario: Ana
                            </p>
                            <p className="text-base text-text-secondary">A las 15:00 — Paseo por el parque</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Info */}
            <section className="mt-8 relative overflow-hidden group">
                <div className="p-8 bg-gradient-to-br from-[var(--pais-green-500)] to-[var(--pais-green-700)] rounded-[3rem] text-white shadow-xl transform transition-transform group-hover:scale-[1.01]">
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl shadow-inner group-hover:bg-white/30 transition-colors">
                            <Heart size={40} className="animate-pulse" />
                        </div>
                        <div>
                            <p className="text-white/80 text-base font-bold uppercase tracking-wider">Contacto de confianza</p>
                            <p className="text-3xl font-black font-heading">Carlos García (Hijo)</p>
                        </div>
                    </div>
                    <Button variant="secondary" fullWidth className="mt-8 bg-white text-[var(--pais-green-700)] hover:bg-[var(--pais-warm-50)] font-black text-2xl py-8 rounded-2xl border-none shadow-2xl">
                        Llamar a Carlos
                    </Button>
                </div>
                {/* Decorative glows */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--pais-green-400)] rounded-full blur-3xl opacity-50"></div>
            </section>
        </PageContainer>
    );
}
