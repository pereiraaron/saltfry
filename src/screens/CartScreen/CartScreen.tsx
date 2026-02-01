import React, { useEffect } from 'react';
import './CartScreen.css';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../stores';
import PageHero from '../../components/PageHero/PageHero';
import CartColumns from '../../components/CartColumns/CartColumns';
import { formatPrice } from '../../utils/helpers';
import CartTotals from '../../components/CartTotals/CartTotals';
import AmountButtons from '../../components/AmountButtons/AmountButtons';
import Footer from '../../components/Footer.js/Footer';

const CartScreen: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const { cartItems, addToCart, removeFromCart, clearCart } = useCartStore();

  useEffect(() => {
    if (productId) {
      addToCart(productId, qty);
    }
  }, [productId, qty, addToCart]);

  const itemsPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shippingPrice = itemsPrice > 100000 ? 0 : 1000;
  const totalPrice = Number(itemsPrice) + Number(shippingPrice);

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
                  <AmountButtons total={item.stock} id={item.id} currentqty={item.quantity} />
                  <h5 className="subtotal">{formatPrice(item.price * item.quantity)}</h5>
                  <button className="remove-btn">
                    <FaTrash
                      onClick={() => {
                        removeFromCart(item.id);
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
                  clearCart();
                  navigate('/cart');
                }}
              >
                clear shopping cart
              </button>
            </div>
            <CartTotals
              itemsPrice={itemsPrice}
              shippingPrice={shippingPrice}
              totalPrice={totalPrice}
            />
          </section>
        </main>
      </main>
      <Footer />
    </>
  );
};

export default CartScreen;
