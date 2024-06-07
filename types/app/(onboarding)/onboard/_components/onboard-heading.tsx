import Image from "next/image";
interface OnboardHeadingProps {
  step: number;
  title: string;
  imageUrl: string;
}
const OnboardHeading = ({ step, title, imageUrl }: OnboardHeadingProps) => {
  return (
    <div className="flex gap-4">
      <Image
        src={imageUrl}
        alt="alt"
        width={50}
        height={50}
        className="shrink-0 object-fill w-24 h-24"
      />
      <div className="my-4">
        <p className="muted font-semibold">Step {step} of 4</p>
        <h2 className="h3">{title}</h2>
      </div>
    </div>
  );
};

export default OnboardHeading;
