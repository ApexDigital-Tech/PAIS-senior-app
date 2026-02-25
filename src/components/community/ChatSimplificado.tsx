"use client";

import { useState } from "react";
import { Card, Button } from "@/components/ui";
import { MessageSquare, Mic, Send, Paperclip, ChevronLeft, User as UserIcon } from "lucide-react";

interface ChatSimplificadoProps {
    title: string;
    onBack?: () => void;
}

export default function ChatSimplificado({ title, onBack }: ChatSimplificadoProps) {
    const [message, setMessage] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    // Mock messages for UI demonstration
    const [messages] = useState([
        { id: 1, sender: "other", text: "¡Hola! Estaré encantada de pasear contigo hoy.", time: "10:00 AM" },
        { id: 2, sender: "me", text: "¡Gracias Ana! Te espero en la puerta a las 4.", time: "10:05 AM" },
        { id: 3, sender: "other", text: "Perfecto. Iré con ropa cómoda para caminar.", time: "10:06 AM" },
    ]);

    return (
        <div className="flex flex-col h-[600px] bg-surface rounded-[var(--radius-md)] border border-border overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-warm-50/50 flex items-center gap-3">
                {onBack && (
                    <button onClick={onBack} className="p-2 hover:bg-warm-100 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                )}
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <UserIcon size={20} className="text-purple-600" />
                </div>
                <div>
                    <h3 className="font-bold text-text-primary leading-tight">{title}</h3>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-wider">En línea</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[var(--pais-warm-50)]/30">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender === "me"
                                    ? "bg-green-600 text-white rounded-tr-none"
                                    : "bg-white text-text-primary rounded-tl-none border border-border"
                                }`}
                        >
                            <p className="text-lg leading-relaxed">{msg.text}</p>
                            <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-green-100" : "text-text-tertiary"}`}>
                                {msg.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-white flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <button className="p-3 text-text-secondary hover:bg-warm-50 rounded-full transition-colors">
                        <Paperclip size={24} />
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 h-14 px-4 bg-warm-50 border-2 border-border rounded-full focus:outline-none focus:border-green-500 text-lg"
                    />
                    <button
                        className={`p-4 rounded-full transition-all shadow-md ${isRecording ? "bg-red-500 text-white animate-pulse" : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                            }`}
                        onMouseDown={() => setIsRecording(true)}
                        onMouseUp={() => setIsRecording(false)}
                        title="Mantén presionado para hablar"
                    >
                        <Mic size={24} />
                    </button>
                    <button
                        className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95"
                        disabled={!message.trim()}
                    >
                        <Send size={24} />
                    </button>
                </div>
                <p className="text-center text-xs text-text-tertiary font-medium">
                    {isRecording ? "Grabando audio..." : "Mantén el micrófono para enviar un mensaje de voz"}
                </p>
            </div>
        </div>
    );
}
