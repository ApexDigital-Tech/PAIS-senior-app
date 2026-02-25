"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps, isGoogleMapsAvailable } from "@/lib/google-maps";
import { MapPin, Navigation } from "lucide-react";

interface MapViewProps {
    origin?: { lat: number; lng: number; address?: string };
    destination?: { lat: number; lng: number; address?: string };
    className?: string;
    onRouteCalculated?: (distance: string, duration: string) => void;
}

export function MapView({ origin, destination, className = "", onRouteCalculated }: MapViewProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapError, setMapError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isGoogleMapsAvailable()) {
            setMapError(true);
            setLoading(false);
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let map: any;

        loadGoogleMaps()
            .then((maps) => {
                if (!mapRef.current) return;

                const center = destination || origin || { lat: -16.5, lng: -68.15 }; // Default: La Paz

                map = new maps.Map(mapRef.current, {
                    center,
                    zoom: 14,
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }],
                        },
                    ],
                });

                if (origin) {
                    new maps.Marker({
                        position: origin,
                        map,
                        icon: {
                            path: maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: "#2D8A56",
                            fillOpacity: 1,
                            strokeColor: "#fff",
                            strokeWeight: 2,
                        },
                        title: "Origen",
                    });
                }

                if (destination) {
                    new maps.Marker({
                        position: destination,
                        map,
                        icon: {
                            path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                            scale: 6,
                            fillColor: "#D32F2F",
                            fillOpacity: 1,
                            strokeColor: "#fff",
                            strokeWeight: 2,
                        },
                        title: "Destino",
                    });
                }

                if (origin && destination) {
                    const directionsService = new maps.DirectionsService();
                    const directionsRenderer = new maps.DirectionsRenderer({
                        map,
                        suppressMarkers: true,
                        polylineOptions: {
                            strokeColor: "#1A6B8A",
                            strokeWeight: 4,
                            strokeOpacity: 0.8,
                        },
                    });

                    directionsService.route(
                        {
                            origin,
                            destination,
                            travelMode: maps.TravelMode.DRIVING,
                        },
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (result: any, status: any) => {
                            if (status === "OK" && result) {
                                directionsRenderer.setDirections(result);
                                const leg = result.routes[0].legs[0];
                                if (leg && onRouteCalculated) {
                                    onRouteCalculated(leg.distance.text, leg.duration.text);
                                }
                            }
                        }
                    );
                }

                setLoading(false);
            })
            .catch(() => {
                setMapError(true);
                setLoading(false);
            });
    }, [origin, destination]);

    // Fallback when Maps not available
    if (mapError) {
        return (
            <div
                className={`rounded-[var(--radius-md)] bg-warm-100 border border-border p-6 ${className}`}
            >
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                        <Navigation size={24} className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-text-primary mb-1">
                            Mapa no disponible
                        </p>
                        <p className="text-base text-text-secondary">
                            La ruta se mostrará cuando se configure Google Maps
                        </p>
                    </div>

                    {origin && (
                        <div className="flex items-center gap-2 text-base text-text-secondary">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span>{origin.address || `${origin.lat.toFixed(4)}, ${origin.lng.toFixed(4)}`}</span>
                        </div>
                    )}
                    {destination && (
                        <div className="flex items-center gap-2 text-base text-text-secondary">
                            <MapPin size={14} className="text-red-500" />
                            <span>{destination.address || `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}`}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {loading && (
                <div className="absolute inset-0 bg-warm-100 rounded-[var(--radius-md)] flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <div
                ref={mapRef}
                className="w-full h-full rounded-[var(--radius-md)] min-h-[280px]"
            />
        </div>
    );
}
