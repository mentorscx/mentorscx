import Link from "next/link";

import React from "react";

interface PostLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function PostLink({ href, ...props }: PostLinkProps) {
  return (
    <Link href={href} {...props}>
      {props.children}
    </Link>
  );
}
