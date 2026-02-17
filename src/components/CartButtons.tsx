import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore, useUIStore } from '@stores';

const CartButtons: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const { closeSidebar } = useUIStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-5">
      <Link
        to="/cart"
        className="text-grey-1 flex items-center relative"
        onClick={() => closeSidebar()}
      >
        <FaShoppingCart className="text-xl" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-primary-5 w-4.5 h-4.5 flex items-center justify-center rounded-full text-[0.65rem] text-white">
            {cartItems.length}
          </span>
        )}
      </Link>

      {userInfo ? (
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            className="w-8 h-8 rounded-full border-2 border-grey-3 text-grey-3 flex items-center justify-center cursor-pointer bg-transparent hover:border-primary-5 hover:text-primary-5 transition-colors"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FaUser className="text-xs" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-grey-9 py-1 z-50">
              <div className="px-4 py-2.5 border-b border-grey-9">
                <p className="text-sm font-medium mb-0 capitalize truncate">
                  {userInfo.username || 'User'}
                </p>
                <p className="text-xs text-grey-5 mb-0 truncate">{userInfo.email}</p>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-grey-3 hover:bg-grey-10 capitalize"
                onClick={() => {
                  setDropdownOpen(false);
                  closeSidebar();
                }}
              >
                profile
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 text-sm text-grey-3 hover:bg-grey-10 capitalize"
                onClick={() => {
                  setDropdownOpen(false);
                  closeSidebar();
                }}
              >
                orders
              </Link>
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-sm text-red-dark hover:bg-grey-10 cursor-pointer bg-transparent border-none capitalize"
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-grey-3 text-sm hover:text-primary-5"
          onClick={() => {
            closeSidebar();
            navigate('/login');
          }}
        >
          <FaUser className="text-sm" />
          <span>Login</span>
        </button>
      )}
    </div>
  );
};

export default CartButtons;
