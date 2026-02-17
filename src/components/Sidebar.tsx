import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore, useCartStore, useUIStore } from '@stores';
import { links } from '@utils/constants';
import { logo } from '@assets';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const linkClass =
    'block text-left text-base capitalize py-4 px-6 text-grey-3 transition-all duration-300 ease-linear tracking-[0.1rem] hover:pl-8 hover:bg-grey-10 hover:text-grey-2';

  return (
    <div>
      <aside
        className={`fixed top-0 left-0 w-full h-full bg-white transition-all duration-300 ease-linear lg:hidden flex flex-col ${
          isSidebarOpen ? 'translate-x-0 z-999' : '-translate-x-full -z-1'
        }`}
      >
        <div className="h-20 flex justify-between items-center px-[5vw]">
          <img src={logo} className="w-43.75 -ml-3.75" alt="Woodwork" />
          <button
            className="text-xl bg-transparent border-transparent text-red-dark transition-all duration-300 ease-linear cursor-pointer hover:text-red-light"
            onClick={closeSidebar}
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation links */}
        <ul className="flex-1 overflow-y-auto">
          {links.map(({ id, text, url }) => (
            <li key={id}>
              <Link to={url} onClick={closeSidebar} className={linkClass}>
                {text}
              </Link>
            </li>
          ))}
          {userInfo && (
            <li>
              <Link to="/orders" onClick={closeSidebar} className={linkClass}>
                orders
              </Link>
            </li>
          )}
          <li>
            <Link to="/cart" onClick={closeSidebar} className={linkClass}>
              <span className="flex items-center gap-2">
                cart
                {cartItems.length > 0 && (
                  <span className="bg-primary-5 text-white text-[0.65rem] rounded-full w-5 h-5 flex items-center justify-center not-italic font-normal">
                    {cartItems.length}
                  </span>
                )}
              </span>
            </Link>
          </li>
        </ul>

        {/* Footer: user section */}
        <div className="border-t border-grey-9 px-6 py-4">
          {userInfo ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                onClick={closeSidebar}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="w-9 h-9 rounded-full bg-primary-5 text-white flex items-center justify-center text-sm font-medium shrink-0 uppercase">
                  {(userInfo.username || userInfo.email || '?').charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-0 capitalize truncate">
                    {userInfo.username || 'User'}
                  </p>
                  <p className="text-xs text-grey-5 mb-0 truncate">{userInfo.email}</p>
                </div>
              </Link>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full text-grey-5 hover:text-red-dark hover:bg-red-dark/10 bg-transparent border-none cursor-pointer transition-colors shrink-0"
                onClick={() => {
                  closeSidebar();
                  logout();
                }}
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-sm" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="flex items-center gap-3 w-full text-left py-1 text-base text-grey-3 capitalize bg-transparent border-none cursor-pointer"
              onClick={() => {
                closeSidebar();
                navigate('/login');
              }}
            >
              <div className="w-9 h-9 rounded-full border-2 border-grey-7 text-grey-5 flex items-center justify-center shrink-0">
                <FaUser className="text-xs" />
              </div>
              <span>Login</span>
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
