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
            <section className="space-y-4 mb-8">
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                    Acciones rápidas
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <Card
                        icon={<Car size={24} />}
                        title="Pedir Transporte"
                        description="Solicita un viaje a donde necesites ir"
                        onClick={() => router.push("/transport")}
                        badge="Disponible"
                    />

                    <Card
                        icon={<Users size={24} />}
                        title="Buscar Compañía"
                        description="Conecta con un voluntario para una visita"
                        onClick={() => router.push("/community")}
                    />

                    <Card
                        icon={<Heart size={24} />}
                        title="Mi Salud"
                        description="Revisa tus medicamentos y citas"
                        onClick={() => router.push("/health")}
                    />
                </div>
            </section>

            {/* Today's Reminders */}
            <section className="space-y-4 mb-8">
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                    Hoy
                </h2>

                <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-[var(--radius-md)] border border-blue-200">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                            <Pill size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-semibold text-text-primary">
                                Medicamento a las 10:00
                            </p>
                            <p className="text-base text-text-secondary">
                                Losartán 50mg — 1 pastilla
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-[var(--radius-md)] border border-green-200">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                            <Calendar size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-semibold text-text-primary">
                                Visita de Ana a las 15:00
                            </p>
                            <p className="text-base text-text-secondary">
                                Voluntaria — Paseo por el parque
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-surface rounded-[var(--radius-md)] border border-border">
                        <div className="w-10 h-10 rounded-full bg-warm-200 flex items-center justify-center shrink-0">
                            <MapPin size={20} className="text-warm-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-semibold text-text-primary">
                                Viaje al Hospital San Juan
                            </p>
                            <p className="text-base text-text-secondary">Mañana a las 9:00</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="mt-8">
                <div className="p-5 bg-warm-100 rounded-[var(--radius-md)] border border-border text-center">
                    <p className="text-base text-text-secondary mb-3">
                        Tu contacto de emergencia
                    </p>
                    <p className="text-lg font-semibold text-text-primary">
                        Carlos García (hijo)
                    </p>
                    <Button variant="secondary" size="sm" className="mt-3">
                        Llamar a Carlos
                    </Button>
                </div>
            </section>
        </PageContainer>
    );
}
