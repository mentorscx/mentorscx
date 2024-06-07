import Image from "next/image";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const metadata = {
  title: "Blog",
};

export default async function PostItem() {
  const posts = allPosts
    .filter((post) => post.publishedAt)
    .filter((post) => post.articleType === "blog")
    .sort((a, b) => {
      return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
    });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-3xl tracking-tight lg:text-4xl">
            Blogs about Mentors CX and the world of customer experience
          </h1>
          <p className="text-muted-foreground">
            Receive guidance and tips for providing outstanding customer
            service, captivating and wowing your customers, and building a
            customer-led growth company - while maximizing revenue.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.authorImg && (
                <Image
                  src={post.image}
                  width={200}
                  height={150}
                  alt={post.title}
                  className="rounded-md border bg-muted transition-colors w-full h-[250px] object-cover object-top"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.publishedAt && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </p>
              )}
              {post.summary && (
                <p className="text-muted-foreground line-clamp-4">
                  {post.summary}
                </p>
              )}

              <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
