import { Skeleton } from "@/src/components/ui/skeleton";

export function LoadingState() {
  return (
    <div className="mx-auto mt-16 max-w-6xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-8 backdrop-blur">
        <Skeleton className="h-10 w-72" />

        <div className="mt-8 space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="rounded-2xl border border-zinc-800 p-6">
              <Skeleton className="h-5 w-40" />

              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
