import React, { useEffect } from 'react';
import './CartScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import CartColumns from '../../components/CartColumns/CartColumns';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../utils/helpers';
import { addToCart, clearCart, removeFromCart } from '../../actions/cartActions';
import CartTotals from '../../components/CartTotals/CartTotals';
import AmountButtons from '../../components/AmountButtons/AmountButtons';
import Footer from '../../components/Footer.js/Footer';

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  cart.shippingPrice = cart.totalPrice > 100000 ? 0 : 1000;

  return cartItems.length < 1 ? (
    <>
      <main className="page-100 cart-screen">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </main>
      <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <main className="cart-screen">
        <PageHero title="cart" />
        <main className="page">
          <section className="section section-center cart-content">
            <CartColumns />
            {cartItems.map((item) => {
              return (
                <article className="cart-item" key={item.id}>
                  <div className="title">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h5 className="name">{item.name}</h5>
                      <p className="color">
                        color :
                        <span style={{ background: item.color }} />
                      </p>
                      <h5 className="price-small">{formatPrice(item.price)}</h5>
                    </div>
                  </div>
                  <h5 className="price">{formatPrice(item.price)}</h5>
                  {<AmountButtons total={item.stock} id={item.id} currentqty={item.quantity} />}
                  <h5 className="subtotal">{formatPrice(item.price * item.quantity)}</h5>
                  <button className="remove-btn">
                    <FaTrash
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                        if (cartItems.length === 1) {
                          navigate('/cart');
                        }
                      }}
                    />
                  </button>
                </article>
              );
            })}
            <hr />
            <div className="link-container">
              <Link to="/products" className="link-btn">
                continue shopping
              </Link>
              <button
                type="button"
                className="link-btn clear-btn"
                onClick={() => {
                  dispatch(clearCart());
                  navigate('/cart');
                }}
              >
                clear shopping cart
              </button>
            </div>
            <CartTotals
              itemsPrice={cart.itemsPrice}
              shippingPrice={cart.shippingPrice}
              totalPrice={cart.totalPrice}
            />
          </section>
        </main>
      </main>
      <Footer />
    </>
  );
};

export default CartScreen;
