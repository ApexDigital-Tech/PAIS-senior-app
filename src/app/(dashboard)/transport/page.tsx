"use client";

import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/transport/TripCard";
import type { TransportRequest, FavoritePlace } from "@/types";
import { Plus, MapPin, Hospital, Cross, Church, Home, TreePine, Building } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const placeIcons: Record<string, typeof Hospital> = {
    hospital: Hospital,
    pharmacy: Cross,
    church: Church,
    home: Home,
    park: TreePine,
    other: Building,
};

// Demo data
const demoFavorites: FavoritePlace[] = [
    { id: "1", senior_id: "", name: "Hospital San Juan", address: "Av. 6 de Agosto #2548", lat: -16.5, lng: -68.13, icon: "hospital" },
    { id: "2", senior_id: "", name: "Farmacia Chávez", address: "Calle Comercio #1234", lat: -16.497, lng: -68.133, icon: "pharmacy" },
    { id: "3", senior_id: "", name: "Iglesia San Francisco", address: "Plaza San Francisco s/n", lat: -16.496, lng: -68.137, icon: "church" },
    { id: "4", senior_id: "", name: "Casa de Carlos", address: "Zona Sur, Calle 21 #450", lat: -16.54, lng: -68.07, icon: "home" },
];

const demoTrips: TransportRequest[] = [
    {
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
    {
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
];

export default function TransportPage() {
    const router = useRouter();
    const { user, loading } = useUser();

    // Redirections for restricted roles
    if (!loading && (user?.role === "conductor" || user?.role === "familiar")) {
        router.push("/dashboard");
        return null;
    }

    return (
        <PageContainer>
            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-text-primary">
                            Transporte
                        </h1>
                        <p className="text-base text-text-secondary mt-0.5">
                            Viajes seguros, cuando los necesites
                        </p>
                    </div>
                </div>

                {/* Main CTA */}
                <Button
                    fullWidth
                    size="lg"
                    icon={<Plus size={22} />}
                    onClick={() => router.push("/transport/new")}
                >
                    Pedir Viaje
                </Button>

                {/* Favorites */}
                <section>
                    <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
                        Destinos favoritos
                    </h2>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
                        {demoFavorites.map((place) => {
                            const Icon = placeIcons[place.icon] || Building;
                            return (
                                <button
                                    key={place.id}
                                    onClick={() => router.push("/transport/new")}
                                    className="flex flex-col items-center gap-2 min-w-[100px] p-3 bg-surface rounded-[var(--radius-md)] border border-border hover:border-green-200 hover:shadow-[var(--shadow-sm)] transition-all snap-start active:scale-[0.97] focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none cursor-pointer shrink-0"
                                >
                                    <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-sm font-semibold text-text-primary text-center leading-tight">
                                        {place.name}
                                    </span>
                                </button>
                            );
                        })}

                        {/* Add new favorite */}
                        <button
                            onClick={() => router.push("/transport/new")}
                            className="flex flex-col items-center gap-2 min-w-[100px] p-3 bg-warm-100 rounded-[var(--radius-md)] border-2 border-dashed border-warm-300 hover:border-green-300 transition-all snap-start active:scale-[0.97] focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none cursor-pointer shrink-0"
                        >
                            <div className="w-11 h-11 rounded-full bg-warm-200 flex items-center justify-center text-text-secondary">
                                <Plus size={20} />
                            </div>
                            <span className="text-sm font-medium text-text-secondary text-center">
                                Agregar
                            </span>
                        </button>
                    </div>
                </section>

                {/* Trip history */}
                <section>
                    <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
                        Mis viajes
                    </h2>

                    <div className="space-y-3">
                        {demoTrips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                trip={trip}
                                onClick={() => router.push(`/transport/${trip.id}`)}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </PageContainer>
    );
}
