"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import { MapPin, Navigation, Clock, CheckCircle } from "lucide-react";
import type { TransportRequest } from "@/types";
import { MapView } from "./MapView";

export function DriverPanel() {
    const { user } = useUser();
    const supabase = createClient();
    const [trips, setTrips] = useState<TransportRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAvailableTrips = async () => {
            if (!user) return;
            // Fetch pending trips or trips assigned to this driver
            const { data, error } = await supabase
                .from("transport_requests")
                .select("*")
                .or(`status.eq.pending,driver_id.eq.${user.id}`)
                .order("created_at", { ascending: false });

            if (!error && data) {
                setTrips(data);
            }
            setLoading(false);
        };

        fetchAvailableTrips();

        // Optional: subscribe to new trips
        const channel = supabase
            .channel("public:transport_requests")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "transport_requests" },
                (payload) => {
                    fetchAvailableTrips();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, supabase]);

    const handleAcceptTrip = async (tripId: string) => {
        if (!user) return;
        const { error } = await supabase
            .from("transport_requests")
            .update({ status: "assigned", driver_id: user.id })
            .eq("id", tripId);

        if (error) {
            alert("No se pudo aceptar el viaje.");
        }
    };

    const handleStartTrip = async (tripId: string) => {
        const { error } = await supabase
            .from("transport_requests")
            .update({ status: "in_transit" })
            .eq("id", tripId);

        if (error) alert("Error al iniciar el viaje");
    };

    const handleCompleteTrip = async (tripId: string) => {
        const { error } = await supabase
            .from("transport_requests")
            .update({ status: "completed", completed_at: new Date().toISOString() })
            .eq("id", tripId);

        if (error) alert("Error al completar el viaje");
    };

    if (loading) return <div className="p-8 text-center">Cargando viajes...</div>;

    const myTrip = trips.find((t) => (t.status === "assigned" || t.status === "in_transit") && t.driver_id === user?.id);
    const availableTrips = trips.filter((t) => t.status === "pending");

    return (
        <div className="space-y-6">
            <h1 className="font-heading text-3xl font-bold text-[var(--pais-black)]">
                Panel de Conductor
            </h1>

            {myTrip ? (
                <div className="bg-surface rounded-xl border-2 border-green-500 overflow-hidden shadow-lg animate-fade-in">
                    <div className="bg-green-500 p-4 text-white font-bold flex justify-between items-center">
                        <span>{myTrip.status === "assigned" ? "Viaje Asignado (Recogiendo)" : "Viaje en Curso"}</span>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </div>

                    <div className="p-4 space-y-4">
                        <div className="flex items-start gap-3">
                            <Navigation size={20} className="text-green-600 shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-text-secondary">Recoger en:</p>
                                <p className="font-semibold text-lg">{myTrip.origin_address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin size={20} className="text-red-600 shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-text-secondary">Llevar a:</p>
                                <p className="font-semibold text-lg">{myTrip.destination_address}</p>
                            </div>
                        </div>

                        <div className="h-[250px] mt-4 rounded-xl overflow-hidden pointer-events-none">
                            <MapView
                                origin={{ lat: myTrip.origin_lat, lng: myTrip.origin_lng, address: myTrip.origin_address }}
                                destination={{ lat: myTrip.destination_lat, lng: myTrip.destination_lng, address: myTrip.destination_address }}
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            {myTrip.status === "assigned" ? (
                                <Button fullWidth size="lg" onClick={() => handleStartTrip(myTrip.id)}>
                                    Ya recogí al pasajero
                                </Button>
                            ) : (
                                <Button fullWidth size="lg" onClick={() => handleCompleteTrip(myTrip.id)}>
                                    Finalizar Viaje
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="font-heading text-xl font-bold text-text-primary">
                        Viajes Disponibles
                    </h2>
                    {availableTrips.length === 0 ? (
                        <div className="text-center p-8 bg-warm-50 rounded-xl border border-dashed border-warm-200">
                            No hay viajes pendientes en este momento.
                        </div>
                    ) : (
                        availableTrips.map((trip) => (
                            <div key={trip.id} className="bg-surface border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium truncate">{trip.origin_address}</p>
                                        <p className="text-sm text-text-secondary truncate mt-1">➡ {trip.destination_address}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button fullWidth onClick={() => handleAcceptTrip(trip.id)}>
                                        Aceptar Viaje
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
