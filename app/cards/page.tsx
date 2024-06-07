import React from 'react';
import { DemoShareDocument } from './components/profile-card';
import { cn } from '@/lib/utils';

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center [&>div]:w-full',
        className
      )}
      {...props}
    />
  );
}

const page = () => {
  return (
    <div className="grid grid-cols-2 ">
      <DemoContainer className="w-[540px]">
        <DemoShareDocument />
      </DemoContainer>
      <DemoContainer className="w-[540px]">
        <DemoShareDocument />
      </DemoContainer>
    </div>
  );
};

export default page;
