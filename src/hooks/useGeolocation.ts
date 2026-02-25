"use client";

import { useState, useEffect, useCallback } from "react";
import type { GeoPosition } from "@/types";

interface GeolocationState {
    position: GeoPosition | null;
    loading: boolean;
    error: string | null;
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        position: null,
        loading: false,
        error: null,
    });

    const requestPosition = useCallback(() => {
        if (!navigator.geolocation) {
            setState({
                position: null,
                loading: false,
                error: "Tu dispositivo no soporta geolocalización",
            });
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setState({
                    position: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        accuracy: pos.coords.accuracy,
                    },
                    loading: false,
                    error: null,
                });
            },
            (err) => {
                let message = "No pudimos obtener tu ubicación";
                if (err.code === 1) message = "Necesitamos permiso para usar tu ubicación";
                if (err.code === 2) message = "Ubicación no disponible en este momento";
                if (err.code === 3) message = "La solicitud de ubicación tardó demasiado";

                setState({
                    position: null,
                    loading: false,
                    error: message,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
            }
        );
    }, []);

    // Auto-request on mount
    useEffect(() => {
        requestPosition();
    }, [requestPosition]);

    return { ...state, refresh: requestPosition };
}
