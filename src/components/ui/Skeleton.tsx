interface SkeletonProps {
    className?: string;
    lines?: number;
}

export function Skeleton({ className = "", lines = 1 }: SkeletonProps) {
    if (lines > 1) {
        return (
            <div className="space-y-3">
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-5 bg-warm-200 rounded-[var(--radius-sm)] animate-skeleton ${i === lines - 1 ? "w-3/4" : "w-full"
                            }`}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={`bg-warm-200 rounded-[var(--radius-sm)] animate-skeleton ${className}`}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-surface rounded-[var(--radius-md)] p-5 border border-border shadow-[var(--shadow-sm)]">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-warm-200 animate-skeleton shrink-0" />
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-warm-200 rounded-[var(--radius-sm)] animate-skeleton w-2/3" />
                    <div className="h-4 bg-warm-200 rounded-[var(--radius-sm)] animate-skeleton w-full" />
                    <div className="h-4 bg-warm-200 rounded-[var(--radius-sm)] animate-skeleton w-1/2" />
                </div>
            </div>
        </div>
    );
}
