"use client";

import { useEffect } from "react";
import Image from "next/image";
import Particles from "./particles";

import Swiper, { Autoplay } from "swiper";
import "swiper/swiper.min.css";

const logos = [
  "/logos/appcues.png",
  "/logos/apple.svg",
  "/logos/goodEggs.svg",
  "/logos/google.svg",
  "/logos/handshake.svg",
  "/logos/hubspot.svg",
  "/logos/loom.svg",
  "/logos/meetup.svg",
  "/logos/partnerhero.svg",
  "/logos/prezzee.svg",
  "/logos/shopify.svg",
  "/logos/trello.svg",
  "/logos/wistia.svg",
  "/logos/automattic.svg",
  "/logos/zapier.svg",
  "/logos/zf.svg",
  "/logos/changex.png",
  "/logos/lovepop.png",
  "/logos/nobull.svg",
  "/logos/sanaBenefits.png",
  "/logos/soon.png",
];
Swiper.use([Autoplay]);

export default function Companies() {
  useEffect(() => {
    const carousel = new Swiper(".clients-carousel", {
      slidesPerView: "auto",
      spaceBetween: 64,
      centeredSlides: true,
      loop: true,
      speed: 5000,
      noSwiping: true,
      noSwipingClass: "swiper-slide",
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
      },
    });
  }, []);

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles animation */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={5} />
        </div>

        <div className="py-12 md:py-16">
          <div className="overflow-hidden">
            {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
            {/* * Custom styles in src/css/additional-styles/theme.scss */}
            <div className="clients-carousel swiper-container relative before:absolute before:inset-0 before:w-1/2 before:z-10 before:pointer-events-none before:bg-gradient-to-r  after:absolute after:inset-0 after:left-auto after:w-1/2  after:z-10 after:pointer-events-none after:bg-gradient-to-l ">
              <div className="swiper-wrapper !ease-linear select-none items-center">
                {/* Carousel items */}

                {logos.map((logo, key) => (
                  <div key={key} className="swiper-slide !w-auto ">
                    <Image src={logo} alt="Client 01" width={110} height={21} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
