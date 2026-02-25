"use client";

import { useState } from "react";
import { SOSButton } from "@/components/ui/SOSButton";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { useGeolocation } from "@/hooks/useGeolocation";
import { sendSMS } from "@/lib/sms";

export function SOSHandler() {
    const { user } = useUser();
    const { position } = useGeolocation();
    const supabase = createClient();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSOS = async () => {
        if (!user || isProcessing) return;

        setIsProcessing(true);
        console.log("🚨 SOS activated for user:", user.id);

        try {
            // 1. Insert alert into database
            const { data: alertData, error } = await supabase.from("sos_alerts").insert({
                user_id: user.id,
                status: 'triggered',
                location_text: position ? `Lat: ${position.lat}, Lng: ${position.lng}` : 'Ubicación no disponible'
            }).select().single();

            if (error) throw error;

            // 2. Log activity
            await supabase.rpc('log_activity', {
                p_user_id: user.id,
                p_action: 'SOS_TRIGGERED',
                p_entity_type: 'sos_alerts',
                p_entity_id: alertData.id,
                p_metadata: { lat: position?.lat, lng: position?.lng }
            });

            // 3. Notify Family (Simulated/Test Mode)
            // In a real scenario, we'd fetch the family phone from the database
            const familyPhone = "+59178756107";
            await sendSMS({
                to: familyPhone,
                message: `🆘 PAIS ALERT: ${user.full_name} ha activado un SOS. Ubicación: https://www.google.com/maps?q=${position?.lat},${position?.lng}`
            });

            alert("🚨 Alerta SOS enviada. Tu familia y los servicios de emergencia han sido notificados.");

        } catch (error) {
            console.error("Error triggering SOS:", error);
            alert("Error al enviar la alerta SOS. Por favor intenta llamar al 911 directamente.");
        } finally {
            setIsProcessing(false);
        }
    };

    return <SOSButton onActivate={handleSOS} />;
}
