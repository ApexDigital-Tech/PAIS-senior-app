import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "default" | "lg" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-green-500 text-text-inverse hover:bg-green-600 active:bg-green-700 focus-visible:ring-green-200",
    secondary:
        "bg-surface text-text-primary border-2 border-border hover:bg-surface-hover active:bg-warm-200",
    danger:
        "bg-red-500 text-text-inverse hover:bg-red-600 active:bg-[var(--pais-red-600)]",
    ghost:
        "bg-transparent text-text-primary hover:bg-surface-hover active:bg-warm-200",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-12 px-4 text-base",
    default: "h-14 px-6 text-lg",
    lg: "h-16 px-8 text-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "default",
            loading = false,
            fullWidth = false,
            icon,
            children,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={`
          inline-flex items-center justify-center gap-3
          font-semibold rounded-[var(--radius-md)]
          transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)]
          focus-visible:ring-4 focus-visible:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          select-none cursor-pointer
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
                {...props}
            >
                {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : icon ? (
                    <span className="shrink-0">{icon}</span>
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
