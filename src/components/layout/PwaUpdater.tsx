"use client";

import { useEffect } from "react";

export function PwaUpdater() {
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            "serviceWorker" in navigator &&
            // @ts-ignore
            window.workbox !== undefined
        ) {
            // @ts-ignore
            const wb = window.workbox;

            const promptNewVersionAvailable = () => {
                if (confirm("Hay una nueva versión de PAIS disponible. ¿Deseas actualizar ahora?")) {
                    wb.addEventListener("controlling", () => {
                        window.location.reload();
                    });
                    wb.messageSkipWaiting();
                }
            };

            wb.addEventListener("waiting", promptNewVersionAvailable);
            wb.addEventListener("externalwaiting", promptNewVersionAvailable);

            wb.register();
        }
    }, []);

    return null;
}
