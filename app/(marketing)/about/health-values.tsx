export default function HealthValues() {
  return (
    <section className="relative" id="health-pillars">
      {/* Blurred shape */}
      <div
        className="absolute top-0 -translate-y-1/3 left-1/2 -translate-x-1/2 ml-24 blur-2xl opacity-50 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
          <defs>
            <linearGradient
              id="bs3-a"
              x1="19.609%"
              x2="50%"
              y1="14.544%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bs3-a)"
            fillRule="evenodd"
            d="m410 0 461 369-284 58z"
            transform="matrix(1 0 0 -1 -410 427)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t [border-image:linear-gradient(to_right,transparent,theme(colors.slate.800),transparent)1]">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text  bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Our Health Pillars
            </h2>
          </div>

          {/* Icons with text */}
          <div className="grid md:grid-cols-4 gap-6 lg:gap-10 max-w-xs mx-auto md:max-w-none -m-5">
            {/* Block #1 */}
            <div className="text-center p-5">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-transparent [background:linear-gradient(theme(colors.blue.800),_theme(colors.blue.800))_padding-box,_conic-gradient(theme(colors.blue.400),_theme(colors.blue.700)_25%,_theme(colors.blue.700)_75%,_theme(colors.blue.400)_100%)_border-box] mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path
                    className="fill-blue-200"
                    d="M9.423 12.278H.87L11.614.458l-1.037 7.264h8.553L8.386 19.542l1.037-7.264Zm-6.293-1h7.447l-.74 5.18 7.033-7.736H9.423l.74-5.18-7.033 7.736Z"
                    opacity=".8"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold leading-snug tracking-tight mb-1">
                Move more
              </div>
              <p className="text-gray-600 text-center">
                Embrace an active lifestyle by incorporating regular physical
                activity into your routine. It’s okay to take regular breaks
                during your workday.
              </p>
            </div>
            {/* Block #2 */}
            <div className="text-center p-5">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-transparent [background:linear-gradient(theme(colors.blue.800),_theme(colors.blue.800))_padding-box,_conic-gradient(theme(colors.blue.400),_theme(colors.blue.700)_25%,_theme(colors.blue.700)_75%,_theme(colors.blue.400)_100%)_border-box] mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24">
                  <g fill="none" fillRule="nonzero" opacity=".8">
                    <path
                      className="fill-blue-600"
                      d="M14.416 3.527C13.841 4.39 13.5 5.242 13.5 6a1.5 1.5 0 1 0 3 0c0-.758-.34-1.61-.916-2.473A8.962 8.962 0 0 0 15 2.748c-.2.239-.398.5-.584.78ZM17.5 6a2.5 2.5 0 1 1-5 0c0-.992.41-2.015 1.084-3.027a9.979 9.979 0 0 1 1.062-1.327L15 1.293l.354.353a9.979 9.979 0 0 1 1.062 1.326C17.091 3.986 17.5 5.009 17.5 6ZM6 6.5c-1.374 0-2.5-1.055-2.5-2.375 0-.243.043-.492.125-.746.176-.548.523-1.108.99-1.672A9.774 9.774 0 0 1 5.677.62L6 .344l.323.275a9.774 9.774 0 0 1 1.061 1.089c.468.563.815 1.123.991 1.671.082.254.125.503.125.746C8.5 5.445 7.374 6.5 6 6.5Zm-.615-4.154c-.393.474-.678.933-.808 1.339-.051.16-.077.307-.077.44C4.5 4.877 5.164 5.5 6 5.5s1.5-.623 1.5-1.375c0-.133-.026-.28-.077-.44-.13-.406-.415-.865-.808-1.34A8.746 8.746 0 0 0 6 1.682c-.21.205-.42.43-.615.665Z"
                    />
                    <path
                      className="fill-blue-200"
                      d="M9.483 14.562A6.495 6.495 0 0 1 15 11.5h4.5v.5a8.5 8.5 0 0 1-8.5 8.5H9.5v3h-1v-7H7A6.5 6.5 0 0 1 .5 10v-.5H4c2.89 0 5.26 2.23 5.483 5.062Zm-.485.938H8.5v1h.174a6.45 6.45 0 0 1 .324-1Zm.502 4H11a7.5 7.5 0 0 0 7.484-7H15A5.5 5.5 0 0 0 9.5 18v1.5Zm-1-4V15A4.5 4.5 0 0 0 4 10.5H1.522A5.5 5.5 0 0 0 7 15.5h1.5Z"
                    />
                  </g>
                </svg>
              </div>
              <div className="text-xl font-bold leading-snug tracking-tight mb-1">
                Eat Healthier
              </div>
              <p className="text-gray-600 text-center">
                Nourish your body with wholesome and nutrient-rich foods,
                increasing your veggies and fruits intake. Less sugars and
                processed foods.
              </p>
            </div>
            {/* Block #3 */}
            <div className="text-center p-5">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-transparent [background:linear-gradient(theme(colors.blue.800),_theme(colors.blue.800))_padding-box,_conic-gradient(theme(colors.blue.400),_theme(colors.blue.700)_25%,_theme(colors.blue.700)_75%,_theme(colors.blue.400)_100%)_border-box] mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <g fill="none" fillRule="nonzero" opacity=".8">
                    <path
                      className="fill-blue-600"
                      d="M11.5 1h1v4h-1V1ZM23 11.5v1h-4v-1h4ZM12.5 23h-1v-4h1v4ZM1 12.5v-1h4v1H1Z"
                    />
                    <path
                      className="fill-blue-200"
                      d="M12 23.5C5.649 23.5.5 18.351.5 12S5.649.5 12 .5 23.5 5.649 23.5 12 18.351 23.5 12 23.5Zm0-1c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5Zm0-8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                    />
                  </g>
                </svg>
              </div>
              <div className="text-xl font-bold leading-snug tracking-tight mb-1">
                Sleep Enough
              </div>
              <p className="text-gray-600 text-center">
                Prioritize adequate and restful sleep. Don’t feel unproductive
                because you sleep 8 hours. You’ll be more efficient when you’re
                awake.
              </p>
            </div>

            {/* Block #4 */}
            <div className="text-center p-5">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-transparent [background:linear-gradient(theme(colors.blue.800),_theme(colors.blue.800))_padding-box,_conic-gradient(theme(colors.blue.400),_theme(colors.blue.700)_25%,_theme(colors.blue.700)_75%,_theme(colors.blue.400)_100%)_border-box] mb-3">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <g fill="none" fillRule="nonzero" opacity=".8">
                    <path
                      className="fill-slate-600"
                      d="M11.5 1h1v4h-1V1ZM23 11.5v1h-4v-1h4ZM12.5 23h-1v-4h1v4ZM1 12.5v-1h4v1H1Z"
                    />
                    <path
                      className="fill-slate-200"
                      d="M12 23.5C5.649 23.5.5 18.351.5 12S5.649.5 12 .5 23.5 5.649 23.5 12 18.351 23.5 12 23.5Zm0-1c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5Zm0-8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                    />
                  </g>
                </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="fill-blue-600"
                    d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
                  />
                  <path
                    className="fill-blue-200"
                    d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold leading-snug tracking-tight mb-1">
                Positive Mindset
              </div>
              <p className="text-gray-600 text-center">
                Foster a positive and resilient mindset, cultivating an
                optimistic (but realistic) outlook that makes others feel good
                when talking to you.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center ">
            <p className="text-lg text-gray-600 mt-6 md:mt-12">
              Our platform enables relationships, which is also essential for
              longevity. Therefore, we didn’t write it as a health pillar. It’s
              already embedded in the company’s dynamic.
            </p>
            <p className="text-lg text-gray-600 mt-3 md:mt-6">
              <span className="italic text-lg font-semibold">PS</span>: Even
              though these were inspired by many articles, published studies,
              docuseries, books, and documentaries, we decided to add this as
              our company’s health pillars after reading a NYT article written
              by Dana G. Smith on Jan 4th. It was simple and updated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
