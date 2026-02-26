import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
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
        "bg-green-500 text-white hover:brightness-110 active:scale-95 shadow-lg shadow-green-500/20",
    secondary:
        "bg-warm-100 text-warm-900 border-2 border-warm-200 hover:bg-warm-200",
    outline:
        "bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50 transition-colors",
    danger:
        "bg-red-500 text-white hover:brightness-110",
    ghost:
        "bg-transparent text-warm-700 hover:bg-warm-100",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-10 px-4 text-sm",
    default: "h-12 px-6 text-base font-bold",
    lg: "h-14 px-8 text-lg font-bold",
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
