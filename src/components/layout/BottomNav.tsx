"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Car, Users, Heart } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Inicio", icon: Home },
    { href: "/transport", label: "Transporte", icon: Car },
    { href: "/community", label: "Comunidad", icon: Users },
    { href: "/health", label: "Salud", icon: Heart },
] as const;

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-border safe-bottom"
            role="navigation"
            aria-label="Navegación principal"
        >
            <div className="max-w-[var(--max-content)] mx-auto flex items-center justify-around h-[var(--nav-height)]">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`
                flex flex-col items-center justify-center gap-1
                w-full h-full
                transition-colors duration-[var(--duration-fast)]
                focus-visible:outline-none focus-visible:bg-green-50 rounded-lg
                ${isActive
                                    ? "text-green-500"
                                    : "text-text-secondary hover:text-text-primary"
                                }
              `}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <Icon
                                size={26}
                                strokeWidth={isActive ? 2.5 : 2}
                                aria-hidden="true"
                            />
                            <span
                                className={`text-xs leading-tight ${isActive ? "font-bold" : "font-medium"
                                    }`}
                            >
                                {label}
                            </span>
                            {isActive && (
                                <span className="absolute top-0 w-12 h-1 bg-green-500 rounded-b-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
