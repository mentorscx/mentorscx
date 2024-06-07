import Image from "next/image";
import AboutImage from "@/public/images/website/founders2.jpg";

export default function AboutIntro() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4">A small team with big dreams</h1>
            <p className="text-xl text-gray-600">
              We all want to enjoy this journey called life. And most of us want
              others to enjoy life too. Our days go by with daily interactions:
              with humans, with tech, with ourselves. These make up our daily
              experiences. They can be positive, neutral, or negative. Our
              mission is to help people and brands achieve a higher percentage
              of positive interactions through amazing customer experience.
            </p>
          </div>

          <figure className="flex justify-center items-start">
            <Image
              className="rounded shadow-2xl"
              src={AboutImage}
              width={768}
              height={432}
              priority
              alt="About us"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
