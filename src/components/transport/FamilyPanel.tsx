"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { Bell, MapPin, Heart, AlertCircle, Clock } from "lucide-react";

export function FamilyPanel() {
    const { user } = useUser();
    const supabase = createClient();
    const [recentTrips, setRecentTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLinkedData = async () => {
            if (!user) return;
            // Fetch senior_id where user is the familiar (assuming we might just look up linked_senior_id or fetch all for now in MVP)
            const { data: seniors, error: seniorError } = await supabase
                .from("users")
                .select("id, full_name")
                .eq("role", "senior")
                .limit(1); // Demo limit 

            if (seniors && seniors.length > 0) {
                const seniorId = seniors[0].id; // Replace with actual linking logic later

                // Fetch active or recent trips for this senior
                const { data: trips } = await supabase
                    .from("transport_requests")
                    .select("*")
                    .eq("senior_id", seniorId)
                    .order("created_at", { ascending: false })
                    .limit(3);

                if (trips) setRecentTrips(trips);
            }
            setLoading(false);
        };

        fetchLinkedData();

        const channel = supabase
            .channel(`public:transport_requests`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "transport_requests" },
                (payload) => {
                    fetchLinkedData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, supabase]);

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'Buscando conductor...';
            case 'assigned': return 'El taxi va en camino';
            case 'in_transit': return 'Viajando al destino';
            case 'completed': return 'Llegó a salvo';
            default: return status;
        }
    };

    if (loading) return <div className="p-8 text-center">Cargando datos de tu ser querido...</div>;

    const activeTrip = recentTrips.find(t => t.status !== 'completed' && t.status !== 'cancelled');

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="font-heading text-3xl font-bold text-[var(--pais-black)]">
                Bienvenido, {user?.full_name?.split(" ")[0]}
            </h1>
            <p className="text-text-secondary">
                Aquí puedes ver la actividad y ubicación de María (tu mamá).
            </p>

            {activeTrip ? (
                <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-bl-[100px] opacity-10 flex items-center justify-center">
                        <AlertCircle size={40} className="text-blue-500" />
                    </div>

                    <h2 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        Viaje Activo
                    </h2>
                    <p className="font-semibold text-lg text-blue-900">{getStatusText(activeTrip.status)}</p>

                    <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center shrink-0">
                                <Clock size={16} className="text-blue-700" />
                            </div>
                            <span className="text-blue-900 line-clamp-1">{new Date(activeTrip.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flexitems-center justify-center shrink-0">
                                <MapPin size={16} className="text-red-600 ml-2" />
                            </div>
                            <span className="text-blue-900 line-clamp-1 font-medium">{activeTrip.destination_address}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex justify-center items-center mb-4">
                        <Heart size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-green-900">Todo en orden</h3>
                    <p className="text-green-800 mt-1">María está actualmente en casa.</p>
                </div>
            )}

            <div className="mt-8 space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-text-primary">
                    <Bell size={18} /> Historial reciente
                </h3>
                {recentTrips.filter(t => t.status === 'completed').length === 0 ? (
                    <p className="text-sm text-text-secondary">No hay viajes recientes.</p>
                ) : (
                    <div className="space-y-3">
                        {recentTrips.filter(t => t.status === 'completed').map((trip) => (
                            <div key={trip.id} className="p-4 bg-surface border border-border rounded-lg flex items-start gap-3">
                                <div className="p-2 bg-warm-100 rounded-full">
                                    <MapPin size={16} className="text-warm-600" />
                                </div>
                                <div>
                                    <p className="text-sm">Llegó a <span className="font-bold">{trip.destination_address}</span></p>
                                    <p className="text-xs text-text-secondary">Hoy, {new Date(trip.completed_at || trip.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
