import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useCartStore } from '@stores';
import { formatPrice } from '@utils/helpers';
import { PageHero, CartTotals, AmountButtons, Message } from '@components';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, loadingItems, clearingCart, removeFromCart, clearCart } = useCartStore();
  const isCancelled = new URLSearchParams(location.search).get('cancelled') === 'true';
  const [showCancelled, setShowCancelled] = useState(isCancelled);

  useEffect(() => {
    if (!isCancelled) return undefined;
    const timer = setTimeout(() => setShowCancelled(false), 5000);
    return () => clearTimeout(timer);
  }, [isCancelled]);

  const itemsPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shippingPrice = itemsPrice > 100000 ? 0 : 1000;
  const totalPrice = Number(itemsPrice) + Number(shippingPrice);

  return cartItems.length < 1 ? (
    <main className="page-100">
      <div className="text-center">
        <h2 className="mb-4 normal-case">Your cart is empty</h2>
        <Link to="/products" className="btn">
          fill it
        </Link>
      </div>
    </main>
  ) : (
    <div>
      <PageHero title="cart" />
      <main className="page">
        <div className="section-center py-8">
          {showCancelled && (
            <div className="mb-6">
              <Message type="error">Checkout was cancelled. Your cart is still here.</Message>
            </div>
          )}

          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 lg:items-start">
            {/* Left column: cart items */}
            <div>
              <div className="divide-y divide-grey-9">
                {cartItems.map((item) => (
                  <article key={item.id} className="flex gap-4 py-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h5 className="text-sm mb-1 capitalize truncate">{item.name}</h5>
                          <p className="text-xs text-grey-5 mb-0 flex items-center gap-1.5">
                            color:
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{ background: item.color }}
                            />
                          </p>
                        </div>
                        <button
                          type="button"
                          className={`text-grey-5 hover:text-red-dark bg-transparent border-none cursor-pointer shrink-0 p-1 ${loadingItems.has(item.id) ? 'opacity-50 pointer-events-none' : ''}`}
                          disabled={loadingItems.has(item.id)}
                          onClick={async () => {
                            await removeFromCart(item.id);
                            if (cartItems.length === 1) navigate('/cart');
                          }}
                        >
                          {loadingItems.has(item.id) ? (
                            <span className="inline-block w-3 h-3 border-2 border-grey-5 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FaTrash className="text-xs" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <AmountButtons total={item.stock} id={item.id} currentqty={item.quantity} />
                        <p className="text-sm font-medium mb-0">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 justify-between mt-4 pt-4 border-t border-grey-8">
                <Link
                  to="/products"
                  className="bg-primary-5 text-white rounded font-normal cursor-pointer capitalize py-1.5 px-3 border-transparent text-sm"
                >
                  continue shopping
                </Link>
                <button
                  type="button"
                  className={`bg-black text-white rounded font-normal cursor-pointer capitalize py-1.5 px-3 border-transparent text-sm ${clearingCart ? 'opacity-50 pointer-events-none' : ''}`}
                  disabled={clearingCart}
                  onClick={async () => {
                    await clearCart();
                    navigate('/cart');
                  }}
                >
                  {clearingCart ? 'clearing...' : 'clear cart'}
                </button>
              </div>
            </div>

            {/* Right column: order summary */}
            <div className="mt-8 lg:mt-0 lg:sticky lg:top-20">
              <CartTotals
                itemsPrice={itemsPrice}
                shippingPrice={shippingPrice}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartScreen;
