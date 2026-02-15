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
          <form className="w-[90vw] max-w-125 grid grid-cols-[1fr_auto]">
            <input
              type="email"
              className="text-base py-2 px-2 border-2 border-black border-r-0 text-grey-3 rounded-l"
              placeholder="enter email"
            />
            <button
              type="submit"
              className="text-base py-2 px-4 border-2 border-black rounded-r bg-primary-5 capitalize tracking-widest cursor-pointer transition-all duration-300 text-black hover:text-white"
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
