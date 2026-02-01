import React from 'react';
import './CartButton.css';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore, useUIStore } from '../../stores';

const CartButtons: React.FC = () => {
  const navigate = useNavigate();

  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const { closeSidebar } = useUIStore();

  return (
    <div className="cart-btn-wrapper">
      <Link
        to="/cart"
        className="cart-btn"
        onClick={() => {
          closeSidebar();
        }}
      >
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          {cartItems.length > 0 && <span className="cart-value">{cartItems.length}</span>}
        </span>
      </Link>
      {userInfo ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            logout();
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button
          type="button"
          className="auth-btn"
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
