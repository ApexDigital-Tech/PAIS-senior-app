import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
    icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, icon, id, className = "", ...props }, ref) => {
        const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                <label
                    htmlFor={inputId}
                    className="block text-lg font-medium text-text-primary mb-2"
                >
                    {label}
                </label>

                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full h-14 rounded-[var(--radius-md)]
              bg-surface border-2
              text-lg text-text-primary placeholder:text-warm-300
              transition-colors duration-[var(--duration-fast)]
              focus:outline-none focus:border-border-focus focus:ring-4 focus:ring-blue-100
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? "pl-12 pr-4" : "px-4"}
              ${error ? "border-red-500 focus:ring-red-50" : "border-border"}
              ${className}
            `}
                        aria-invalid={!!error}
                        aria-describedby={
                            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
                        }
                        {...props}
                    />
                </div>

                {error && (
                    <p
                        id={`${inputId}-error`}
                        role="alert"
                        className="mt-2 text-base text-red-500 font-medium"
                    >
                        {error}
                    </p>
                )}

                {hint && !error && (
                    <p id={`${inputId}-hint`} className="mt-2 text-base text-text-secondary">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
