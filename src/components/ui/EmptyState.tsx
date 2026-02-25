import { type ReactNode } from "react";

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            {icon && (
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6">
                    {icon}
                </div>
            )}
            <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
                {title}
            </h3>
            <p className="text-base text-text-secondary max-w-sm leading-relaxed">
                {description}
            </p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
