import Accordion from "@/components/utils/accordion";
import Link from "next/link";

export default function Faqs() {
  return (
    <section>
      <div className="hidden max-w-6xl mx-auto px-4 sm:px-6 md:block h-screen">
        <div className="py-12 md:py-20 border-t border-gray-200">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-20">
            <h2 className="h2">Questions & Answers</h2>
          </div>

          {/* Faqs */}
          <ul className="max-w-3xl mx-auto pl-12">
            <Accordion title="Which subjects can I bring up with mentors?">
              Customer Experience covers a wide spectrum of skills and
              sub-categories. From customer support, onboarding, and customer
              journey mapping, to customer loyalty and retention strategies.
              Look for the perfect mentor using our filters (which include
              skills, industry, and tools). Whether it’s strategic thinking or
              hands-on tips, you’ll probably find someone who can help out.
            </Accordion>
            <Accordion title="How is the proficiency of mentors on the platform assured?">
              Recruitment is our top talent. We learned the importance of a
              top-notch recruiting process from the best practices at
              PartnerHero - a BPO that stood out due to their retention rates,
              low churn/attrition, culture, etc etc. Every mentor either has a
              public proven record for being a CX advocate in the industry, has
              worked in the CX space together with one of the founders, or has
              gone through a thorough recruiting process responsible to vet
              their skills and hands-on experience - plus the soft skills needed
              to be a mentor.
            </Accordion>
            <Accordion title="Do you have student or non-profit discounts?">
              Yes. We want to bring the best of the best to everyone possible.
              If you are a student, are part of a non-profit, or consider you
              have low income, we offer discounts. The special rate also applies
              to people changing careers (getting started in the CX space). You
              can apply for a discount{" "}
              <Link
                href="https://forms.gle/XdTkWBYvqpyjFojF8"
                className="text-blue-400"
                target="_blank"
              >
                here
              </Link>
              .
            </Accordion>
            <Accordion
              title="Can I upgrade to a different plan at a later time?"
              active
            >
              Definintely! You can upgrade or downgrade your membership whenever
              you want. The bill will be updated accordingly depending on which
              action you take.
            </Accordion>
            <Accordion title="Can I get a refund if I decide it’s not a right fit?">
              We’d hate to see you go, but you can. If you decide our platform
              is not a right fit, you can cancel your membership within 21 days.
              Just contact our customer support team. Keep in mind that if you
              have scheduled any calls or didn’t follow our terms & conditions
              accordingly, we won’t process a refund.
            </Accordion>
            <span
              className="block border-t border-gray-200"
              aria-hidden="true"
            ></span>
          </ul>
        </div>
      </div>
    </section>
  );
}
