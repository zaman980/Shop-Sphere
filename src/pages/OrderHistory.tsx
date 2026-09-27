import { Link } from "react-router-dom";
import { useOrderStore } from "../store/useOrderStore";
import { formatPrice, formatDate } from "../lib/format";
import StatusBadge from "../components/StatusBadge";
import { RotateCcw } from "lucide-react";

export default function OrderHistory() {
  const orders = useOrderStore((s) => s.orders);
  const retryOrder = useOrderStore((s) => s.retryOrder);

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-ink/60">No orders yet.</p>
        <Link to="/" className="mt-3 inline-block text-pine hover:underline">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <h1 className="mb-8 font-display text-2xl">Order history</h1>

      {/* Mobile / small tablet: stacked cards */}
      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-line bg-white p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  to={`/order-confirmation/${order.id}`}
                  className="break-all font-medium text-pine hover:underline"
                >
                  {order.id}
                </Link>
                <p className="mt-1 text-xs text-ink/50">{formatDate(order.createdAt)}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
              <span className="text-ink/60">
                {order.lineItems.reduce((sum, li) => sum + li.qty, 0)} items
              </span>
              <div className="flex items-center gap-3">
                <span className="font-medium">{formatPrice(order.total)}</span>
                {order.status === "failed" && (
                  <button
                    onClick={() => retryOrder(order.id)}
                    className="flex items-center gap-1 text-xs text-pine hover:underline"
                  >
                    <RotateCcw size={12} /> Retry
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Laptop / large tablet: table */}
      <div className="hidden overflow-x-auto rounded-lg border border-line md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line bg-ink/[0.02] text-xs uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-line transition last:border-0 hover:bg-ink/[0.015]">
                <td className="px-4 py-3">
                  <Link to={`/order-confirmation/${order.id}`} className="font-medium text-pine hover:underline">
                    {order.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink/60">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3 text-ink/60">
                  {order.lineItems.reduce((sum, li) => sum + li.qty, 0)} items
                </td>
                <td className="px-4 py-3">{formatPrice(order.total)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3">
                  {order.status === "failed" && (
                    <button
                      onClick={() => retryOrder(order.id)}
                      className="flex items-center gap-1 text-xs text-pine hover:underline"
                    >
                      <RotateCcw size={12} /> Retry
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
