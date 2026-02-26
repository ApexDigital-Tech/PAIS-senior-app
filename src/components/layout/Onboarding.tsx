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
        colorRaw: "151 100% 36%",
    },
    {
        title: "Pide transporte con un solo toque.",
        description: "Viaja tranquila con conductores de confianza. Tu familia sabrá que ya llegaste.",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
        btnText: "Siguiente",
        color: "var(--pais-blue-500)",
        colorRaw: "210 100% 50%",
    },
    {
        title: "Recuérdalo todo: medicina y salud.",
        description: "Tus pastillas a tiempo y alertas de emergencia siempre a mano. Tu salud, bajo control.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop",
        btnText: "¡Empezar ahora!",
        color: "var(--pais-green-500)",
        colorRaw: "151 100% 36%",
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
        <div className="fixed inset-0 z-[9999] bg-[hsl(60_20%_96%)] overflow-y-auto flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="onboarding-card max-w-2xl mx-auto w-full bg-white p-12 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] m-6 border-4 border-white isolate relative"
                >
                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-4 mb-10">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`progress-dot ${idx === currentStep ? "active scale-110" : "opacity-30"}`}
                                style={{
                                    backgroundColor: idx === currentStep ? `hsl(${steps[idx].colorRaw})` : undefined
                                }}
                            />
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1] text-[hsl(210_100%_12%)] font-heading">
                        {steps[currentStep].title}
                    </h1>

                    <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden mb-10 shadow-lg bg-gray-100">
                        <img
                            src={steps[currentStep].image}
                            alt="Contexto PAIS"
                            className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070";
                            }}
                        />
                    </div>

                    <p className="text-[hsl(60_8%_33%)] text-2xl mb-12 max-w-lg mx-auto font-medium leading-[1.45] font-body">
                        {steps[currentStep].description}
                    </p>

                    <button
                        onClick={handleNext}
                        className="onboarding-btn shadow-2xl hover:scale-105 transition-all text-white w-full py-8 text-2xl font-black rounded-3xl"
                        style={{ backgroundColor: `hsl(${steps[currentStep].colorRaw})` }}
                    >
                        {steps[currentStep].btnText}
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
