import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted/40 backdrop-blur-sm border border-border/10", className)}
      {...props} />
  );
}

export { Skeleton }
