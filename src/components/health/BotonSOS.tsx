"use client";

import { useState, useEffect } from "react";
import { AlertCircle, ShieldAlert } from "lucide-react";

export default function BotonSOS() {
    const [isPressing, setIsPressing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPressing && progress < 100) {
            interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 5, 100));
            }, 50);
        } else {
            if (progress < 100) {
                setProgress(0);
            }
        }

        if (progress === 100 && !triggered) {
            handleTrigger();
        }

        return () => clearInterval(interval);
    }, [isPressing, progress, triggered]);

    const handleTrigger = async () => {
        setTriggered(true);
        // Simulate API call to register SOS
        console.log("SOS Alert Triggered!");

        // In a real app, we would get GPS position and send to Supabase
        // await supabase.from('sos_alerts').insert({ ... })

        setTimeout(() => {
            setTriggered(false);
            setProgress(0);
            alert("ALERTA ENVIADA: Tus familiares han sido notificados.");
        }, 3000);
    };

    return (
        <div className="fixed bottom-24 right-6 z-50">
            <div className="relative flex flex-col items-center">
                {isPressing && !triggered && (
                    <div className="absolute -top-12 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce shadow-lg">
                        Mantén presionado...
                    </div>
                )}

                <button
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl active:scale-95 touch-none select-none ${triggered
                            ? "bg-red-700 animate-pulse"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    onMouseDown={() => setIsPressing(true)}
                    onMouseUp={() => setIsPressing(false)}
                    onTouchStart={() => setIsPressing(true)}
                    onTouchEnd={() => setIsPressing(false)}
                    onMouseLeave={() => setIsPressing(false)}
                >
                    {/* Progress Circle Visual */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="44"
                            stroke="white"
                            strokeWidth="4"
                            fill="transparent"
                            className="opacity-20"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="44"
                            stroke="white"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray="276"
                            strokeDashoffset={276 - (276 * progress) / 100}
                            className="transition-all duration-75 ease-linear"
                        />
                    </svg>

                    <div className="flex flex-col items-center justify-center text-white">
                        <ShieldAlert size={triggered ? 40 : 32} />
                        <span className="font-black text-xl leading-none mt-1">SOS</span>
                    </div>
                </button>

                <p className="mt-2 text-[10px] font-bold text-red-600 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                    EMERGENCIA
                </p>
            </div>
        </div>
    );
}
