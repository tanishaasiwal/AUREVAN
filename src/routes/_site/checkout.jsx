import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Check, ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatINR } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — AURAVEN" },
      { name: "description", content: "Complete your AURAVEN order." },
    ],
  }),
  component: CheckoutPage,
});

const FIELDS = [
  { name: "fullName", label: "Full name", half: true, autoComplete: "name" },
  {
    name: "email",
    label: "Email",
    half: true,
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone",
    half: true,
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "pincode",
    label: "PIN code",
    half: true,
    autoComplete: "postal-code",
  },
  {
    name: "address",
    label: "Address",
    full: true,
    autoComplete: "street-address",
  },
  { name: "city", label: "City", half: true, autoComplete: "address-level2" },
  { name: "state", label: "State", half: true, autoComplete: "address-level1" },
];

function CheckoutPage() {
  const { items, subtotal, clearCart } = useShop();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(null);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    FIELDS.forEach((field) => {
      if (!form[field.name].trim())
        nextErrors[field.name] = `${field.label} is required`;
    });
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      nextErrors.email = "Enter a valid email address";
    }
    if (form.pincode.trim() && !/^\d{5,6}$/.test(form.pincode.trim())) {
      nextErrors.pincode = "Enter a valid PIN code";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order = {
      number: "AV-" + String(Date.now()).slice(-6),
      total: subtotal,
      items: items.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.images[0],
      })),
      name: form.fullName.trim(),
      email: form.email.trim(),
    };
    clearCart();
    setPlaced(order);
  };

  if (placed) {
    return (
      <div className="shell py-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--aurum))]/15">
            <Check
              className="h-6 w-6 text-[hsl(var(--aurum))]"
              strokeWidth={2}
            />
          </span>
          <h1 className="mt-6 font-display text-4xl leading-tight text-onyx lg:text-5xl">
            Order confirmed
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Thank you, {placed.name.split(" ")[0] || "friend"}. A confirmation
            would normally reach {placed.email}.
          </p>

          <div className="mt-8 border border-border p-6 text-left">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Order number
              </span>
              <span className="font-mono text-[13px] text-onyx">
                {placed.number}
              </span>
            </div>
            <ul className="mt-5 space-y-3 border-t border-border pt-5">
              {placed.items.map((item) => (
                <li key={item.name} className="flex items-center gap-3">
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-[hsl(var(--ivory))]">
                    <Image
                      src={item.image}
                      alt=""
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[16px] text-onyx">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Qty {item.qty}
                    </p>
                  </div>
                  <span className="price text-onyx">
                    {formatINR(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-onyx">
                Total
              </span>
              <span className="price text-[15px] text-onyx">
                {formatINR(placed.total)}
              </span>
            </div>
          </div>

          <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
            This is a demonstration checkout — no payment was processed and no
            order will ship.
          </p>

          <Link to="/shop" className="btn-onyx mt-8">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="font-display text-4xl text-onyx">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add a watch to continue to checkout.
        </p>
        <Link to="/shop" className="btn-onyx mt-7">
          Shop Watches
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-border">
        <div className="shell py-8 lg:py-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-onyx"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to bag
          </Link>
          <h1 className="mt-4 font-display text-4xl leading-tight text-onyx lg:text-5xl">
            Checkout
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 border border-[hsl(var(--aurum))]/40 bg-[hsl(var(--aurum))]/10 px-3 py-1.5 text-[11px] text-onyx">
            <Lock className="h-3 w-3" strokeWidth={1.8} />
            Demonstration checkout — no payment will be taken
          </div>
        </div>
      </div>

      <div className="shell grid gap-12 py-10 lg:grid-cols-[1fr_400px] lg:gap-16 lg:py-14">
        <form onSubmit={submit} noValidate>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-onyx">
            Delivery details
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <div
                key={field.name}
                className={field.full ? "sm:col-span-2" : undefined}
              >
                <label
                  htmlFor={field.name}
                  className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  autoComplete={field.autoComplete}
                  value={form[field.name]}
                  onChange={(event) => setField(field.name, event.target.value)}
                  aria-invalid={Boolean(errors[field.name])}
                  className={cn(
                    "mt-2 w-full border bg-background px-3.5 py-3 text-[14px] text-onyx outline-none transition-colors placeholder:text-onyx/30 focus:border-onyx",
                    errors[field.name] ? "border-destructive" : "border-border",
                  )}
                />
                {errors[field.name] && (
                  <p className="mt-1.5 text-[11px] text-destructive">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-onyx">
            Payment
          </p>
          <div className="mt-4 space-y-2.5">
            {[
              {
                value: "card",
                title: "Card (demonstration)",
                copy: "No card details are collected in this demo.",
              },
              {
                value: "cod",
                title: "Cash on delivery",
                copy: "Pay the courier when your watch arrives.",
              },
            ].map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 border p-4 transition-colors",
                  payment === option.value
                    ? "border-onyx bg-muted/50"
                    : "border-border hover:border-onyx/40",
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={payment === option.value}
                  onChange={() => setPayment(option.value)}
                  className="mt-1 h-3.5 w-3.5 accent-onyx"
                />
                <span>
                  <span className="block text-[13px] font-medium text-onyx">
                    {option.title}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-muted-foreground">
                    {option.copy}
                  </span>
                </span>
              </label>
            ))}
          </div>

          <button type="submit" className="btn-onyx mt-8 w-full sm:w-auto">
            Place Order — {formatINR(subtotal)}
          </button>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            By placing this order you agree to our{" "}
            <Link
              to="/info/terms"
              className="underline decoration-onyx/30 hover:text-onyx"
            >
              terms of service
            </Link>{" "}
            and{" "}
            <Link
              to="/info/privacy"
              className="underline decoration-onyx/30 hover:text-onyx"
            >
              privacy policy
            </Link>
            .
          </p>
        </form>

        <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-onyx">
            {items.length} {items.length === 1 ? "watch" : "watches"}
          </p>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-3">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[hsl(var(--ivory))]">
                  <Image
                    src={item.images[0]}
                    alt={`${item.name} by AURAVEN`}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[16px] leading-tight text-onyx">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Qty {item.qty}
                  </p>
                </div>
                <span className="price text-onyx">
                  {formatINR(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2.5 border-t border-border pt-5 text-[13px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="price text-onyx">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Insured delivery</span>
              <span className="text-onyx">Complimentary</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST</span>
              <span className="text-muted-foreground">Included</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-[11px] uppercase tracking-[0.22em] text-onyx">
              Total
            </span>
            <span className="price text-lg text-onyx">
              {formatINR(subtotal)}
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}
