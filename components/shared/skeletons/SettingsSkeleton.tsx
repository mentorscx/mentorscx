import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SettingsSkelton = () => {
  return (
    <div className="mx-auto max-w-5xl pt-[80px]">
      <div className="my-4 lg:my-8 p-3 border shadow rounded bg-background">
        <div className="px-6 mt-4 flex">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="space-y-4 mt-6 px-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-2 w-1/2" />
              </CardTitle>
              <CardDescription className="pt-2">
                <Skeleton className="h-3 w-1/2" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Skeleton className="h-8 w-16" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-2 w-1/2" />
              </CardTitle>
              <CardDescription className="pt-2">
                <Skeleton className="h-3 w-1/2" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Skeleton className="h-8 w-16" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-2 w-1/2" />
              </CardTitle>
              <CardDescription className="pt-2">
                <Skeleton className="h-3 w-1/2" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Skeleton className="h-8 w-16" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-2 w-1/2" />
              </CardTitle>
              <CardDescription className="pt-2">
                <Skeleton className="h-3 w-1/2" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Skeleton className="h-8 w-16" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsSkelton;
