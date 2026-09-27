import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema, paymentSchema } from "../lib/schemas";
import { useCartStore } from "../store/useCartStore";
import { useOrderStore } from "../store/useOrderStore";
import { formatPrice } from "../lib/format";
import StepIndicator from "../components/StepIndicator";
import OrderSummaryCard from "../components/OrderSummaryCard";
import type { ShippingInfo, PaymentInfo } from "../types";

const STEPS = ["Shipping", "Payment", "Review"];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

const inputClasses =
  "w-full rounded-lg border border-line px-3 py-2.5 text-sm transition focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/15";

export default function Checkout() {
  const navigate = useNavigate();
  const lineItems = useCartStore((s) => s.lineItems());
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useOrderStore((s) => s.placeOrder);

  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingInfo | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const shippingForm = useForm<ShippingInfo>({ resolver: zodResolver(shippingSchema) });
  const paymentForm = useForm<PaymentInfo>({ resolver: zodResolver(paymentSchema) });

  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shippingCost;

  if (lineItems.length === 0 && step === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-ink/60">Your cart is empty, so there's nothing to check out.</p>
        <Link to="/" className="mt-3 inline-block text-pine hover:underline">
          Browse the shop
        </Link>
      </div>
    );
  }

  const onSubmitShipping = (data: ShippingInfo) => {
    setShippingData(data);
    setStep(1);
  };

  const onSubmitPayment = (data: PaymentInfo) => {
    setPaymentData(data);
    setStep(2);
  };

  const onPlaceOrder = () => {
    if (!shippingData) return;
    setSubmitting(true);
    const orderId = placeOrder({ lineItems, total, shipping: shippingData });
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <h1 className="mb-8 font-display text-2xl">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <StepIndicator steps={STEPS} currentStep={step} />

          {step === 0 && (
            <form
              onSubmit={shippingForm.handleSubmit(onSubmitShipping)}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-ink/70">Full name</label>
                <input {...shippingForm.register("fullName")} className={inputClasses} />
                <FieldError message={shippingForm.formState.errors.fullName?.message} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-ink/70">Street address</label>
                <input {...shippingForm.register("address")} className={inputClasses} />
                <FieldError message={shippingForm.formState.errors.address?.message} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">City</label>
                <input {...shippingForm.register("city")} className={inputClasses} />
                <FieldError message={shippingForm.formState.errors.city?.message} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">State / Province</label>
                <input {...shippingForm.register("state")} className={inputClasses} />
                <FieldError message={shippingForm.formState.errors.state?.message} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">Postal code</label>
                <input {...shippingForm.register("zip")} className={inputClasses} />
                <FieldError message={shippingForm.formState.errors.zip?.message} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">Phone</label>
                <input {...shippingForm.register("phone")} className={inputClasses} />
                <FieldError message={shippingForm.formState.errors.phone?.message} />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-pine py-3 text-sm font-medium text-paper transition hover:bg-pine-dark active:scale-[0.99] sm:col-span-2"
              >
                Continue to payment
              </button>
            </form>
          )}

          {step === 1 && (
            <form
              onSubmit={paymentForm.handleSubmit(onSubmitPayment)}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-ink/70">Name on card</label>
                <input {...paymentForm.register("cardName")} className={inputClasses} />
                <FieldError message={paymentForm.formState.errors.cardName?.message} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-ink/70">Card number</label>
                <input
                  placeholder="4242 4242 4242 4242"
                  {...paymentForm.register("cardNumber")}
                  className={inputClasses}
                />
                <FieldError message={paymentForm.formState.errors.cardNumber?.message} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">Expiry (MM/YY)</label>
                <input placeholder="09/28" {...paymentForm.register("expiry")} className={inputClasses} />
                <FieldError message={paymentForm.formState.errors.expiry?.message} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">CVV</label>
                <input placeholder="123" {...paymentForm.register("cvv")} className={inputClasses} />
                <FieldError message={paymentForm.formState.errors.cvv?.message} />
              </div>
              <p className="text-xs text-ink/40 sm:col-span-2">
                This is a demo checkout — no real payment is processed. Any values passing the
                format above will work.
              </p>
              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="flex-1 rounded-full border border-line py-3 text-sm font-medium transition hover:bg-ink/5 active:scale-[0.99]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-pine py-3 text-sm font-medium text-paper transition hover:bg-pine-dark active:scale-[0.99]"
                >
                  Review order
                </button>
              </div>
            </form>
          )}

          {step === 2 && shippingData && paymentData && (
            <div>
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-line p-4 text-sm">
                  <p className="mb-1 text-ink/50">Shipping to</p>
                  <p>{shippingData.fullName}</p>
                  <p className="text-ink/70">
                    {shippingData.address}, {shippingData.city}
                  </p>
                  <p className="text-ink/70">
                    {shippingData.state} {shippingData.zip}
                  </p>
                </div>
                <div className="rounded-lg border border-line p-4 text-sm">
                  <p className="mb-1 text-ink/50">Paying with</p>
                  <p>Card ending in {paymentData.cardNumber.slice(-4)}</p>
                  <p className="text-ink/70">Expires {paymentData.expiry}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  disabled={submitting}
                  className="flex-1 rounded-full border border-line py-3 text-sm font-medium transition hover:bg-ink/5 active:scale-[0.99] disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={onPlaceOrder}
                  disabled={submitting}
                  className="flex-1 rounded-full bg-pine py-3 text-sm font-medium text-paper transition hover:bg-pine-dark active:scale-[0.99] disabled:opacity-60"
                >
                  {submitting ? "Placing order…" : `Place order · ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        <OrderSummaryCard
          lineItems={lineItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
        />
      </div>
    </div>
  );
}
