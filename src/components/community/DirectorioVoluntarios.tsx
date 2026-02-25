"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, Button } from "@/components/ui";
import { User as UserIcon, Star, MapPin, Heart, Search } from "lucide-react";
import type { User } from "@/types";

export default function DirectorioVoluntarios() {
    const supabase = createClient();
    const [volunteers, setVolunteers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchVolunteers = async () => {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("role", "voluntario");

            if (data) setVolunteers(data);
            setLoading(false);
        };

        fetchVolunteers();
    }, [supabase]);

    const filteredVolunteers = volunteers.filter(v =>
        v.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input
                    type="text"
                    placeholder="Buscar voluntario por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-surface border-2 border-border rounded-[var(--radius-md)] focus:outline-none focus:border-green-500 transition-all text-lg"
                />
            </div>

            {loading ? (
                <div className="grid gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-warm-100 animate-pulse rounded-[var(--radius-md)]" />
                    ))}
                </div>
            ) : filteredVolunteers.length > 0 ? (
                <div className="grid gap-4">
                    {filteredVolunteers.map((v) => (
                        <Card key={v.id} className="p-5 hover:shadow-md transition-all group">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                    {v.avatar_url ? (
                                        <img src={v.avatar_url} alt={v.full_name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <UserIcon size={32} className="text-purple-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-text-primary truncate">{v.full_name}</h3>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                                        <span className="flex items-center gap-1">
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            4.9 (12 visitas)
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            A 1.2 km
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                                            Compañía
                                        </span>
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                                            Paseos
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="self-center hidden sm:flex"
                                >
                                    Ver Perfil
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-warm-50 rounded-[var(--radius-md)] border-2 border-dashed border-border text-text-secondary">
                    <Heart size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No encontramos voluntarios con ese nombre.</p>
                </div>
            )}
        </div>
    );
}
