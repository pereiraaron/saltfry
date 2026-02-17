import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrderStore } from '@stores';
import { formatPrice } from '@utils/helpers';
import { PageHero, Loading, Message } from '@components';
import { Order } from '@types';

const statusColor: Record<Order['status'], string> = {
  pending: 'bg-yellow-500/20 text-yellow-300',
  confirmed: 'bg-green-500/20 text-green-300',
  delivered: 'bg-blue-500/20 text-blue-300',
  cancelled: 'bg-red-500/20 text-red-300',
};

const OrderDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentOrder: order, loading, error, fetchOrder, cancelOrder } = useOrderStore();

  useEffect(() => {
    if (id) fetchOrder(id);
  }, [id, fetchOrder]);

  if (loading || !order) {
    return (
      <main>
        <PageHero title="order" />
        <div className="page">
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="section section-center">
              <Message type="error">{error}</Message>
            </div>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="order" />
      <div className="page">
        <section className="section-center py-8">
          <Link to="/orders" className="btn mb-6 inline-block">
            back to orders
          </Link>
          {error && (
            <div className="mb-4">
              <Message type="error">{error}</Message>
            </div>
          )}
          <div className="border border-grey-8 rounded p-4 sm:p-6 mb-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0 flex-1">
                <p className="text-grey-5 text-xs mb-1">Order ID</p>
                <p className="mb-0 text-sm font-mono truncate">{order.id}</p>
              </div>
              <span
                className={`px-3 py-1.5 rounded text-sm font-medium capitalize shrink-0 ${statusColor[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-grey-5 text-sm mb-0">
              Placed on{' '}
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <h3 className="mb-4 capitalize">items</h3>
          <div className="mb-6">
            {order.items.map((item, idx) => (
              <div
                key={`${item.productId}-${item.color}-${idx}`}
                className="flex gap-3 py-4 border-b border-grey-8"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="capitalize mb-0 text-sm truncate">{item.name}</p>
                    <p className="mb-0 text-sm font-medium shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <p className="text-grey-5 text-xs mb-0 mt-1 flex items-center gap-1.5">
                    Qty: {item.quantity}
                    {item.color && (
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ background: item.color }}
                      />
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-grey-8 rounded p-4 sm:p-6 mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-grey-5 capitalize">subtotal</span>
              <span>
                {formatPrice(
                  order.total - (order.lineItems?.reduce((sum, li) => sum + li.amount, 0) ?? 0)
                )}
              </span>
            </div>
            {order.lineItems?.map((li) => (
              <div key={li.name} className="flex justify-between mb-2 text-sm">
                <span className="text-grey-5">{li.name}</span>
                <span>{formatPrice(li.amount)}</span>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg">
              <span className="capitalize">total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
          {order.status === 'pending' && (
            <button
              type="button"
              className="bg-red-dark text-white py-2.5 px-5 rounded cursor-pointer border-none font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => cancelOrder(order.id)}
              disabled={loading}
            >
              {loading ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </section>
      </div>
    </main>
  );
};

export default OrderDetailScreen;
