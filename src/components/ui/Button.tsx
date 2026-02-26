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
        "bg-[var(--pais-green-500)] text-white hover:bg-[var(--pais-green-600)] active:scale-95 shadow-[0_12px_24px_-8px_rgba(0,186,97,0.4)]",
    secondary:
        "bg-[var(--pais-warm-100)] text-[var(--pais-warm-900)] border-2 border-[var(--pais-warm-200)] hover:bg-[var(--pais-warm-200)]",
    outline:
        "bg-white text-[var(--pais-blue-600)] border-[3px] border-[var(--pais-blue-500)] hover:bg-[var(--pais-blue-50)] shadow-sm",
    danger:
        "bg-[var(--pais-red-500)] text-white hover:bg-[var(--pais-red-600)]",
    ghost:
        "bg-transparent text-[var(--pais-warm-700)] hover:bg-[var(--pais-warm-100)]",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-12 px-6 text-lg",
    default: "h-16 px-10 text-xl",
    lg: "h-20 px-14 text-2xl font-black",
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
