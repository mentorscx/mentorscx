import type { Metadata } from "next";
import { allPosts, Post } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PostDate from "@/components/post-date";
import { Mdx } from "@/components/mdx/mdx";
import PostNav from "@/components/mdx/post-nav";

const allDocs = allPosts.filter((post: Post) => post.articleType === "docs");

export async function generateStaticParams() {
  return allDocs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allDocs.find((post) => post.slug === `docs/${params.slug}`);

  if (!post) return;

  const { title, summary: description } = post;

  return {
    title,
    description,
  };
}

export default async function SinglePost({
  params,
}: {
  params: { slug: string };
}) {
  const post = allDocs.find((post) => post.slug === `docs/${params.slug}`);

  if (!post) notFound();

  return (
    <section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto lg:max-w-none">
            <article>
              {/* Article header */}
              <header className="max-w-3xl mx-auto mb-20">
                {/* Title */}
                <h1 className="h1 text-center mb-4">{post.title}</h1>
              </header>

              {/* Article content */}
              <div className="lg:flex lg:justify-between">
                {/* Sidebar */}

                {/* Main content */}
                <div>
                  {/* Article meta */}

                  {/* Article body */}
                  <div>
                    <Mdx code={post.body.code} />
                  </div>

                  <div className="text-lg text-gray-600">
                    <div className="mt-6">
                      <Link
                        href="/"
                        className="inline-flex items-center text-base text-blue-600 font-medium hover:underline"
                      >
                        <svg
                          className="w-3 h-3 fill-current text-blue-400 shrink-0 mr-2"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M.293 5.282L5 .5l1.414 1.436-3 3.048H12v2.032H3.414l3 3.048L5 11.5.293 6.718a1.027 1.027 0 010-1.436z" />
                        </svg>
                        <span>Back to the website</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article footer */}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
