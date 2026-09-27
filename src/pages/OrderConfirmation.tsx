import { useParams, Link } from "react-router-dom";
import { useOrderStore } from "../store/useOrderStore";
import { formatPrice, formatDate } from "../lib/format";
import { imageFor } from "../data/products";
import StatusBadge from "../components/StatusBadge";

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useOrderStore((s) => s.orders.find((o) => o.id === orderId));
  const retryOrder = useOrderStore((s) => s.retryOrder);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-ink/60">We couldn't find that order.</p>
        <Link to="/" className="mt-3 inline-block text-pine hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <div className="mb-8 text-center">
        {order.status === "processing" && (
          <>
            <h1 className="font-display text-2xl">Confirming your order…</h1>
            <p className="mt-2 text-sm text-ink/60">
              Your order has been placed and is showing here already — we're just waiting on
              confirmation from the payment step.
            </p>
          </>
        )}
        {order.status === "confirmed" && (
          <>
            <h1 className="font-display text-2xl">Order confirmed</h1>
            <p className="mt-2 text-sm text-ink/60">
              Confirmation <span className="font-medium text-ink">{order.id}</span> — a receipt
              would normally be emailed to you here.
            </p>
          </>
        )}
        {order.status === "failed" && (
          <>
            <h1 className="font-display text-2xl">We couldn't confirm this order</h1>
            <p className="mt-2 text-sm text-clay">{order.error}</p>
            <button
              onClick={() => retryOrder(order.id)}
              className="mt-4 rounded-full bg-pine px-6 py-2.5 text-sm font-medium text-paper hover:bg-pine-dark"
            >
              Retry payment
            </button>
          </>
        )}
      </div>

      <div className="rounded-lg border border-line p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-ink/50">{formatDate(order.createdAt)}</span>
          <StatusBadge status={order.status} />
        </div>
        <ul className="flex flex-col gap-3 border-t border-line pt-4">
          {order.lineItems.map((li) => (
            <li key={li.productId} className="flex items-center gap-3">
              <img src={imageFor(li.product.seed, 100)} alt={li.product.name} className="h-12 w-12 rounded-md object-cover" />
              <div className="flex-1 text-sm">
                <p>{li.product.name}</p>
                <p className="text-ink/50">Qty {li.qty}</p>
              </div>
              <span className="text-sm text-ink/70">{formatPrice(li.subtotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4 font-medium">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4 text-sm">
        <Link to="/" className="text-pine hover:underline">Continue shopping</Link>
        <span className="text-ink/30">·</span>
        <Link to="/orders" className="text-pine hover:underline">View order history</Link>
      </div>
    </div>
  );
}
