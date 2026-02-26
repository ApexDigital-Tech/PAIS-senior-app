"use client";

import { useParams, useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout";
import { MapView } from "@/components/transport/MapView";
import { Button } from "@/components/ui/Button";
import type { TransportRequest } from "@/types";
import {
    ChevronLeft,
    Clock,
    MapPin,
    Phone,
    Star,
    AlertTriangle,
    CheckCircle,
    User,
} from "lucide-react";

// Demo trip data matching the hub
const demoTrips: Record<string, TransportRequest> = {
    "trip-1": {
        id: "trip-1",
        senior_id: "",
        origin_address: "Mi ubicación actual",
        origin_lat: -16.5,
        origin_lng: -68.15,
        destination_address: "Hospital San Juan — Av. 6 de Agosto #2548",
        destination_lat: -16.5,
        destination_lng: -68.13,
        status: "completed",
        scheduled_at: "2026-02-24T12:00:00.000Z",
        completed_at: "2026-02-24T13:00:00.000Z",
        driver_id: null,
        rating: 5,
        notes: null,
        created_at: "2026-02-24T12:00:00.000Z",
    },
    "trip-2": {
        id: "trip-2",
        senior_id: "",
        origin_address: "Casa — Zona Sur",
        origin_lat: -16.54,
        origin_lng: -68.07,
        destination_address: "Farmacia Chávez — Calle Comercio #1234",
        destination_lat: -16.497,
        destination_lng: -68.133,
        status: "pending",
        scheduled_at: "2026-02-26T15:00:00.000Z",
        completed_at: null,
        driver_id: null,
        rating: null,
        notes: null,
        created_at: "2026-02-26T14:30:00.000Z",
    },
};

const statusSteps = [
    { key: "pending", label: "Solicitud enviada", icon: Clock },
    { key: "assigned", label: "Conductor asignado", icon: User },
    { key: "in_transit", label: "En camino", icon: MapPin },
    { key: "completed", label: "Viaje completado", icon: CheckCircle },
] as const;

export default function TripDetailPage() {
    const params = useParams();
    const router = useRouter();
    const tripId = params.id as string;
    const trip = demoTrips[tripId];

    if (!trip) {
        return (
            <PageContainer>
                <div className="text-center py-16">
                    <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
                    <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
                        Viaje no encontrado
                    </h2>
                    <p className="text-base text-text-secondary mb-6">
                        Este viaje no existe o fue eliminado
                    </p>
                    <Button onClick={() => router.push("/transport")}>
                        Volver a Transporte
                    </Button>
                </div>
            </PageContainer>
        );
    }

    const statusIdx = statusSteps.findIndex((s) => s.key === trip.status);
    const date = new Date(trip.scheduled_at);
    const formattedDate = date.toLocaleDateString("es", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("es", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <PageContainer>
            <div className="space-y-6 pb-8">
                {/* Back */}
                <button
                    onClick={() => router.push("/transport")}
                    className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors min-h-[48px] cursor-pointer"
                >
                    <ChevronLeft size={20} />
                    <span className="text-base">Mis viajes</span>
                </button>

                {/* Map */}
                <MapView
                    origin={{
                        lat: trip.origin_lat,
                        lng: trip.origin_lng,
                        address: trip.origin_address,
                    }}
                    destination={{
                        lat: trip.destination_lat,
                        lng: trip.destination_lng,
                        address: trip.destination_address,
                    }}
                    className="h-[260px]"
                />

                {/* Route details */}
                <div className="bg-surface rounded-[var(--radius-md)] border border-border p-5 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 w-3 h-3 rounded-full bg-green-500 shrink-0" />
                        <div>
                            <p className="text-sm text-text-secondary">Origen</p>
                            <p className="text-base font-medium text-text-primary">
                                {trip.origin_address}
                            </p>
                        </div>
                    </div>
                    <div className="ml-1.5 w-px h-3 border-l-2 border-dashed border-warm-300" />
                    <div className="flex items-start gap-3">
                        <MapPin size={14} className="mt-1 text-red-500 shrink-0" />
                        <div>
                            <p className="text-sm text-text-secondary">Destino</p>
                            <p className="text-base font-medium text-text-primary">
                                {trip.destination_address}
                            </p>
                        </div>
                    </div>
                    <hr className="border-border" />
                    <div className="flex items-center gap-2 text-text-secondary">
                        <Clock size={16} />
                        <span className="text-base capitalize">
                            {formattedDate} — {formattedTime}
                        </span>
                    </div>
                </div>

                {/* Status timeline */}
                <section>
                    <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                        Estado del viaje
                    </h2>
                    <div className="space-y-0">
                        {statusSteps.map((step, i) => {
                            const reached = i <= statusIdx;
                            const current = step.key === trip.status;
                            const Icon = step.icon;
                            return (
                                <div key={step.key} className="flex items-start gap-4">
                                    {/* Timeline dot & line */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${current
                                                ? "bg-green-500 text-white ring-4 ring-green-100"
                                                : reached
                                                    ? "bg-green-500 text-white"
                                                    : "bg-warm-200 text-text-secondary"
                                                }`}
                                        >
                                            <Icon size={16} />
                                        </div>
                                        {i < statusSteps.length - 1 && (
                                            <div
                                                className={`w-0.5 h-8 ${reached ? "bg-green-500" : "bg-warm-200"
                                                    }`}
                                            />
                                        )}
                                    </div>
                                    {/* Label */}
                                    <div className="pt-1.5">
                                        <p
                                            className={`text-base font-medium ${reached ? "text-text-primary" : "text-text-secondary"
                                                }`}
                                        >
                                            {step.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Driver info (when assigned) */}
                {trip.driver_id && (
                    <div className="bg-surface rounded-[var(--radius-md)] border border-border p-5">
                        <h3 className="font-heading text-lg font-bold text-text-primary mb-3">
                            Conductor
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <User size={28} />
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-text-primary">
                                    Roberto Quispe
                                </p>
                                <div className="flex items-center gap-1 text-amber-500">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={14} fill={s <= 4 ? "currentColor" : "none"} />
                                    ))}
                                    <span className="text-sm text-text-secondary ml-1">4.8</span>
                                </div>
                            </div>
                            <button className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 hover:bg-green-100 transition-colors cursor-pointer">
                                <Phone size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Rating (when completed) */}
                {trip.status === "completed" && trip.rating && (
                    <div className="bg-green-50 rounded-[var(--radius-md)] p-5 text-center">
                        <p className="text-base text-text-secondary mb-2">Tu calificación</p>
                        <div className="flex items-center justify-center gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s}
                                    size={28}
                                    fill={s <= trip.rating! ? "currentColor" : "none"}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Cancel (when pending) */}
                {trip.status === "pending" && (
                    <Button fullWidth variant="secondary" onClick={() => router.push("/transport")}>
                        Cancelar viaje
                    </Button>
                )}
            </div>
        </PageContainer>
    );
}
