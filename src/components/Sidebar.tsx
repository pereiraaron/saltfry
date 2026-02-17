import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useAuthStore, useUIStore } from '@stores';
import { links } from '@utils/constants';
import { logo } from '@assets';
import CartButtons from './CartButtons';

const Sidebar: React.FC = () => {
  const { userInfo } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const handleCloseSidebar = () => {
    closeSidebar();
  };

  return (
    <div>
      <aside
        className={`fixed top-0 left-0 w-full h-full bg-white transition-all duration-300 ease-linear lg:hidden ${
          isSidebarOpen ? 'translate-x-0 z-999' : '-translate-x-full -z-1'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <img
            src={logo}
            className="justify-self-center h-11.25"
            alt="Woodwork"
          />
          <button
            className="text-3xl bg-transparent border-transparent text-red-dark transition-all duration-300 ease-linear cursor-pointer mt-[0.2rem] hover:text-red-light"
            onClick={handleCloseSidebar}
          >
            <FaTimes />
          </button>
        </div>
        <ul className="mb-8">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link
                  to={url}
                  onClick={handleCloseSidebar}
                  className="block text-left text-base capitalize py-4 px-6 text-grey-3 transition-all duration-300 ease-linear tracking-[0.1rem] hover:pl-8 hover:bg-grey-10 hover:text-grey-2"
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
                onClick={handleCloseSidebar}
                className="block text-left text-base capitalize py-4 px-6 text-grey-3 transition-all duration-300 ease-linear tracking-[0.1rem] hover:pl-8 hover:bg-grey-10 hover:text-grey-2"
              >
                checkout
              </Link>
            </li>
          )}
        </ul>
        <div className="cart-btn-wrapper mx-auto my-8">
          <CartButtons />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
