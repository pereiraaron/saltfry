import React from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore, useUIStore } from '../../stores';

const CartButtons: React.FC = () => {
  const navigate = useNavigate();

  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const { closeSidebar } = useUIStore();

  return (
    <div className="cart-btn-wrapper grid grid-cols-2 items-center w-56.25">
      <Link
        to="/cart"
        className="text-grey-1 text-2xl tracking-[0.1rem] flex items-center"
        onClick={() => {
          closeSidebar();
        }}
      >
        Cart
        <span className="flex items-center relative [&>svg]:h-[1.6rem] [&>svg]:ml-1.25">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="absolute -top-2.5 -right-4 bg-primary-5 w-4 h-4 flex items-center justify-center rounded-full text-xs text-white p-3">
              {cartItems.length}
            </span>
          )}
        </span>
      </Link>
      {userInfo ? (
        <button
          type="button"
          className="flex items-center bg-transparent border-transparent text-2xl cursor-pointer text-grey-1 tracking-[0.1rem] [&>svg]:ml-1.25"
          onClick={() => {
            logout();
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center bg-transparent border-transparent text-2xl cursor-pointer text-grey-1 tracking-[0.1rem] [&>svg]:ml-1.25"
          onClick={() => {
            closeSidebar();
            navigate('/login');
          }}
        >
          Login <FaUserPlus />
        </button>
      )}
    </div>
  );
};

export default CartButtons;
