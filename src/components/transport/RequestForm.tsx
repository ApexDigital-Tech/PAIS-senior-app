"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@/components/ui/Button";
import { MapView } from "@/components/transport/MapView";
import type { FavoritePlace, TripFormData } from "@/types";
import {
    MapPin,
    Navigation,
    Clock,
    ChevronLeft,
    Hospital,
    Cross,
    Church,
    Home,
    TreePine,
    Building,
} from "lucide-react";

type Step = 1 | 2 | 3;

const placeIcons: Record<string, typeof Hospital> = {
    hospital: Hospital,
    pharmacy: Cross,
    church: Church,
    home: Home,
    park: TreePine,
    other: Building,
};



export function RequestForm() {
    const router = useRouter();
    const geo = useGeolocation();
    const [step, setStep] = useState<Step>(1);
    const [favorites, setFavorites] = useState<FavoritePlace[]>([]);
    const [formData, setFormData] = useState<Partial<TripFormData>>({});
    const [manualAddress, setManualAddress] = useState("");
    const [routeMetrics, setRouteMetrics] = useState<{ distance: string, duration: string } | null>(null);
    const [loadingFavs, setLoadingFavs] = useState(true);

    const { user } = useUser();
    const [submitting, setSubmitting] = useState(false);
    const supabase = createClient();

    // Fetch real favorites
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from("favorite_places")
                    .select("*")
                    .eq("senior_id", user.id);

                if (error) throw error;
                setFavorites(data || []);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoadingFavs(false);
            }
        };

        fetchFavorites();
    }, [user, supabase]);

    // Step 1: Pick destination
    const handleSelectDestination = (place: FavoritePlace) => {
        setFormData((prev) => ({
            ...prev,
            destination: { address: place.address, lat: place.lat, lng: place.lng },
        }));
        setStep(2);
    };

    // Step 2: Confirm origin
    const handleConfirmOrigin = () => {
        if (geo.position) {
            setFormData((prev) => ({
                ...prev,
                origin: {
                    address: "Mi ubicación actual",
                    lat: geo.position!.lat,
                    lng: geo.position!.lng,
                },
                scheduled_at: new Date().toISOString(),
            }));
        } else if (manualAddress) {
            setFormData((prev) => ({
                ...prev,
                origin: { address: manualAddress, lat: -16.5, lng: -68.15 },
                scheduled_at: new Date().toISOString(),
            }));
        }
        setStep(3);
    };



    // Step 3: Submit
    const handleSubmit = async () => {
        if (!user || !formData.origin || !formData.destination) return;

        setSubmitting(true);
        try {
            // 1. Insert transport request
            const { data: request, error } = await supabase.from("transport_requests").insert({
                senior_id: user.id,
                origin_address: formData.origin.address,
                origin_lat: formData.origin.lat,
                origin_lng: formData.origin.lng,
                destination_address: formData.destination.address,
                destination_lat: formData.destination.lat,
                destination_lng: formData.destination.lng,
                scheduled_at: formData.scheduled_at || new Date().toISOString(),
                status: 'pending'
            }).select().single();

            if (error) throw error;

            // 2. Log activity
            await supabase.from("activity_log").insert({
                user_id: user.id,
                action: 'TRIP_REQUESTED',
                entity_type: 'transport_requests',
                entity_id: request.id,
                metadata: {
                    origin: formData.origin.address,
                    destination: formData.destination.address
                }
            });

            router.push("/transport?success=true");
        } catch (error) {
            console.error("Error requesting trip:", error);
            alert("Hubo un error al solicitar el viaje. Por favor intenta de nuevo.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep((step - 1) as Step);
        else router.back();
    };

    return (
        <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${s <= step ? "bg-green-500" : "bg-warm-200"
                            }`}
                    />
                ))}
            </div>

            {/* Back button */}
            <button
                onClick={handleBack}
                className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors min-h-[48px] cursor-pointer"
            >
                <ChevronLeft size={20} />
                <span className="text-base">Atrás</span>
            </button>

            {/* Step 1: Destination */}
            {step === 1 && (
                <div className="animate-fade-in space-y-5">
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-text-primary">
                            ¿A dónde vas?
                        </h2>
                        <p className="text-base text-text-secondary mt-1">
                            Elige un destino favorito o escribe la dirección
                        </p>
                    </div>

                    {/* Favorites grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {favorites.length > 0 ? (
                            favorites.map((place) => {
                                const Icon = placeIcons[place.icon] || Building;
                                return (
                                    <button
                                        key={place.id}
                                        onClick={() => handleSelectDestination(place)}
                                        className="flex flex-col items-center gap-2 p-4 bg-surface rounded-[var(--radius-md)] border border-border hover:border-green-200 hover:shadow-[var(--shadow-md)] transition-all active:scale-[0.97] focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none cursor-pointer"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                            <Icon size={22} />
                                        </div>
                                        <span className="text-base font-semibold text-text-primary text-center leading-tight">
                                            {place.name}
                                        </span>
                                        <span className="text-xs text-text-secondary text-center line-clamp-2">
                                            {place.address}
                                        </span>
                                    </button>
                                );
                            })
                        ) : !loadingFavs ? (
                            <div className="col-span-2 p-8 text-center bg-warm-50 rounded-[var(--radius-md)] border border-dashed border-warm-200">
                                <p className="text-text-secondary">No tienes lugares guardados aún</p>
                            </div>
                        ) : (
                            <div className="col-span-2 p-8 text-center">
                                <p className="text-text-secondary animate-pulse">Cargando favoritos...</p>
                            </div>
                        )}
                    </div>

                    {/* Manual input */}
                    <div className="relative">
                        <MapPin
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
                        />
                        <input
                            type="text"
                            placeholder="O escribe una dirección..."
                            value={manualAddress}
                            onChange={(e) => setManualAddress(e.target.value)}
                            className="w-full h-14 rounded-[var(--radius-md)] bg-surface border-2 border-border text-lg text-text-primary pl-12 pr-4 placeholder:text-warm-300 focus:outline-none focus:border-border-focus focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    {manualAddress.length > 3 && (
                        <Button
                            fullWidth
                            size="lg"
                            onClick={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    destination: {
                                        address: manualAddress,
                                        lat: -16.5,
                                        lng: -68.15,
                                    },
                                }));
                                setStep(2);
                            }}
                        >
                            Ir a: {manualAddress}
                        </Button>
                    )}
                </div>
            )}

            {/* Step 2: Origin */}
            {step === 2 && (
                <div className="animate-fade-in space-y-5">
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-text-primary">
                            ¿Dónde te recogemos?
                        </h2>
                        <p className="text-base text-text-secondary mt-1">
                            Confirma tu punto de partida
                        </p>
                    </div>

                    {/* GPS option */}
                    <button
                        onClick={() => {
                            if (!geo.position) geo.refresh();
                            else handleConfirmOrigin();
                        }}
                        className={`w-full flex items-center gap-4 p-5 rounded-[var(--radius-md)] border-2 transition-all cursor-pointer ${geo.position
                            ? "border-green-500 bg-green-50"
                            : "border-border bg-surface hover:border-green-200"
                            } focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none`}
                    >
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                            <Navigation size={22} className="text-white" />
                        </div>
                        <div className="text-left flex-1">
                            <p className="text-lg font-semibold text-text-primary">
                                Mi ubicación actual
                            </p>
                            <p className="text-base text-text-secondary">
                                {geo.loading
                                    ? "Obteniendo ubicación..."
                                    : geo.position
                                        ? "Ubicación detectada ✓"
                                        : geo.error || "Toca para permitir ubicación"}
                            </p>
                        </div>
                    </button>

                    {/* Manual origin */}
                    <div className="text-center">
                        <p className="text-base text-text-secondary mb-3">
                            O escribe tu dirección de inicio
                        </p>
                        <input
                            type="text"
                            placeholder="Tu dirección..."
                            value={manualAddress}
                            onChange={(e) => setManualAddress(e.target.value)}
                            className="w-full h-14 rounded-[var(--radius-md)] bg-surface border-2 border-border text-lg text-text-primary px-4 placeholder:text-warm-300 focus:outline-none focus:border-border-focus focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    {/* Destination preview */}
                    {formData.destination && (
                        <div className="p-4 bg-warm-100 rounded-[var(--radius-md)] flex items-center gap-3">
                            <MapPin size={18} className="text-red-500 shrink-0" />
                            <div>
                                <p className="text-sm text-text-secondary">Destino</p>
                                <p className="text-base font-medium text-text-primary">
                                    {formData.destination.address}
                                </p>
                            </div>
                        </div>
                    )}

                    <Button
                        fullWidth
                        size="lg"
                        onClick={handleConfirmOrigin}
                        disabled={!geo.position && manualAddress.length < 4}
                    >
                        Confirmar punto de partida
                    </Button>
                </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
                <div className="animate-fade-in space-y-5">
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-text-primary">
                            Confirma tu viaje
                        </h2>
                        <p className="text-base text-text-secondary mt-1">
                            Revisa los detalles antes de solicitar
                        </p>
                    </div>

                    {/* Map preview */}
                    <MapView
                        origin={
                            formData.origin
                                ? { ...formData.origin, address: formData.origin.address }
                                : undefined
                        }
                        destination={
                            formData.destination
                                ? { ...formData.destination, address: formData.destination.address }
                                : undefined
                        }
                        onRouteCalculated={(distance, duration) => setRouteMetrics({ distance, duration })}
                        className="h-[240px]"
                    />

                    {/* Trip summary */}
                    <div className="bg-surface rounded-[var(--radius-md)] border border-border p-5 space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-3 h-3 rounded-full bg-green-500 shrink-0" />
                            <div>
                                <p className="text-sm text-text-secondary">Origen</p>
                                <p className="text-base font-medium text-text-primary">
                                    {formData.origin?.address}
                                </p>
                            </div>
                        </div>

                        <div className="ml-1.5 w-px h-3 border-l-2 border-dashed border-warm-300" />

                        <div className="flex items-start gap-3">
                            <MapPin size={14} className="mt-1 text-red-500 shrink-0" />
                            <div>
                                <p className="text-sm text-text-secondary">Destino</p>
                                <p className="text-base font-medium text-text-primary">
                                    {formData.destination?.address}
                                </p>
                            </div>
                        </div>

                        <hr className="border-border" />

                        <div className="flex items-center gap-2 text-text-secondary">
                            <Clock size={16} />
                            <span className="text-base font-semibold text-[var(--pais-green-700)]">
                                Salida: Ahora
                                {routeMetrics && ` — LLegada estimada en ${routeMetrics.duration}`}
                            </span>
                        </div>

                        {routeMetrics && (
                            <div className="pt-2 flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Distancia total:</span>
                                <span className="font-bold text-text-primary">{routeMetrics.distance}</span>
                            </div>
                        )}
                    </div>

                    <Button fullWidth size="lg" onClick={handleSubmit} loading={submitting}>
                        Solicitar Viaje
                    </Button>

                    <p className="text-sm text-text-secondary text-center">
                        Te conectaremos con un conductor de confianza
                    </p>
                </div>
            )}
        </div>
    );
}
