import Link from "next/link";
import Image from "next/image";
import CustomerAvatar01 from "@/public/images/customer-avatar-01.jpg";
import CustomerAvatar02 from "@/public/images/customer-avatar-02.jpg";
import CustomerAvatar03 from "@/public/images/customer-avatar-03.jpg";
import Customers01 from "@/public/images/customers-01.jpg";
import Customers02 from "@/public/images/customers-02.jpg";
import Customers03 from "@/public/images/customers-03.jpg";

export default function Customers() {
  return (
    <section>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Line */}
          <div
            className="absolute left-1/2 top-0 -ml-px -mt-4 hidden h-12 w-0.5 bg-slate-200 md:block"
            aria-hidden="true"
          ></div>

          {/* Customers */}
          <div className="mx-auto max-w-xl space-y-20 md:max-w-none">
            {/* 1st Customer */}
            <div className="flex flex-col-reverse space-y-4 space-y-reverse md:flex-row-reverse md:items-center md:space-x-8 md:space-y-0 md:space-x-reverse lg:space-x-16 lg:space-x-reverse xl:space-x-20 xl:space-x-reverse">
              {/* Content */}
              <div className="md:min-w-[30rem]" data-aos="fade-left">
                <h2 className="h3 font-playfair-display mb-4 md:text-4xl">
                  <Link
                    className="text-slate-800 hover:underline hover:decoration-blue-100"
                    href="/wall-of-love//wall-of-love-single"
                  >
                    Black Inc.
                  </Link>
                </h2>
                <p className="mb-8 border-l-2 border-slate-800 pl-4 text-lg text-slate-500">
                  Award-winning design firm Black Inc. didnt get the
                  personalized approach they wanted from colloboration tools -
                  until they met Tidy.
                </p>
                <div className="space-y-3">
                  <svg
                    className="fill-blue-600"
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                  >
                    <path d="M2.76 16c2.577 0 5.154-3.219 5.154-5.996 0-1.357-.613-2.272-1.748-2.272s-2.27.726-3.283 1.64C3.16 6.439 5.613 3.346 9.571.885L9.233 0C3.466 2.903 0 7.732 0 12.213 0 14.517.828 16 2.76 16Zm10.43 0c2.577 0 5.154-3.219 5.154-5.996 0-1.357-.614-2.272-1.749-2.272-1.135 0-2.27.726-3.282 1.64.276-2.934 2.73-6.027 6.687-8.488L19.663 0c-5.767 2.903-9.234 7.732-9.234 12.213 0 2.304.829 3.787 2.761 3.787Z" />
                  </svg>
                  <blockquote className="font-playfair-display italic text-slate-500">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur e xcepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia.
                  </blockquote>
                </div>
                <div className="mt-4 flex items-center">
                  <Link href="#0">
                    <Image
                      className="mr-3 shrink-0 rounded-full"
                      src={CustomerAvatar01}
                      width="32"
                      height="32"
                      alt="Customer Avatar 01"
                    />
                  </Link>
                  <div className="font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Christine Duck
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">CEO, Black Inc.</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className="flex items-center justify-center"
                data-aos="fade-right"
              >
                <div className="relative">
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 -translate-x-4 -translate-y-4 border-2 border-slate-200"
                    aria-hidden="true"
                  ></div>
                  <Image
                    className="mx-auto md:max-w-none"
                    src={Customers01}
                    width={540}
                    height={405}
                    alt="Customer 01"
                  />
                </div>
                <button className="group absolute">
                  <svg
                    className="group h-16 w-16 fill-current sm:h-20 sm:w-20"
                    viewBox="0 0 88 88"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="text-white opacity-80 transition duration-150 ease-in-out group-hover:opacity-100"
                      cx="44"
                      cy="44"
                      r="44"
                    />
                    <path
                      className="text-blue-600"
                      d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 2nd Customer */}
            <div className="flex flex-col-reverse space-y-4 space-y-reverse md:flex-row md:items-center md:space-x-8 md:space-y-0 lg:space-x-16 xl:space-x-20">
              {/* Content */}
              <div className="md:min-w-[30rem]" data-aos="fade-left">
                <h2 className="h3 font-playfair-display mb-4 md:text-4xl">
                  <Link
                    className="text-slate-800 hover:underline hover:decoration-blue-100"
                    href="/wall-of-love//wall-of-love-single"
                  >
                    Leon Fibre S.r.l.
                  </Link>
                </h2>
                <p className="mb-8 border-l-2 border-slate-800 pl-4 text-lg text-slate-500">
                  Professional communication studio Leon didn&apos;t get the
                  personalized approach they wanted from colloboration tools -
                  until they met Tidy.
                </p>
                <div className="space-y-3">
                  <svg
                    className="fill-blue-600"
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                  >
                    <path d="M2.76 16c2.577 0 5.154-3.219 5.154-5.996 0-1.357-.613-2.272-1.748-2.272s-2.27.726-3.283 1.64C3.16 6.439 5.613 3.346 9.571.885L9.233 0C3.466 2.903 0 7.732 0 12.213 0 14.517.828 16 2.76 16Zm10.43 0c2.577 0 5.154-3.219 5.154-5.996 0-1.357-.614-2.272-1.749-2.272-1.135 0-2.27.726-3.282 1.64.276-2.934 2.73-6.027 6.687-8.488L19.663 0c-5.767 2.903-9.234 7.732-9.234 12.213 0 2.304.829 3.787 2.761 3.787Z" />
                  </svg>
                  <blockquote className="font-playfair-display italic text-slate-500">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur e xcepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia.
                  </blockquote>
                </div>
                <div className="mt-4 flex items-center">
                  <Link href="#0">
                    <Image
                      className="mr-3 shrink-0 rounded-full"
                      src={CustomerAvatar02}
                      width="32"
                      height="32"
                      alt="Customer Avatar 02"
                    />
                  </Link>
                  <div className="font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Marco Tancredi
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">
                      CTO, Leon Fibre S.r.l.
                    </span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className="flex items-center justify-center"
                data-aos="fade-right"
              >
                <div className="relative">
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 -translate-y-4 translate-x-4 border-2 border-slate-200"
                    aria-hidden="true"
                  ></div>
                  <Image
                    className="mx-auto md:max-w-none"
                    src={Customers02}
                    width={540}
                    height={405}
                    alt="Customer 02"
                  />
                </div>
                <button className="group absolute">
                  <svg
                    className="group h-16 w-16 fill-current sm:h-20 sm:w-20"
                    viewBox="0 0 88 88"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="text-white opacity-80 transition duration-150 ease-in-out group-hover:opacity-100"
                      cx="44"
                      cy="44"
                      r="44"
                    />
                    <path
                      className="text-blue-600"
                      d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 3rd Customer */}
            <div className="flex flex-col-reverse space-y-4 space-y-reverse md:flex-row-reverse md:items-center md:space-x-8 md:space-y-0 md:space-x-reverse lg:space-x-16 lg:space-x-reverse xl:space-x-20 xl:space-x-reverse">
              {/* Content */}
              <div className="md:min-w-[30rem]" data-aos="fade-left">
                <h2 className="h3 font-playfair-display mb-4 md:text-4xl">
                  <Link
                    className="text-slate-800 hover:underline hover:decoration-blue-100"
                    href="/wall-of-love//wall-of-love-single"
                  >
                    CD International
                  </Link>
                </h2>
                <p className="mb-8 border-l-2 border-slate-800 pl-4 text-lg text-slate-500">
                  Award-winning design firm Black Inc. didn&apos;t get the
                  personalized approach they wanted from colloboration tools -
                  until they met Tidy.
                </p>
                <div className="space-y-3">
                  <svg
                    className="fill-blue-600"
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                  >
                    <path d="M2.76 16c2.577 0 5.154-3.219 5.154-5.996 0-1.357-.613-2.272-1.748-2.272s-2.27.726-3.283 1.64C3.16 6.439 5.613 3.346 9.571.885L9.233 0C3.466 2.903 0 7.732 0 12.213 0 14.517.828 16 2.76 16Zm10.43 0c2.577 0 5.154-3.219 5.154-5.996 0-1.357-.614-2.272-1.749-2.272-1.135 0-2.27.726-3.282 1.64.276-2.934 2.73-6.027 6.687-8.488L19.663 0c-5.767 2.903-9.234 7.732-9.234 12.213 0 2.304.829 3.787 2.761 3.787Z" />
                  </svg>
                  <blockquote className="font-playfair-display italic text-slate-500">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur e xcepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia.
                  </blockquote>
                </div>
                <div className="mt-4 flex items-center">
                  <Link href="#0">
                    <Image
                      className="mr-3 shrink-0 rounded-full"
                      src={CustomerAvatar03}
                      width="32"
                      height="32"
                      alt="Customer Avatar 03"
                    />
                  </Link>
                  <div className="font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Štefan Štefančík
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">
                      Partner, CD International
                    </span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className="flex items-center justify-center"
                data-aos="fade-right"
              >
                <div className="relative">
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 -translate-x-4 -translate-y-4 border-2 border-slate-200"
                    aria-hidden="true"
                  ></div>
                  <Image
                    className="mx-auto md:max-w-none"
                    src={Customers03}
                    width={540}
                    height={405}
                    alt="Customer 03"
                  />
                </div>
                <button className="group absolute">
                  <svg
                    className="group h-16 w-16 fill-current sm:h-20 sm:w-20"
                    viewBox="0 0 88 88"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="text-white opacity-80 transition duration-150 ease-in-out group-hover:opacity-100"
                      cx="44"
                      cy="44"
                      r="44"
                    />
                    <path
                      className="text-blue-600"
                      d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
