"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

function ConfirmAccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState("Validando tu acceso...");
    const [error, setError] = useState(false);

    useEffect(() => {
        const validateAccess = async () => {
            const supabase = createClient();
            const next = searchParams.get("next") ?? "/dashboard";

            // 1. Primero, revisamos si Supabase ya detectó la sesión a través del Client
            // O si hay parámetros hash en la URL (#access_token=...) que Supabase Client leerá automáticamente
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) {
                setError(true);
                setMessage("El enlace es inválido o expiró. Por favor ingresa nuevamente.");
                setTimeout(() => router.push("/login?error=true"), 3000);
                return;
            }

            if (session) {
                // Éxito, nos redirigimos al dashboard
                setMessage("¡Acceso validado! Redirigiendo...");
                setTimeout(() => router.push(next), 1000);
                return;
            }

            // Si llegamos aquí y no hay sesión, podría haber sido consumida, 
            // o el hash ya fue limpiado de la URL
            setError(true);
            setMessage("No pudimos validar tu enlace. Serás redirigido al inicio...");
            setTimeout(() => router.push("/login"), 3000);
        };

        validateAccess();
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center"
            >
                {!error ? (
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                ) : (
                    <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                        !
                    </div>
                )}
                <h2 className="text-xl font-bold text-warm-900 mb-2">
                    {error ? "Error de Validación" : "Comprobando..."}
                </h2>
                <p className="text-warm-500 text-sm">{message}</p>
            </motion.div>
        </div>
    );
}

export default function ConfirmAccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" /></div>}>
            <ConfirmAccess />
        </Suspense>
    );
}
