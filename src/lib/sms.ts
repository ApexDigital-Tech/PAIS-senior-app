/**
 * PAIS — SMS & Communication Service
 * Handles SMS via Twilio (Production) or Console (Development/Testing)
 */

interface SendSmsParams {
    to: string;
    message: string;
}

export async function sendSMS({ to, message }: SendSmsParams) {
    // 1. Simulate for testing/dev environments
    if (process.env.NODE_ENV === "development" || !process.env.TWILIO_ACCOUNT_SID) {
        console.log(`[PAIS SIMULATOR] 📱 Sending SMS to ${to}: "${message}"`);

        // Mocking a short delay to simulate network latency
        await new Promise(resolve => setTimeout(resolve, 800));

        return { success: true, sid: "SIM_" + Math.random().toString(36).substr(2, 9) };
    }

    // 2. Production Logic (Twilio)
    try {
        const response = await fetch("/api/alerts/sms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to, message }),
        });

        if (!response.ok) throw new Error("Failed to send SMS through API");

        return await response.json();
    } catch (error) {
        console.error("SMS Service Error:", error);
        throw error;
    }
}
