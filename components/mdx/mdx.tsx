import { useMDXComponent } from "next-contentlayer/hooks";
import PostLink from "./link";
import PostImage from "./image";
import PostBanner from "./banner";
import { cn } from "@nextui-org/react";
import { MdxCard } from "@/components/mdx/mdx-card";

import React from "react";
import { Button } from "@/components/ui/button";
import { MdxButton } from "./button";

const mdxComponents = {
  Link: PostLink,
  Image: PostImage,
  Banner: PostBanner,
  h1: ({ ...props }) => (
    <h1
      className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight")}
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0"
      )}
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight")}
      {...props}
    />
  ),
  h4: ({ ...props }) => (
    <h4
      className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight")}
      {...props}
    />
  ),
  h5: ({ ...props }) => (
    <h5
      className={cn("mt-8 scroll-m-20 text-lg font-semibold tracking-tight")}
      {...props}
    />
  ),
  h6: ({ ...props }) => (
    <h6
      className={cn("mt-8 scroll-m-20 text-base font-semibold tracking-tight")}
      {...props}
    />
  ),
  a: ({ ...props }) => <a className={cn("font-medium ")} {...props} />,
  p: ({ ...props }) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6")} {...props} />
  ),
  ul: ({ ...props }) => <ul className={cn("my-6 ml-6 list-disc")} {...props} />,
  ol: ({ ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal")} {...props} />
  ),
  li: ({ ...props }) => <li className={cn("mt-2")} {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground")}
      {...props}
    />
  ),
  img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border")} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full")} {...props} />
    </div>
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t p-0 even:bg-muted")} {...props} />
  ),
  th: ({ ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      )}
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      )}
      {...props}
    />
  ),
  pre: ({ ...props }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
      )}
      {...props}
    />
  ),
  // code: ({  ...props }) => (
  //   <code
  //     className={cn(
  //       "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
  Card: MdxCard,
  Button: MdxButton,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose max-w-none prose-lg  prose-a:text-blue-600  prose-a:no-underline">
      <Component components={{ ...mdxComponents }} />
    </article>
  );
}
