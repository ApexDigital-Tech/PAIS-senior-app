import { type ReactNode } from "react";

interface CardProps {
    icon?: ReactNode;
    title?: string;
    description?: string;
    onClick?: () => void;
    badge?: string;
    className?: string;
    children?: ReactNode;
}

export function Card({
    icon,
    title,
    description,
    onClick,
    badge,
    className = "",
    children,
}: CardProps) {
    const isInteractive = !!onClick;
    const Component = isInteractive ? "button" : "div";
    const hasHeader = !!(icon || title || description);

    return (
        <Component
            onClick={onClick}
            className={`
        relative w-full text-left
        bg-surface rounded-[var(--radius-md)] p-5
        border border-border
        shadow-[var(--shadow-sm)]
        transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)]
        ${isInteractive
                    ? "cursor-pointer hover:shadow-[var(--shadow-md)] hover:border-green-200 active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none"
                    : ""
                }
        ${className}
      `}
        >
            {badge && (
                <span className="absolute top-3 right-3 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-[var(--radius-full)]">
                    {badge}
                </span>
            )}

            {hasHeader ? (
                <div className="flex items-start gap-4">
                    {icon && (
                        <div className="shrink-0 w-12 h-12 rounded-[var(--radius-sm)] bg-green-50 flex items-center justify-center text-green-500">
                            {icon}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        {title && (
                            <h3 className="font-heading font-semibold text-lg text-text-primary truncate">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="mt-1 text-base text-text-secondary leading-relaxed">
                                {description}
                            </p>
                        )}
                        {children}
                    </div>
                </div>
            ) : (
                children
            )}
        </Component>
    );
}
