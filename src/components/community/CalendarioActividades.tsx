"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, Button } from "@/components/ui";
import { Calendar as CalendarIcon, MapPin, Users, Clock, Tag } from "lucide-react";
import type { CommunityActivity } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function CalendarioActividades() {
    const supabase = createClient();
    const [activities, setActivities] = useState<CommunityActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            const { data, error } = await supabase
                .from("community_activities")
                .select("*")
                .order("date", { ascending: true });

            if (data) setActivities(data);
            setLoading(false);
        };

        fetchActivities();
    }, [supabase]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2].map(i => (
                    <div key={i} className="h-48 bg-warm-100 animate-pulse rounded-[var(--radius-md)]" />
                ))}
            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <div className="text-center py-16 bg-surface rounded-[var(--radius-md)] border-2 border-dashed border-border px-6">
                <CalendarIcon size={48} className="mx-auto mb-4 text-warm-300" />
                <h3 className="text-xl font-bold text-text-primary">No hay actividades programadas</h3>
                <p className="text-text-secondary mt-2">Vuelve pronto para ver nuevos talleres y eventos comunitarios.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                <CalendarIcon className="text-green-600" size={24} />
                Próximos Eventos
            </h2>

            <div className="grid gap-6">
                {activities.map((activity) => (
                    <Card key={activity.id} className="overflow-hidden flex flex-col sm:flex-row gap-0 group">
                        {activity.image_url && (
                            <div className="w-full sm:w-48 h-40 bg-warm-200 shrink-0 relative overflow-hidden">
                                <img
                                    src={activity.image_url}
                                    alt={activity.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider text-green-700 shadow-sm border border-green-100">
                                    {activity.type}
                                </div>
                            </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag size={14} className="text-green-600" />
                                    <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
                                        {activity.type}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight">
                                    {activity.title}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-secondary">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-text-tertiary" />
                                        <span>
                                            {format(new Date(activity.date), "EEEE d 'de' MMMM, HH:mm", { locale: es })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-text-tertiary" />
                                        <span className="truncate">{activity.location_text || "Ubicación por confirmar"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-text-tertiary" />
                                        <span>Máx. {activity.max_participants} personas</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-warm-100">
                                <p className="text-xs text-text-tertiary italic">
                                    Gratis para miembros PAIS
                                </p>
                                <Button size="sm">Unirme</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
