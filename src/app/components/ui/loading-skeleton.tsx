import { Skeleton } from "@/app/components/ui/skeleton";

export function TableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[100px]" />
            </div>
            <div className="rounded-md border">
                <div className="h-12 border-b px-4 flex items-center">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-4 w-[100px] mr-4" />
                    ))}
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 border-b px-4 flex items-center">
                        {[1, 2, 3, 4].map((j) => (
                            <Skeleton key={j} className="h-4 w-[100px] mr-4" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <div className="p-6 pt-0">
                        <Skeleton className="h-8 w-[60px] mb-2" />
                        <Skeleton className="h-3 w-[120px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
