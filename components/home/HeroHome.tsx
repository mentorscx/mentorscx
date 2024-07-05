import VideoThumb from "@/public/images/HeroVideoBackground.jpeg";
import ModalVideo from "@/components/modal-video";
import Link from "next/link";

export default function HeroHome() {
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16 ">
            <h1 className="h1 md:text-6xl" data-aos="zoom-y-out">
              The CX community that{" "}
            </h1>
            <h1
              className="h1 md:text-6xl pb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
              data-aos="zoom-y-out"
            >
              grows your career
            </h1>

            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Your gateway to a community that thrives on learning and growth.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Link
                    className="btn group bg-blue-600 text-white hover:bg-blue-700"
                    href="/waitlist"
                  >
                    Get started{" "}
                    <span className="ml-3 text-xl tracking-normal text-white transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                      &gt;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
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
