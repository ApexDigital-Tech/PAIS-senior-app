import type { TransportRequest } from "@/types";
import { MapPin, Clock, CheckCircle, XCircle, Car } from "lucide-react";

interface TripCardProps {
    trip: TransportRequest;
    onClick?: () => void;
}

const statusConfig: Record<
    string,
    { label: string; color: string; bg: string; icon: typeof Clock }
> = {
    pending: {
        label: "Pendiente",
        color: "text-amber-500",
        bg: "bg-amber-50",
        icon: Clock,
    },
    assigned: {
        label: "Conductor asignado",
        color: "text-blue-500",
        bg: "bg-blue-50",
        icon: Car,
    },
    in_transit: {
        label: "En camino",
        color: "text-green-500",
        bg: "bg-green-50",
        icon: Car,
    },
    completed: {
        label: "Completado",
        color: "text-green-700",
        bg: "bg-green-50",
        icon: CheckCircle,
    },
    cancelled: {
        label: "Cancelado",
        color: "text-warm-500",
        bg: "bg-warm-100",
        icon: XCircle,
    },
};

export function TripCard({ trip, onClick }: TripCardProps) {
    const config = statusConfig[trip.status] || statusConfig.pending;
    const StatusIcon = config.icon;
    const date = new Date(trip.scheduled_at);

    const formattedDate = date.toLocaleDateString("es", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

    const formattedTime = date.toLocaleTimeString("es", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <button
            onClick={onClick}
            className="w-full text-left bg-surface rounded-[var(--radius-md)] p-4 border border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-green-200 transition-all duration-[var(--duration-normal)] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none cursor-pointer"
        >
            {/* Status badge */}
            <div className="flex items-center justify-between mb-3">
                <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-full)] text-sm font-medium ${config.color} ${config.bg}`}
                >
                    <StatusIcon size={14} />
                    {config.label}
                </span>
                <span className="text-sm text-text-secondary">{formattedDate}</span>
            </div>

            {/* Route */}
            <div className="space-y-2">
                <div className="flex items-start gap-3">
                    <div className="mt-1 w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-secondary">Origen</p>
                        <p className="text-base font-medium text-text-primary truncate">
                            {trip.origin_address}
                        </p>
                    </div>
                </div>

                {/* Dotted line connector */}
                <div className="ml-1.5 w-px h-4 border-l-2 border-dashed border-warm-300" />

                <div className="flex items-start gap-3">
                    <MapPin size={14} className="mt-1 text-red-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-secondary">Destino</p>
                        <p className="text-base font-medium text-text-primary truncate">
                            {trip.destination_address}
                        </p>
                    </div>
                </div>
            </div>

            {/* Time */}
            <div className="mt-3 flex items-center gap-2 text-text-secondary">
                <Clock size={14} />
                <span className="text-sm">{formattedTime}</span>
            </div>
        </button>
    );
}
