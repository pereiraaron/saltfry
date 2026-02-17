import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOrderStore, useCartStore } from '@stores';
import { formatPrice } from '@utils/helpers';
import { PageHero, Loading, Message } from '@components';
import { Order } from '@types';

const statusStyle: Record<Order['status'], string> = {
  pending: 'bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/20',
  confirmed: 'bg-green-500/15 text-green-400 ring-1 ring-green-500/20',
  delivered: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20',
  cancelled: 'bg-red-500/15 text-red-400 ring-1 ring-red-500/20',
};

const OrdersScreen: React.FC = () => {
  const location = useLocation();
  const { orders, loading, error, fetchOrders } = useOrderStore();
  const fetchCart = useCartStore((s) => s.fetchCart);
  const isSuccess = new URLSearchParams(location.search).get('success') === 'true';
  const [showSuccess, setShowSuccess] = useState(isSuccess);

  useEffect(() => {
    fetchOrders();
    if (!isSuccess) return undefined;
    fetchCart();
    const timer = setTimeout(() => setShowSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [fetchOrders, fetchCart, isSuccess]);

  if (loading && orders.length === 0) {
    return (
      <main>
        <PageHero title="orders" />
        <div className="page">
          <Loading />
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="orders" />
      <div className="page">
        <section className="section-center py-8">
          {showSuccess && (
            <div className="mb-6">
              <Message type="success">Payment successful! Your order has been placed.</Message>
            </div>
          )}
          {error && (
            <div className="mb-6">
              <Message type="error">{error}</Message>
            </div>
          )}
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="mb-2">No orders yet</h2>
              <p className="text-grey-5 mb-6">
                Once you place an order, it will appear here.
              </p>
              <Link to="/products" className="btn">
                start shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {orders.map((order) => {
                const previewItems = order.items.slice(0, 4);
                const extraCount = order.items.length - 4;

                return (
                  <Link
                    key={order.id}
                    to={`/orders/${order.id}`}
                    className="block border border-grey-8 rounded-lg p-5 hover:border-primary-5 transition-colors group"
                  >
                    {/* Top row: date + status */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-grey-5 text-xs mb-0">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyle[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Item list */}
                    <div className="flex flex-col gap-2.5 mb-4">
                      {previewItems.map((item, idx) => (
                        <div
                          key={`${item.productId}-${idx}`}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm capitalize mb-0 truncate">{item.name}</p>
                            <div className="flex items-center gap-2 text-xs text-grey-5">
                              <span>Qty: {item.quantity}</span>
                              {item.color && (
                                <span
                                  className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ background: item.color }}
                                />
                              )}
                            </div>
                          </div>
                          <p className="text-sm mb-0 shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                      {extraCount > 0 && (
                        <p className="text-xs text-grey-5 mb-0">
                          +{extraCount} more {extraCount === 1 ? 'item' : 'items'}
                        </p>
                      )}
                    </div>

                    {/* Bottom row: order id + total */}
                    <div className="flex items-center justify-between pt-3 border-t border-grey-9">
                      <p className="text-xs text-grey-6 font-mono mb-0 truncate max-w-[50%]">
                        #{order.id.slice(-8)}
                      </p>
                      <p className="font-bold mb-0 group-hover:text-primary-5 transition-colors">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default OrdersScreen;
