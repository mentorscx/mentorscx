import {
  Card,
  CardContent,
  CardDescription,
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
    <Card>
      <CardHeader className="pb-2">
        <CardDescription className="font-semibold">{title}</CardDescription>
        <CardTitle className="text-4xl">{displayValue}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{footer}</div>
      </CardContent>
    </Card>
  );
}
