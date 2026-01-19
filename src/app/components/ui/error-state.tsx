import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/app/components/ui/button";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = "حدث خطأ غير متوقع",
    description = "نعتذر عن الإزعاج، يرجى المحاولة مرة أخرى لاحقاً.",
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4">
            <div className="p-4 rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <FontAwesomeIcon icon={faTriangleExclamation} className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-muted-foreground max-w-md">{description}</p>
            {onRetry && (
                <Button onClick={onRetry} variant="default">
                    إعادة المحاولة
                </Button>
            )}
        </div>
    );
}
