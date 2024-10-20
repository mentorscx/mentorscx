import React from "react";
import Image from "next/image";

const EmptyDataCard = ({
  description = "No data yet.",
}: {
  description?: string;
}) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 my-3">
      <Image src="/no_data.svg" alt="avatar" width={100} height={100} />

      <p className="large !text-muted-foreground">{description}</p>
    </div>
  );
};

export default EmptyDataCard;
