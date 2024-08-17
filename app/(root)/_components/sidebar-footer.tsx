// Sidebar footer component

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SidebarFooter = () => (
  // TODO: Add Messages here
  // TODO: Add the stripe integration
  <div className="mt-auto p-4">
    <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-4">
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button size="sm" className="w-full">
          Upgrade
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default SidebarFooter;
