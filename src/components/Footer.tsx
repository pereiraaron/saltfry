import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="h-12 relative flex justify-center items-center bg-black text-center w-full md:flex-row">
        <h5 className="text-white m-0.5 font-normal normal-case leading-[1.25]">
          &copy; {new Date().getFullYear()}
          <span className="text-primary-5"> SaltFry </span>
        </h5>
        <h5 className="text-white m-0.5 font-normal normal-case leading-[1.25]">
          All rights reserved
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
