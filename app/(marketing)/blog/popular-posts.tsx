import Link from "next/link";

const popularPostsData = [
  {
    title: "Actionable tips to master the art of online mentoring",
    Author: "Mentors CX",
    link: "/blog/master-the-art-of-online-mentoring",
  },
  {
    title: "Maximizing revenue: the power of customer experience",
    Author: "Mentors CX",
    link: "/blog/maximize-revenue",
  },
  {
    title:
      "Turning customers into clients: building lasting loyalty and repeat business",
    Author: "Mentors CX",
    link: "/blog/turning-customers-into-clients",
  },
];

export default function PopularPosts() {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold leading-snug tracking-tight mb-4">
        Popular on Mentors CX
      </h4>
      <ul className="-my-2">
        {popularPostsData.map((post, index) => (
          <li key={index} className="flex py-2 border-b border-gray-200">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-gray-400 mt-1 mr-3"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
            </svg>
            <article>
              <h3 className="font-medium mb-1">
                <Link href={post.link} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <div className="text-sm text-gray-800">
                <span className="text-gray-600">By </span>
                <a className="font-medium hover:underline" href="#0">
                  {post.Author}
                </a>
              </div>
            </article>
          </li>
        ))}
        {/* <li className="flex py-2 border-b border-gray-200">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-gray-400 mt-1 mr-3"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
          </svg>
          <article>
            <h3 className="font-medium mb-1">
              <a href="#0" className="hover:underline">
                Actionable tips to Maximize revenue
              </a>
            </h3>
            <div className="text-sm text-gray-800">
              <span className="text-gray-600">By </span>
              <a className="font-medium hover:underline" href="#0">
                Mentors CX
              </a>
            </div>
          </article>
        </li>
        <li className="flex py-2 border-b border-gray-200">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-gray-400 mt-1 mr-3"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
          </svg>
          <article>
            <h3 className="font-medium mb-1">
              <a href="#0" className="hover:underline">
                Actionable tips to Maximize revenue
              </a>
            </h3>
            <div className="text-sm text-gray-800">
              <span className="text-gray-600">By </span>
              <a className="font-medium hover:underline" href="#0">
                Mentors CX
              </a>
            </div>
          </article>
        </li>
        <li className="flex py-2 border-b border-gray-200">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-gray-400 mt-1 mr-3"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
          </svg>
          <article>
            <h3 className="font-medium mb-1">
              <a href="#0" className="hover:underline">
                Getting started with Vue.js and Stripe
              </a>
            </h3>
            <div className="text-sm text-gray-800">
              <span className="text-gray-600">By </span>
              <a className="font-medium hover:underline" href="#0">
                Justin Park
              </a>
            </div>
          </article>
        </li>
        <li className="flex py-2 border-b border-gray-200">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-gray-400 mt-1 mr-3"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
          </svg>
          <article>
            <h3 className="font-medium mb-1">
              <a href="#0" className="hover:underline">
                Making New projects with React & Simple
              </a>
            </h3>
            <div className="text-sm text-gray-800">
              <span className="text-gray-600">By </span>
              <a className="font-medium hover:underline" href="#0">
                Knut Mayer
              </a>
            </div>
          </article>
        </li>
        <li className="flex py-2">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-gray-400 mt-1 mr-3"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
          </svg>
          <article>
            <h3 className="font-medium mb-1">
              <a href="#0" className="hover:underline">
                How to add custom icons to your Simple project
              </a>
            </h3>
            <div className="text-sm text-gray-800">
              <span className="text-gray-600">By </span>
              <a className="font-medium hover:underline" href="#0">
                Lisa Allison
              </a>
            </div>
          </article>
        </li> */}
      </ul>
    </div>
  );
}
