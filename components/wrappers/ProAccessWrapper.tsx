import SubscribeProModal from "@/components/modals/subscribe-pro-modal";
import { redirect } from "next/navigation";

type ProAccessWrapperProps = {
  children: React.ReactNode;
  active: boolean;
};

export function ProAccessWrapper({ children, active }: ProAccessWrapperProps) {
  if (!active) {
    return <SubscribeProModal isDialogOpen={true} />;
  }

  return <>{children}</>;
}
