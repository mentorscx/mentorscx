import Image from "next/image";

const articles = [
  {
    title: "Actionable tips to master the art of online mentoring",
    image: "/images/blog/MasteringTheArtOfOnlineMentoring.jpg",
    category: "Tips & tricks",
    altImage: "News 01",
    authorName: "Mentors CX",
    authorImage: "/mentors-cx.svg",
    altAuthorImage: "CX",
    hrefRedirect: "/blog/master-the-art-of-online-mentoring",
  },
  {
    title: "Maximizing revenue: the power of customer experience",
    image: "/images/blog/IncreasingRevenueThroughCustomerExperience.jpg",
    category: "Revenue ops",
    altImage: "News 02",
    authorName: "Mentors CX",
    authorImage: "/mentors-cx.svg",
    altAuthorImage: "CX",
    hrefRedirect: "/blog/maximize-revenue",
  },
  {
    title:
      "Turning Customers into Clients: Building Loyalty and Repeat Business",
    image: "/images/blog/TurningCustomersIntoClients.jpg",
    category: "Tips & tricks",
    altImage: "News 03",
    authorName: "Mentors CX",
    authorImage: "/mentors-cx.svg",
    altAuthorImage: "CX",
    hrefRedirect: "/blog/turning-customers-into-clients",
  },
];

export default function News() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2">Your customer experience go-to blog</h2>
          </div>

          {/* Articles list */}
          <div className="max-w-sm mx-auto md:max-w-none">
            <div className="grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">
              {articles.map((obj) => (
                <article
                  className="flex flex-col h-full"
                  data-aos="zoom-y-out"
                  key={obj.title}
                >
                  <header>
                    <a
                      href={obj.hrefRedirect}
                      className="block mb-6"
                      target="_blank"
                    >
                      <figure className="relative h-full overflow-hidden rounded">
                        <Image
                          className="w-full h-[250px] object-cover object-top scale-105 hover:-translate-y-1 transition duration-700 ease-out"
                          src={obj.image}
                          width={200}
                          height={150}
                          alt={obj.altImage}
                        />
                      </figure>
                    </a>
                    <div className="mb-3">
                      <ul className="flex flex-wrap text-xs font-medium -m-1">
                        <li className="m-1">
                          <a
                            className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                            href="#0"
                          >
                            {obj.category}
                          </a>
                        </li>
                        <li className="m-1 hidden">
                          <a
                            className="inline-flex text-center text-gray-800 py-1 px-3 rounded-full bg-white hover:bg-gray-100 shadow-sm transition duration-150 ease-in-out"
                            href="#0"
                          >
                            Hubspot
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h3 className="text-xl font-bold leading-snug tracking-tight">
                      <a
                        href={obj.hrefRedirect}
                        className="hover:underline"
                        target="_blank"
                      >
                        {obj.title}
                      </a>
                    </h3>
                  </header>
                  <footer className="text-sm flex items-center mt-4">
                    <div className="flex shrink-0 mr-3">
                      <a className="relative" href="#0">
                        <Image
                          className="relative rounded-full"
                          src={obj.authorImage}
                          width="32"
                          height="32"
                          alt={obj.altAuthorImage}
                        />
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-600">By </span>
                      <a className="font-medium hover:underline" href="#0">
                        {obj.authorName}
                      </a>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
