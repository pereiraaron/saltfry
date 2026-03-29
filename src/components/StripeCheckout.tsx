import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCartStore, useOrderStore } from '@stores';
import { formatPrice } from '@utils/helpers';
import { Message, AmountButtons } from '@components';

const StripeCheckout: React.FC = () => {
  const { cartItems, loadingItems, removeFromCart } = useCartStore();
  const { checkoutLoading, error, checkout, clearError } = useOrderStore();

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 100000 ? 0 : 1000;
  const totalPrice = itemsPrice + shippingPrice;

  if (checkoutLoading) {
    return (
      <div className="animate-pulse py-12">
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
          <div>
            <div className="h-6 w-36 rounded-full bg-grey-9 mb-5" />
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 py-4 border-b border-grey-9">
                <div className="w-16 h-16 rounded bg-grey-9 shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-32 rounded-full bg-grey-9 mb-2" />
                  <div className="h-3 w-20 rounded-full bg-grey-9" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="border border-grey-9 rounded-lg p-5">
              <div className="h-5 w-28 rounded-full bg-grey-9 mb-5" />
              <div className="h-4 w-full rounded-full bg-grey-9 mb-3" />
              <div className="h-4 w-full rounded-full bg-grey-9 mb-3" />
              <hr className="my-4" />
              <div className="h-5 w-full rounded-full bg-grey-9 mb-5" />
              <div className="h-11 w-full rounded-lg bg-primary-9" />
            </div>
          </div>
        </div>
        <p className="text-center text-grey-5 text-sm mt-8">
          Redirecting to payment, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 lg:items-start">
      {/* Left column: items */}
      <div>
        <h4 className="mb-4 capitalize">review items</h4>
        <div className="divide-y divide-grey-9">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 py-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="capitalize mb-0 text-sm truncate">{item.name}</p>
                    <p className="text-grey-5 text-xs mb-0 flex items-center gap-1.5 mt-0.5">
                      color:
                      {item.color && (
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ background: item.color }}
                        />
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`text-grey-5 hover:text-red-dark bg-transparent border-none cursor-pointer shrink-0 p-1 ${loadingItems.has(item.id) ? 'opacity-50 pointer-events-none' : ''}`}
                    disabled={loadingItems.has(item.id)}
                    onClick={() => removeFromCart(item.id)}
                  >
                    {loadingItems.has(item.id) ? (
                      <span className="inline-block w-3 h-3 rounded bg-grey-8 animate-pulse" />
                    ) : (
                      <FaTrash className="text-xs" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <AmountButtons total={item.stock} id={item.id} currentqty={item.quantity} />
                  <p className="mb-0 text-sm font-medium shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column: order summary + place order */}
      <div className="mt-8 lg:mt-0 lg:sticky lg:top-20">
        <div className="border border-grey-8 rounded-lg p-5">
          <h5 className="mb-4 capitalize">order summary</h5>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-grey-5 capitalize">subtotal</span>
            <span>{formatPrice(itemsPrice)}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm">
            <span className="text-grey-5 capitalize">shipping</span>
            <span>{formatPrice(shippingPrice)}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between mb-5 font-bold">
            <span className="capitalize">total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          {error && (
            <div className="mb-4">
              <Message type="error">{error}</Message>
              <button
                type="button"
                className="text-sm text-grey-5 underline cursor-pointer bg-transparent border-none mt-1"
                onClick={clearError}
              >
                dismiss
              </button>
            </div>
          )}
          <button
            type="button"
            className="btn w-full text-center font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() =>
              checkout(shippingPrice > 0 ? [{ name: 'Shipping', amount: shippingPrice }] : [])
            }
            disabled={checkoutLoading}
          >
            {checkoutLoading ? 'Redirecting to payment...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;
