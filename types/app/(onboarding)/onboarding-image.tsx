import Image from "next/image";
import OnboardingBg from "@/public/images/onboarding-image.jpg";
import OnboardingDecoration from "@/public/images/auth-decoration.png";

export default function OnboardingImage() {
  return (
    <div
      className="hidden md:block absolute inset-y-0 right-0 md:w-2/5 min-h-screen"
      aria-hidden="true"
    >
      <Image
        className="object-cover object-center w-full h-full"
        src={OnboardingBg}
        priority
        width={760}
        height={1024}
        alt="Onboarding"
      />
      <Image
        className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block fill-blue-500"
        src={OnboardingDecoration}
        priority
        width={218}
        height="224"
        alt="Onboarding decoration"
      />
    </div>
  );
}
