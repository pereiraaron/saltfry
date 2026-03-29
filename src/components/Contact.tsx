import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-20 m-0 min-[1280px]:py-60">
      <div className="section-center">
        <h3 className="normal-case">Join our newsletter and get 20% off</h3>
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-32 lg:mt-8">
          <p className="leading-8 max-w-[45em] text-grey-5 lg:mb-0!">
            Be the first to know about new collections, exclusive offers, and interior styling
            tips—straight to your inbox.
          </p>
          <form className="w-full max-w-125 grid grid-cols-[1fr_auto]">
            <input
              type="email"
              className="text-base py-2.5 px-4 border-2 border-grey-8 border-r-0 text-grey-3 rounded-l-lg focus:border-primary-5 focus:outline-none transition-colors"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="text-base py-2.5 px-6 border-2 border-primary-5 rounded-r-lg bg-primary-5 capitalize tracking-widest cursor-pointer transition-all duration-200 text-white font-medium hover:bg-primary-4 hover:border-primary-4"
            >
              subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
