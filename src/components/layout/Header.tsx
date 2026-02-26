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
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[var(--pais-warm-200)] px-6 py-4">
            <div className="max-w-[var(--max-content)] mx-auto flex items-center justify-between">
                {/* Logo + Greeting */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--pais-green-500)] to-[var(--pais-blue-500)] flex items-center justify-center shadow-lg transform rotate-3">
                        <span className="text-white font-heading font-black text-2xl -rotate-3">P</span>
                    </div>
                    <div>
                        <p className="text-lg text-[var(--pais-warm-500)] font-medium leading-none mb-1">
                            {timeGreeting}
                        </p>
                        <p className="text-2xl font-black text-[var(--pais-warm-900)] font-heading leading-none">
                            {displayName}
                        </p>
                    </div>
                </div>

                {/* Profile */}
                <Link
                    href="/profile"
                    className="w-14 h-14 rounded-full bg-[var(--pais-warm-100)] border-2 border-white shadow-sm flex items-center justify-center text-[var(--pais-warm-700)] hover:bg-[var(--pais-warm-200)] transition-all active:scale-90"
                    aria-label="Mi perfil"
                >
                    <User size={28} strokeWidth={2.5} />
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
