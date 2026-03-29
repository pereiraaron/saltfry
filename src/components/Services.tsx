import React from 'react';
import { services } from '@utils/constants';

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-primary-10 min-[1280px]:py-0">
      <div className="section-center min-[1280px]:translate-y-20">
        <article className="lg:grid lg:grid-cols-2 lg:gap-12">
          <h3 className="text-primary-1 mb-8">
            custom furniture <br /> built only for you
          </h3>
          <p className="mb-0! leading-[1.8] text-primary-3">
            Every piece is designed with attention to detail and crafted using premium materials. We
            believe furniture should be as unique as the people who use it—functional, durable, and
            beautiful.
          </p>
        </article>
        <div className="mt-16 grid gap-6 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:grid-cols-3">
          {services.map((service) => {
            const { id, icon, title, text } = service;
            return (
              <article
                className="bg-primary-7 text-center py-10 px-8 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
                key={id}
              >
                <span className="w-16 h-16 grid mx-auto place-items-center mb-4 rounded-full bg-primary-10 text-primary-1 [&>svg]:text-3xl">
                  {icon}
                </span>
                <h4 className="text-primary-1">{title}</h4>
                <p className="text-primary-2 mb-0">{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
