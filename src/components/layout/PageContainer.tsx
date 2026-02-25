import { type ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
    return (
        <main
            className={`
        max-w-[var(--max-content)] mx-auto
        px-5 py-6
        pb-[calc(var(--nav-height)+24px)]
        min-h-[calc(100dvh-var(--header-height))]
        ${className}
      `}
        >
            {children}
        </main>
    );
}
