"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
    {
        title: "Bienvenido, María. Aquí cuidamos de ti.",
        description: "Tu seguridad y bienestar son nuestra prioridad. Estamos aquí para acompañarte cada día.",
        image: "https://images.unsplash.com/photo-1516307361474-3205029857a1?q=80&w=2070&auto=format&fit=crop",
        btnText: "Siguiente",
        colorClass: "bg-green-500",
    },
    {
        title: "Pide transporte con un solo toque.",
        description: "Viaja tranquila con conductores de confianza. Tu familia sabrá que ya llegaste.",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
        btnText: "Siguiente",
        colorClass: "bg-blue-500",
    },
    {
        title: "Recuérdalo todo: medicina y salud.",
        description: "Tus pastillas a tiempo y alertas de emergencia siempre a mano. Tu salud, bajo control.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop",
        btnText: "¡Empezar ahora!",
        colorClass: "bg-green-500",
    },
];

export function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem("pais-onboarding-seen");
        if (!hasSeenOnboarding) {
            setIsVisible(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            localStorage.setItem("pais-onboarding-seen", "true");
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#F5F5F0] overflow-y-auto flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="onboarding-card max-w-2xl mx-auto w-full bg-white p-10 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white ring-1 ring-black/5 flex flex-col items-center text-center"
                >
                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-5 mb-12">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-4 h-4 rounded-full transition-all duration-500 ${idx === currentStep
                                        ? `scale-150 ${steps[currentStep].colorClass}`
                                        : "bg-warm-200 opacity-50"
                                    }`}
                            />
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1] text-warm-900 font-heading tracking-tight">
                        {steps[currentStep].title}
                    </h1>

                    <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-4 border-white">
                        <img
                            src={steps[currentStep].image}
                            alt="Contexto PAIS"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070";
                            }}
                        />
                    </div>

                    <p className="text-warm-600 text-2xl md:text-3xl mb-14 max-w-lg mx-auto font-medium leading-relaxed">
                        {steps[currentStep].description}
                    </p>

                    <button
                        onClick={handleNext}
                        className={`onboarding-btn shadow-2xl hover:scale-105 active:scale-95 transition-all text-white w-full py-8 text-3xl font-black rounded-3xl ${steps[currentStep].colorClass}`}
                    >
                        {steps[currentStep].btnText}
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
