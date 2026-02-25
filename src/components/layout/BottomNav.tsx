"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Car, Users, Heart, AlertCircle, LucideIcon } from "lucide-react";

interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
    isEmergency?: boolean;
}

const navItems: NavItem[] = [
    { href: "/dashboard", label: "Inicio", icon: Home },
    { href: "/transport", label: "Transporte", icon: Car },
    { href: "/sos", label: "SOS", icon: AlertCircle, isEmergency: true },
    { href: "/community", label: "Comunidad", icon: Users },
    { href: "/health", label: "Salud", icon: Heart },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-warm-200/50 safe-bottom pb-2 pt-1"
            role="navigation"
            aria-label="Navegación principal"
        >
            {/* Active Highlight Bar at the very top of the nav */}
            <div className="absolute top-0 left-0 right-0 h-[2px] flex justify-around px-2 pointer-events-none">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                        <div key={item.href} className="w-full flex justify-center">
                            <div className={`h-full w-8 rounded-full transition-all duration-300 ${isActive && !item.isEmergency ? "bg-green-500 shadow-[0_0_8px_rgba(0,219,117,0.4)]" : "bg-transparent"}`} />
                        </div>
                    );
                })}
            </div>

            <div className="max-w-[var(--max-content)] mx-auto flex items-end justify-around h-14 px-2">
                {navItems.map((item) => {
                    const { href, label, icon: Icon, isEmergency } = item;
                    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

                    if (isEmergency) {
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="relative flex flex-col items-center justify-center -top-4 transition-transform active:scale-90"
                            >
                                <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center
                                    shadow-lg shadow-red-500/30
                                    ${isActive
                                        ? "bg-red-600 scale-110"
                                        : "bg-red-500 animate-sos-pulse"
                                    }
                                `}>
                                    <Icon size={32} className="text-white" strokeWidth={3} />
                                </div>
                                <span className="text-[10px] font-black text-red-600 mt-1 uppercase tracking-tighter">
                                    {label}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`
                                relative flex flex-col items-center justify-center gap-0.5
                                w-full h-full min-w-[64px]
                                transition-all duration-[var(--duration-fast)]
                                active:scale-95
                                ${isActive
                                    ? "text-green-600"
                                    : "text-warm-400 hover:text-warm-700"
                                }
                            `}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <div className={`
                                p-1.5 rounded-xl transition-all
                                ${isActive ? "bg-green-50/80 scale-110" : "bg-transparent"}
                            `}>
                                <Icon
                                    size={24}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    aria-hidden="true"
                                />
                            </div>
                            <span
                                className={`text-[10px] leading-tight tracking-tight uppercase ${isActive ? "font-bold" : "font-medium"
                                    }`}
                            >
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
