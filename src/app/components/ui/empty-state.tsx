import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: IconDefinition;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export function EmptyState({
    title,
    description,
    icon = faFileCircleXmark,
    actionLabel,
    onAction,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[400px] rounded-lg border-2 border-dashed bg-muted/10", className)}>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/20 mb-6">
                <FontAwesomeIcon icon={icon} className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                    {description}
                </p>
            )}
            {actionLabel && onAction && (
                <Button onClick={onAction} variant="outline">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
