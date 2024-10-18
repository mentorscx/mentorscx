import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DashboardCardSkelton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-[125px]" />
        <Skeleton className="h-8 w-[125px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-[125px]" />
      </CardContent>
    </Card>
  );
};

export const DashboardProfileSkelton = () => {
  return (
    <section className="lg:mt-4 p-6 border shadow rounded-lg bg-background md:pl-6 col-span-1">
      <div className="flex items-center justify-center flex-col gap-1">
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="w-full h-4" />

        <Skeleton className="w-full h-4" />

        <div className="w-full flex flex-col md:flex-row justify-between gap-2 items-center my-2">
          <Skeleton className="w-[150px] h-6" />
          <Skeleton className="w-[150px] h-6" />
        </div>
      </div>
    </section>
  );
};

export const DashboardSessionSkeleton = () => {
  return (
    <section className="my-4 p-3 border shadow rounded-lg bg-background">
      <Skeleton className="w-full h-3" />
      <div className="w-full grid grid-cols-1 gap-4 my-4 md:px-6">
        <div className="flex justify-center items-center h-[150px] border-1 bg-gray-100/50 rounded">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};
