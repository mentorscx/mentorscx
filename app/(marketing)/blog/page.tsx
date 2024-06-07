import type { Metadata } from "next";
import { allPosts, Post } from "contentlayer/generated";
import PostItem from "@/components/post-item";
import PopularPosts from "./popular-posts";
import Topics from "./topics";

export const metadata: Metadata = {
  title: "Blog | Mentors CX",
  description:
    "Stay updated with the latest insights and tips in customer experience from our expert mentors on the Mentors CX blog.",
};

export default function Blog() {
  // Sort posts by date
  const allBlogs = allPosts.filter((post: Post) => post.articleType === "blog");
  allBlogs.sort((a, b) => {
    return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
  });

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-20 pb-3 md:pt-24 md:pb-6">
          {/* Main content */}
          <div className="md:flex md:justify-between">
            {/* Articles container */}
            <div className="md:grow -mt-4">
              <PostItem />
            </div>

            {/* Sidebar */}
            <aside className="relative mt-12 md:mt-0 md:w-64 md:ml-12 lg:ml-20 md:shrink-0">
              <PopularPosts />
              {/* <Topics /> */}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
