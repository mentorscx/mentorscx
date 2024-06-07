import { siteConfig } from '@/config/site';
import { cn } from '@nextui-org/react';
import { Link } from 'lucide-react';
import React from 'react';
import { buttonVariants } from '../ui/button';

const OldSectionHero = () => {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 h-screen">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Link
          href={siteConfig.links.twitter}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          Follow along on Twitter
        </Link>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          The CX Community that grows your career
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Your gateway to a community that thrives on learning and growth.
        </p>
        <div className="space-x-4 ">
          <Link href="/profile" className={cn(buttonVariants({ size: 'lg' }))}>
            Grow your career
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OldSectionHero;
