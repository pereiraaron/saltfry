import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useCartStore } from '@stores';
import { formatPrice } from '@utils/helpers';
import { PageHero, CartColumns, CartTotals, AmountButtons } from '@components';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, loadingItems, clearingCart, removeFromCart, clearCart } = useCartStore();

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
          <section className="section section-center">
            <CartColumns />
            {cartItems.map((item) => {
              return (
                <article
                  className="grid grid-cols-[200px_auto_auto]
                    grid-rows-[75px] gap-y-12 gap-x-4
                    justify-items-center mb-12 items-center
                    md:grid-cols-[1fr_1fr_1fr_1fr_auto]
                    md:grid-rows-[75px]"
                  key={item.id}
                >
                  <div
                    className="grid grid-cols-[75px_125px]
                      grid-rows-[75px] items-center
                      text-left gap-4
                      md:grid-cols-[100px_200px]
                      md:h-full"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full block
                        rounded-(--radius-default)
                        object-cover"
                    />
                    <div>
                      <h5
                        className="text-xs mb-0
                          md:text-[0.85rem]"
                      >
                        {item.name}
                      </h5>
                      <p
                        className="text-grey-5 text-xs
                          tracking-widest capitalize mb-0
                          flex items-center justify-start
                          md:text-[0.85rem]"
                      >
                        color :
                        <span
                          className="inline-block w-2 h-2
                            ml-2 mt-[0.2rem]
                            rounded-(--radius-default)
                            md:mt-[0.4em] md:w-3 md:h-3"
                          style={{ background: item.color }}
                        />
                      </p>
                      <h5
                        className="text-primary-5 text-xs
                          mb-0 md:hidden"
                      >
                        {formatPrice(item.price)}
                      </h5>
                    </div>
                  </div>
                  <h5
                    className="hidden md:block text-base
                      text-primary-5 font-normal mb-0"
                  >
                    {formatPrice(item.price)}
                  </h5>
                  <AmountButtons total={item.stock} id={item.id} currentqty={item.quantity} />
                  <h5
                    className="hidden md:block mb-0
                      text-grey-5 font-normal text-base"
                  >
                    {formatPrice(item.price * item.quantity)}
                  </h5>
                  <button
                    className={`text-white bg-red-dark
                      border-transparent tracking-widest
                      w-6 h-6 flex items-center
                      justify-center
                      rounded-(--radius-default)
                      text-xs cursor-pointer
                      ${loadingItems.has(item.id) ? 'opacity-50 pointer-events-none' : ''}`}
                    disabled={loadingItems.has(item.id)}
                    onClick={async () => {
                      await removeFromCart(item.id);
                      if (cartItems.length === 1) {
                        navigate('/cart');
                      }
                    }}
                  >
                    {loadingItems.has(item.id) ? (
                      <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </article>
              );
            })}
            <hr />
            <div className="flex justify-between mt-8">
              <Link
                to="/products"
                className="bg-primary-5 text-white
                  rounded-(--radius-default)
                  tracking-widest font-normal
                  cursor-pointer capitalize py-1 px-2
                  border-transparent"
              >
                continue shopping
              </Link>
              <button
                type="button"
                className={`bg-black text-white
                  rounded-(--radius-default)
                  tracking-widest font-normal
                  cursor-pointer capitalize py-1 px-2
                  border-transparent
                  ${clearingCart ? 'opacity-50 pointer-events-none' : ''}`}
                disabled={clearingCart}
                onClick={async () => {
                  await clearCart();
                  navigate('/cart');
                }}
              >
                {clearingCart ? 'clearing...' : 'clear shopping cart'}
              </button>
            </div>
            <CartTotals
              itemsPrice={itemsPrice}
              shippingPrice={shippingPrice}
              totalPrice={totalPrice}
            />
          </section>
        </main>
    </div>
  );
};

export default CartScreen;
