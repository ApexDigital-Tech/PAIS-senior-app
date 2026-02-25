"use client";

import { PageContainer } from "@/components/layout";
import { useUser } from "@/hooks/useUser";
import { Button, Card, Skeleton } from "@/components/ui";
import {
    User,
    Settings,
    Bell,
    Shield,
    LogOut,
    Phone,
    Mail,
    ChevronRight,
    UserCheck
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, loading, signOut } = useUser();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    if (loading) {
        return (
            <PageContainer>
                <div className="space-y-6">
                    <Skeleton className="h-10 w-40" />
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-20 h-20 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-6 w-1/3" />
                            </div>
                        </div>
                    </Card>
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map(i => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <div className="space-y-6 pb-24">
                <h1 className="text-3xl font-bold font-heading text-text-primary">Mi Perfil</h1>

                {/* User Card */}
                <Card className="p-6 border-green-100 bg-gradient-to-br from-white to-green-50/30">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
                            {user?.avatar_url ? (
                                <img src={user.avatar_url} alt={user.full_name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User size={48} />
                            )}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-text-primary">{user?.full_name || "Usuario"}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold bg-green-100 text-green-700 capitalize">
                                    {user?.role || "Senior"}
                                </span>
                                {user?.role === "senior" && (
                                    <span className="inline-flex items-center gap-1 text-sm text-text-secondary">
                                        <UserCheck size={14} className="text-blue-500" />
                                        Cuenta Verificada
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Contact Info */}
                <div className="space-y-3">
                    <div className="flex items-center gap-4 p-5 bg-surface rounded-[var(--radius-md)] border border-border shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center text-text-secondary shrink-0">
                            <Phone size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-text-secondary font-medium">Celular</p>
                            <p className="text-lg font-bold text-text-primary">{user?.phone || "No registrado"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-surface rounded-[var(--radius-md)] border border-border shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center text-text-secondary shrink-0">
                            <Mail size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-text-secondary font-medium">Correo</p>
                            <p className="text-lg font-bold text-text-primary">{user?.email || "No registrado"}</p>
                        </div>
                    </div>
                </div>

                {/* Menu Actions */}
                <div className="space-y-2 pt-4">
                    <h3 className="text-xl font-bold text-text-primary px-2 mb-2">Configuración</h3>

                    {[
                        { id: "settings", icon: Settings, label: "Ajustes de la Aplicación", color: "text-blue-500", bg: "bg-blue-50" },
                        { id: "notifications", icon: Bell, label: "Notificaciones y Alertas", color: "text-amber-500", bg: "bg-amber-50" },
                        { id: "privacy", icon: Shield, label: "Privacidad y Seguridad", color: "text-green-500", bg: "bg-green-50" },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className="w-full flex items-center gap-4 p-5 bg-white rounded-[var(--radius-md)] border border-border hover:border-green-300 transition-all active:scale-[0.98] group cursor-pointer shadow-sm"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}>
                                    <Icon size={24} />
                                </div>
                                <span className="flex-1 text-lg font-bold text-text-primary text-left">{item.label}</span>
                                <ChevronRight size={20} className="text-warm-300 group-hover:text-green-500 transition-colors" />
                            </button>
                        );
                    })}
                </div>

                {/* Sign Out */}
                <div className="pt-8">
                    <Button
                        variant="danger"
                        fullWidth
                        size="lg"
                        onClick={handleSignOut}
                        icon={<LogOut size={24} />}
                        className="text-xl shadow-lg border-2 border-red-100"
                    >
                        Cerrar Sesión
                    </Button>
                </div>

                <p className="text-center text-sm text-text-secondary pt-4">
                    Versión v1.0.0 (MVP)
                </p>
            </div>
        </PageContainer>
    );
}
