// Google Maps loader and utilities
// Uses dynamic script loading to avoid SSR issues

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapsPromise: Promise<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadGoogleMaps(): Promise<any> {
    if (mapsPromise) return mapsPromise;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey || apiKey === "your-google-maps-key") {
        return Promise.reject(new Error("Google Maps API key not configured"));
    }

    mapsPromise = new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
            reject(new Error("Google Maps can only be loaded in the browser"));
            return;
        }

        // Already loaded
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).google?.maps) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolve((window as any).google.maps);
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).google?.maps) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                resolve((window as any).google.maps);
            } else {
                reject(new Error("Google Maps failed to initialize"));
            }
        };

        script.onerror = () => {
            mapsPromise = null;
            reject(new Error("Failed to load Google Maps script"));
        };

        document.head.appendChild(script);
    });

    return mapsPromise;
}

export function isGoogleMapsAvailable(): boolean {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    return !!key && key !== "your-google-maps-key";
}
