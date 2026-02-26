"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
    {
        title: "Bienvenido, María. Aquí cuidamos de ti.",
        description: "Tu seguridad y bienestar son nuestra prioridad. Estamos aquí para acompañarte cada día.",
        image: "https://images.unsplash.com/photo-1516307361474-3205029857a1?q=80&w=2070&auto=format&fit=crop",
        btnText: "Siguiente",
        color: "var(--pais-green-500)",
    },
    {
        title: "Pide transporte con un solo toque.",
        description: "Viaja tranquila con conductores de confianza. Tu familia sabrá que ya llegaste.",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
        btnText: "Siguiente",
        color: "var(--pais-blue-500)",
    },
    {
        title: "Recuérdalo todo: medicina y salud.",
        description: "Tus pastillas a tiempo y alertas de emergencia siempre a mano. Tu salud, bajo control.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop",
        btnText: "¡Empezar ahora!",
        color: "var(--pais-green-500)",
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
        <div className="fixed inset-0 z-[100] bg-[var(--pais-warm-100)] overflow-y-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="onboarding-container max-w-2xl mx-auto"
                >
                    <div className="flex gap-2 mb-8">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`progress-dot ${idx === currentStep ? "active" : ""}`}
                            />
                        ))}
                    </div>

                    <h1 className="onboarding-title">{steps[currentStep].title}</h1>

                    <img
                        src={steps[currentStep].image}
                        alt="Onboarding"
                        className="onboarding-image aspect-video object-cover"
                    />

                    <p className="text-[var(--text-secondary)] text-xl mb-12 max-w-md">
                        {steps[currentStep].description}
                    </p>

                    <button
                        onClick={handleNext}
                        className="onboarding-btn shadow-lg hover:shadow-xl active:scale-95 text-white"
                        style={{ backgroundColor: steps[currentStep].color }}
                    >
                        {steps[currentStep].btnText}
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
