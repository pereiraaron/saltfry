import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuthStore, useUIStore } from '../../stores';
import CartButtons from '../CartButtons/CartButtons';
import { links } from '../../utils/constants';
import { logo } from '../../assets';

const Navbar: React.FC = () => {
  const { userInfo } = useAuthStore();
  const { openSidebar } = useUIStore();

  const handleSidebar = () => {
    openSidebar();
  };

  return (
    <nav className="h-20 flex items-center justify-center">
      <div className="w-[90vw] mx-auto max-w-292.5 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="comfy sloth" className="w-43.75 -ml-3.75" />
          </Link>
          <button
            type="button"
            aria-label="Open navigation menu"
            className="bg-transparent border-transparent text-primary-5 cursor-pointer [&>svg]:text-3xl lg:hidden"
            onClick={handleSidebar}
          >
            <FaBars />
          </button>
        </div>
        <ul className="hidden lg:flex lg:justify-center [&>li]:mx-2">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link
                  to={url}
                  className="text-grey-3 text-base capitalize tracking-[0.1rem] p-2 hover:border-b-2 hover:border-primary-7"
                >
                  {text}
                </Link>
              </li>
            );
          })}
          {userInfo && (
            <li>
              <Link
                to="/checkout"
                className="text-grey-3 text-base capitalize tracking-[0.1rem] p-2 hover:border-b-2 hover:border-primary-7"
              >
                checkout
              </Link>
            </li>
          )}
        </ul>
        <div className="hidden lg:block">
          <CartButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
