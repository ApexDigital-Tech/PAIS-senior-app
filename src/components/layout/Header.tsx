"use client";

import { User, Bell, Heart } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface HeaderProps {
    greeting?: string;
    userName?: string;
}

export function Header({ greeting, userName }: HeaderProps) {
    const { user } = useUser();
    const router = useRouter();
    const timeGreeting = greeting || getTimeGreeting();
    const displayName = userName || user?.full_name?.split(' ')[0] || "amigo";

    return (
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-warm-200/50 px-6 py-4">
            <div className="max-w-[var(--max-content)] mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => router.push("/")}
                >
                    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:rotate-12 transition-transform duration-500">
                        <Heart size={20} fill="white" />
                    </div>
                    <span className="text-warm-900 font-black text-xl tracking-tight uppercase font-heading">PAIS</span>
                </div>

                {/* Dashboard Context Info */}
                <div className="hidden sm:flex flex-col items-center">
                    <p className="text-xs font-black text-warm-400 uppercase tracking-widest leading-none mb-1">
                        {timeGreeting}
                    </p>
                    <p className="text-lg font-black text-warm-900 font-heading leading-none">
                        {displayName}
                    </p>
                </div>

                {/* Actions / Profile */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/profile"
                        className="w-12 h-12 rounded-2xl bg-warm-50 border-2 border-white shadow-sm flex items-center justify-center text-warm-700 hover:bg-warm-100 transition-all active:scale-90"
                        aria-label="Mi perfil"
                    >
                        <User size={24} strokeWidth={2.5} />
                    </Link>
                </div>
            </div>
        </header>
    );
}

function getTimeGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
}
