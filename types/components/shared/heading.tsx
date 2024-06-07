import Image from "next/image";
interface HeadingProps {
  description: string;
  title: string;
  imageUrl: string;
}
const Heading = ({ description, title, imageUrl }: HeadingProps) => {
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
        <h2 className="h3">{title}</h2>
        <p className="muted font-semibold">{description} </p>
      </div>
    </div>
  );
};

export default Heading;
