import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ProfileEmptyList() {
  return (
    <section className="max-w-[1100px] mx-3 lg:mx-6">
      <Card className="mb-6 bg-white max-w-5xl mx-auto overflow-hidden p-4 sm:p-6 lg:p-8">
        <div className="flex justify-center items-center flex-col gap-4">
          <Image
            src="/no_data.svg"
            alt="avatar"
            width={150}
            height={150}
            className="object-cover"
          />
          <p className="text-muted-foreground">
            No profiles found! Please try different filters.
          </p>
        </div>
      </Card>
    </section>
  );
}
