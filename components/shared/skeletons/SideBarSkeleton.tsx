import { Skeleton } from "@/components/ui/skeleton";

const SidebarItemSkeleton = () => (
  <div className="flex items-center gap-3 rounded-lg px-3 py-2">
    <Skeleton className="h-4 w-4" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export const SidebarSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted border-r">
      <div className="flex flex-col w-full justify-between h-full">
        <div className="space-y-1">
          {[...Array(6)].map((_, i) => (
            <SidebarItemSkeleton key={i} />
          ))}
        </div>
        <div className="mt-auto">
          <SidebarItemSkeleton />
        </div>
      </div>
    </div>
  );
};
