import Link from "next/link";

export default function CtaDark() {
  return (
    <section className="bg-slate-900">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="relative mx-auto max-w-5xl text-center">
            <div className="relative">
              <h2 className="h2 font-playfair-display mb-4 text-slate-100">
                Say goodbye to roadblocks, guesswork, and frustration.
              </h2>

              <p className="mb-8 text-xl text-slate-400">
                Join Mentors CX and continue{" "}
                <span className="text-emerald-500">
                  growing your career today.
                </span>
                .
              </p>
              <div>
                <Link
                  className="btn group bg-blue-600 text-white hover:bg-blue-700"
                  href="/subscribe"
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
      </div>
    </section>
  );
}
