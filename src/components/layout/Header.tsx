"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
    greeting?: string;
    userName?: string;
}

export function Header({ greeting, userName }: HeaderProps) {
    const { user } = useUser();
    const timeGreeting = greeting || getTimeGreeting();
    const displayName = userName || user?.full_name?.split(' ')[0] || "amigo";

    return (
        <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-[var(--max-content)] mx-auto flex items-center justify-between h-[var(--header-height)] px-5">
                {/* Logo + Greeting */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white font-heading font-bold text-lg">P</span>
                    </div>
                    <div>
                        <p className="text-base text-text-secondary leading-tight">
                            {timeGreeting}
                        </p>
                        <p className="text-lg font-semibold text-text-primary leading-tight">
                            {displayName}
                        </p>
                    </div>
                </div>

                {/* Profile */}
                <Link
                    href="/profile"
                    className="w-11 h-11 rounded-full bg-warm-100 flex items-center justify-center text-text-secondary hover:bg-warm-200 transition-colors focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none"
                    aria-label="Mi perfil"
                >
                    <User size={22} />
                </Link>
            </div>
        </header>
    );
}

function getTimeGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días,";
    if (hour < 18) return "Buenas tardes,";
    return "Buenas noches,";
}
