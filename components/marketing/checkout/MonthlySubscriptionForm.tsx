"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  newsletterConsent: boolean;
  termsConsent: boolean;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  zip: "",
  state: "",
  newsletterConsent: false,
  termsConsent: false,
};

/**
 * Collects shipping + account details for the Monthly Subscription plan,
 * then hands off to /api/checkout/subscription, which creates a real
 * Stripe Checkout Session (with proper metadata already attached) and
 * returns its hosted checkout URL for us to redirect to.
 *
 * This replaces the old flow of linking straight to a static Stripe
 * Payment Link: same end result (Stripe's own checkout page), but every
 * order now arrives at the webhook with full customer info in metadata
 * from the start, rather than needing to be guessed at afterward.
 */
export function MonthlySubscriptionForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/checkout/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "monthly-membership", ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.issues) {
          setErrors(data.issues);
        } else {
          setFormError(data.error || "Something went wrong. Please try again.");
        }
        setSubmitting(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url; // hand off to Stripe's hosted checkout
      } else {
        setFormError("Could not start checkout. Please try again.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setFormError("Something went wrong. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  const fieldClass =
    "w-full rounded border border-olive/25 bg-ivory px-4 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:border-olive focus:outline-none focus-visible:outline-2";
  const labelClass = "mb-1.5 block text-sm font-medium text-charcoal/85";
  const errorClass = "mt-1 text-sm text-raspberry";

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
      {formError && (
        <div className="rounded border border-raspberry/40 bg-raspberry/5 px-4 py-3 text-sm text-raspberry">
          {formError}
        </div>
      )}

      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          required
          className={fieldClass}
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
        {errors.fullName && <p className={errorClass}>{errors.fullName[0]}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className={fieldClass}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <p className={errorClass}>{errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="addressLine1" className={labelClass}>
          Street address
        </label>
        <input
          id="addressLine1"
          type="text"
          required
          className={fieldClass}
          value={form.addressLine1}
          onChange={(e) => update("addressLine1", e.target.value)}
        />
        {errors.addressLine1 && <p className={errorClass}>{errors.addressLine1[0]}</p>}
      </div>

      <div>
        <label htmlFor="addressLine2" className={labelClass}>
          Apt / suite (optional)
        </label>
        <input
          id="addressLine2"
          type="text"
          className={fieldClass}
          value={form.addressLine2}
          onChange={(e) => update("addressLine2", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input
            id="city"
            type="text"
            required
            className={fieldClass}
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
          />
          {errors.city && <p className={errorClass}>{errors.city[0]}</p>}
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>
            State
          </label>
          <input
            id="state"
            type="text"
            required
            maxLength={2}
            placeholder="NY"
            className={fieldClass}
            value={form.state}
            onChange={(e) => update("state", e.target.value.toUpperCase())}
          />
          {errors.state && <p className={errorClass}>{errors.state[0]}</p>}
        </div>
        <div>
          <label htmlFor="zip" className={labelClass}>
            ZIP code
          </label>
          <input
            id="zip"
            type="text"
            required
            className={fieldClass}
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
          />
          {errors.zip && <p className={errorClass}>{errors.zip[0]}</p>}
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-olive/40"
          checked={form.newsletterConsent}
          onChange={(e) => update("newsletterConsent", e.target.checked)}
        />
        <span>Send me occasional emails about new editions and offers.</span>
      </label>

      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-olive/40"
          checked={form.termsConsent}
          onChange={(e) => update("termsConsent", e.target.checked)}
        />
        <span>I agree to the Terms & Conditions.</span>
      </label>
      {errors.termsConsent && <p className={errorClass}>{errors.termsConsent[0]}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full rounded bg-raspberry px-8 py-4 text-base font-medium text-paper transition-colors duration-250 hover:bg-charcoal disabled:opacity-50"
      >
        {submitting ? "Redirecting to secure checkout..." : "Continue to Checkout - $16/mo"}
      </button>
    </form>
  );
}
