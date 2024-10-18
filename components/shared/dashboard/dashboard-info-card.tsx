import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardInfoCardProps = {
  title: string;
  displayValue: string;
  footer: string;
};

export default function DashboardInfoCard(props: DashboardInfoCardProps) {
  const { title, displayValue, footer } = props;

  return (
    <Card className="min-w-[100px]">
      <CardHeader className="pb-2">
        <CardDescription className="font-semibold">{title}</CardDescription>
        <CardTitle className="flex gap-1 text-4xl ">{displayValue}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground flex">{footer}</div>
      </CardContent>
    </Card>
  );
}
