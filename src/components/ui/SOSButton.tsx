"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

interface SOSButtonProps {
    onActivate?: () => void;
}

export function SOSButton({ onActivate }: SOSButtonProps) {
    const [confirming, setConfirming] = useState(false);

    const handlePress = () => {
        if (confirming) {
            onActivate?.();
            setConfirming(false);
        } else {
            setConfirming(true);
            setTimeout(() => setConfirming(false), 5000);
        }
    };

    return (
        <>
            {/* Confirmation overlay */}
            {confirming && (
                <div className="fixed inset-0 bg-black/40 z-40 animate-fade-in" />
            )}

            {/* SOS Button */}
            <button
                onClick={handlePress}
                aria-label={confirming ? "Confirmar emergencia" : "Botón de emergencia SOS"}
                className={`
          fixed z-50 rounded-full flex items-center justify-center
          transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50
          select-none cursor-pointer
          ${confirming
                        ? "bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-48 bg-red-500 shadow-lg"
                        : "bottom-24 right-5 w-16 h-16 bg-red-500 shadow-md animate-sos-pulse"
                    }
        `}
            >
                <div className="flex flex-col items-center gap-1">
                    <Phone
                        className={`text-white ${confirming ? "w-10 h-10" : "w-7 h-7"}`}
                        strokeWidth={2.5}
                    />
                    <span
                        className={`text-white font-bold ${confirming ? "text-xl" : "text-xs"
                            }`}
                    >
                        {confirming ? "CONFIRMAR" : "SOS"}
                    </span>
                </div>
            </button>

            {/* Cancel hint */}
            {confirming && (
                <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50">
                    <p className="text-white text-lg text-center font-medium animate-fade-in">
                        Toca para enviar alerta a tu familia
                    </p>
                    <p className="text-white/70 text-base text-center mt-2">
                        Se cancelará en 5 segundos
                    </p>
                </div>
            )}
        </>
    );
}
