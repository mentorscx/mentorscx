import React from 'react';

const SectionBanner = () => {
  return (
    <section className="container mt-3 py-8 md:py-12 lg:py-24 md:w-3/4 text-center space-y-3 bg-primary/50 text-white text-2xl md:text-4xl md:rounded-md">
      <div className="flex items-center justify-center">
        <h2 className="w-3/4">
          Sometimes all you need is a 1-on-1 conversation with someone who has
          been there before 🌱
        </h2>
      </div>
    </section>
  );
};

export default SectionBanner;
