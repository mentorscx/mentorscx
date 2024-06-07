import Image from "next/image";
import AboutImage from "@/public/images/website/OurStoryReason.jpg";

export default function AboutStory() {
  return (
    <section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2 mb-3">Our story</h2>
            <p className="text-lg text-gray-600 mb-8">
              One of our founders was a mentee and a mentor in a different
              mentorship platform (unrelated to CX), and was inspired to bring a
              similar idea into a space he’s been part of for more than ten
              years. Customer experience. That’s how Mentors CX was first
              conceived.
            </p>
            {/* <p className="text-lg text-gray-600 mb-8">
              Quam pellentesque nec nam aliquam sem et tortor consequat,
              pellentesque adipiscing commodo elit at imperdiet. Semper auctor
              neque vitae tempus quam pellentesque nec. Amet dictum sit amet
              justo donec enim diam varius sit amet mattis vulputate enim nulla
              aliquet porttitor.
            </p> */}
          </div>

          <div className="sm:flex">
            <figure className="flex shrink-0 max-w-none sm:max-w-xs lg:max-w-none mb-8 sm:mb-0">
              <Image
                className="grow self-start rounded"
                src={AboutImage}
                width={435}
                height={326}
                alt="About us 02"
              />
            </figure>
            <div className="sm:ml-8 lg:ml-16 flex justify-center items-center">
              {/* <h4 className="h4 mb-2 invisible">How this started?</h4> */}
              <p className="text-lg text-gray-600 mb-8">
                It suckssss when brands ruin our day, doesn’t it? There’s a lot
                of bad CX practices out there, but trust me, sometimes it’s not
                that companies are trying to create a bad experience, it’s just
                that they’re unaware of how to improve the journey customers
                follow through their touchpoints.
              </p>
              {/* <div className="flex  mb-8 invisible">
                <Image
                  className="rounded-full self-start shrink-0 shadow-lg mr-4"
                  src={AboutLogo}
                  width={40}
                  height={40}
                  alt="Logo"
                />
                <div>
                  <blockquote className="text-gray-600 italic">
                    “ I love this product and would recommend it to anyone.
                    Could be not easier to use, and our multiple websites are
                    wonderful. We get nice comments all the time. “
                  </blockquote>
                  <div className="text-sm font-medium text-gray-600 mt-2">
                    <cite className="text-gray-900 not-italic">
                      Micheal Osman
                    </cite>{' '}
                    ·{' '}
                    <a className="text-blue-600" href="#0">
                      New York Times
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-6">
            <p className="text-lg text-gray-600">
              Some are stuck. We are building this platform because we want a
              better world, and we want to connect CX leaders with other
              forward-thinking folks who are ready to get unstuck and keep
              growing in their career, while making those customer interactions
              positive along the journey. It’s true, there’s a lot of content
              and some communities out there, but we believe nothing beats a 1:1
              with mentors who have been there before. Getting actionable,
              tailored feedback is priceless (we do have membership plans and
              affordable prices though, lol).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
