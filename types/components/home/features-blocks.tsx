export default function FeaturesBlocks() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="pointer-events-none absolute inset-0 top-1/2 bg-gray-900 md:mt-24 lg:mt-0"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-x-0 bottom-0 m-auto h-20 w-px translate-y-1/2 bg-gray-200 p-px"></div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 mb-4">Benefits of joining Mentors CX</h2>
            <p className="text-xl text-gray-600">
              Joining our Mentors CX community offers a unique opportunity to
              gain valuable insights, foster meaningful connections, and
              accelerate your professional growth in the dynamic field of
              customer experience.
            </p>
          </div>

          {/* Items */}
          <div className="mx-auto grid max-w-sm items-start gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {/* 1st item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2">
                    <path
                      className="stroke-current text-blue-300"
                      d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M20.571 37.714h5.715L36.57 26.286h8"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      strokeLinecap="square"
                      d="M41.143 34.286l3.428 3.428-3.428 3.429"
                    />
                    <path
                      className="stroke-current text-white"
                      strokeLinecap="square"
                      d="M41.143 29.714l3.428-3.428-3.428-3.429"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-6 text-center text-xl font-bold leading-snug tracking-tight">
                Expand your network and fortify relationships
              </h4>
              <p className="text-start text-gray-600">
                Open the door to collaborative opportunities and lifelong
                connections within our Mentors CX community
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2" transform="translate(19.429 20.571)">
                    <circle
                      className="stroke-current text-white"
                      strokeLinecap="square"
                      cx="12.571"
                      cy="12.571"
                      r="1.143"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-6 text-center text-xl font-bold leading-snug tracking-tight">
                Get unstuck with tailored guidance
              </h4>
              <p className="text-start text-gray-600">
                Receive personalized support to overcome challenges and propel
                your professional journey forward.
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center rounded bg-white p-6 shadow-xl">
              <svg
                className="-mt-1 mb-2 h-16 w-16 p-1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  <g strokeWidth="2">
                    <path
                      className="stroke-current text-blue-300"
                      d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286"
                    />
                    <path
                      className="stroke-current text-white"
                      strokeLinecap="square"
                      d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286"
                    />
                    <path
                      className="stroke-current text-blue-300"
                      d="M36.571 32H40"
                    />
                    <path
                      className="stroke-current text-white"
                      d="M24 32h3.429"
                      strokeLinecap="square"
                    />
                  </g>
                </g>
              </svg>
              <h4 className="mb-6 text-justify text-xl font-bold leading-snug tracking-tight">
                Career growth & development
              </h4>
              <p className="text-start text-gray-600">
                Utilize the collective wisdom of our community to empower your
                success in the dynamic and ever-evolving realm of customer
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
