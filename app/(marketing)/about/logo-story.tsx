import React from "react";
import Image from "next/image";

const LogoStory = () => {
  return (
    <section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-12 flex items-center justify-center flex-col">
        <h2 className="h2 pb-6 text-center underline underline-offset-8 decoration-2">
          Our Logo
        </h2>
        <Image src="/mentors-cx.png" width={360} height={120} alt="Logo" />
        <div className="w-full flex justify-center flex-col">
          <p className="text-lg text-gray-600 mt-6 md:mt-9">
            Our logo is simple.
          </p>
          <br />
          <p className="text-lg text-gray-600">
            The “CX” part is kinda obvious 😀- it stands for customer
            experience.
          </p>

          <p className="text-lg text-gray-600 mt-2">
            In the Mayan civilization, number{" "}
            <span className="font-extrabold">four</span> represents the Cardinal
            Direction: North, East, South, and West. In our logo, the four
            horizontal lines across the arrow portrait that, with the arrow
            itself pointing upward to clarify the focus on the{" "}
            <span className="font-extrabold">North</span>. The mentors are
            providing <span className="font-extrabold">guidance</span>. Helping
            mentees find the <span className="font-extrabold">northstar</span>,
            and both mentors and mentees keep{" "}
            <span className="font-extrabold">growing</span> personally and
            professionally.
          </p>

          <p className="text-lg text-gray-600 mt-2">
            You’ll see other subtle Mayan references around. For example, our
            plans are named Eclipse, Moon, and Sun because of the relation
            Mayans had with Astronomy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogoStory;
