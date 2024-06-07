import VideoThumb from "@/public/images/hero.jpg";
import ModalVideo02 from "./modal-video-02";

export default function HeroWorld() {
  return (
    <section className="relative bg-slate-900">
      {/* Dark background */}
      <div
        className="pointer-events-none absolute  inset-0 -z-10 mb-36 [clip-path:polygon(0_0,_5760px_0,_5760px_calc(100%_-_352px),_0_100%)] lg:mb-0 lg:h-[48rem]"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 ">
        <div className="pt-32 md:pt-40">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center">
            <h1 className="h1 font-playfair-display mb-4 text-slate-100">
              Join 70K+ companies and investors
            </h1>
            <p className="text-xl text-slate-400">
              We&apos;re proud to have played a part in these amazing journeys.
            </p>
          </div>

          {/* Hero image */}
          <ModalVideo02
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
