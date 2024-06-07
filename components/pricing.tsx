import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

interface PriceProps {
  plan: {
    name: string;
    price: {
      monthly: string;
      annual: string;
      discount: string;
      original: string;
    };
    popular: boolean;
    features: string[];
    button: {
      text: string;
      link: string;
    };
  };
}

const Pricing = ({ plan }: PriceProps) => {
  return (
    <div>
      <div className="flex flex-col w-full order-first lg:order-none border-2 border-[#D8DEE9] border-opacity-50 py-5 px-6 rounded-md h-[480px]">
        <div className="text-center">
          <h4 className="text-lg font-medium text-gray-400">{plan.name}</h4>
          <p className="mt-3 text-4xl font-bold text-black md:text-4xl">
            {plan.price && typeof plan.price === 'object'
              ? plan.price.monthly
              : plan.price}
          </p>{' '}
          {/* {plan.price && plan.price.original && (
            <p className="mt-1 text-xl font-medium text-gray-400 line-through md:text-2xl">
              {plan.price.original}
            </p>
          )} */}
        </div>
        <ul className="grid mt-8 text-left gap-y-4 h-[360px]">
          {plan.features?.map((item, index) => (
            <li className="flex items-start gap-3 text-gray-800" key={index}>
              <svg
                className="w-6 h-6 fill-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="9" fillOpacity=".16"></circle>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.75 12a8.25 8.25 0 0 1 11.916-7.393.75.75 0 1 0 .668-1.343A9.713 9.713 0 0 0 12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75c0-.366-.02-.727-.06-1.082a.75.75 0 1 0-1.49.164A8.25 8.25 0 1 1 3.75 12Zm17.78-6.47a.75.75 0 0 0-1.06-1.06L12 12.94l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l9-9Z"
                ></path>
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex mt-8 items-center justify-center">
          <Link href={plan.button.link || '#'}>
            <Button
              className="w-full"
              variant={plan.popular ? 'default' : 'outline'}
            >
              {' '}
              {plan.button.text || 'Get Started'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
