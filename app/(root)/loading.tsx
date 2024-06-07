import { Loader2Icon } from "lucide-react";
export default function Loading() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <Loader2Icon className="animate-spin text-blue-500 w-16 h-16" />
    </main>
  );
}
