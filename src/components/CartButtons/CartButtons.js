import React from "react";
import "./CartButton.css";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { closeSidebar } from "../../actions/sidebarActions";
import { logout } from "../../actions/userActions";

const CartButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="cart-btn-wrapper">
      <Link
        to="/cart"
        className="cart-btn"
        onClick={() => {
          dispatch(closeSidebar());
        }}
      >
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="cart-value">{cartItems.length}</span>
          )}
        </span>
      </Link>
      {userInfo ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            // clearCart();
            dispatch(logout());
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            dispatch(closeSidebar());
            navigate("/login");
          }}
        >
          Login <FaUserPlus />
        </button>
      )}
    </div>
  );
};

export default CartButtons;
