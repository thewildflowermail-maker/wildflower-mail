"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, SelectInput, CheckboxField, ToggleSwitch } from "@/components/ui/FormField";
import { GiftForm } from "@/components/marketing/GiftForm";
import { isValidEmail, isValidZip } from "@/lib/utils/format";
import { pricing } from "@/lib/config/site-config";

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

type RequiredField = "fullName" | "email" | "addressLine1" | "city" | "state" | "zip";

const initial: FormState = {
  fullName: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  newsletterConsent: false,
  termsConsent: false,
};

const usStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

/** Field-level validation shared between onBlur (real-time) and onSubmit. */
function getFieldError(key: RequiredField, value: string): string | undefined {
  switch (key) {
    case "fullName":
      return value.trim() ? undefined : "Please enter your full name.";
    case "email":
      return isValidEmail(value) ? undefined : "Please enter a valid email address.";
    case "addressLine1":
      return value.trim() ? undefined : "Please enter a street address.";
    case "city":
      return value.trim() ? undefined : "Please enter a city.";
    case "state":
      return value ? undefined : "Please select a state.";
    case "zip":
      return isValidZip(value) ? undefined : "Enter a valid ZIP code, like 12345 or 12345-6789.";
    default:
      return undefined;
  }
}

export function CartCheckoutForm() {
  // This page only ever checks out the monthly membership — plan switching
  // isn't offered here, so the previous `useSearchParams()` / `planParam`
  // comparison always resolved to the same branch and has been removed.
  // Gift durations (3/6 months) now have their own live flow below via the
  // "Is this a gift?" toggle instead.
  const plan = pricing.monthlyMembership;

  const [isGift, setIsGift] = useState(false);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<RequiredField, boolean>>>({});
  const [termsTouched, setTermsTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const termsError = termsTouched && !form.termsConsent ? "Please agree to the Terms & Conditions to continue." : undefined;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key as RequiredField]) {
      setErrors((prev) => ({ ...prev, [key]: getFieldError(key as RequiredField, value as string) }));
    }
  }

  function handleBlur(key: RequiredField) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: getFieldError(key, form[key] as string) }));
  }

  function validate() {
    const requiredFields: RequiredField[] = ["fullName", "email", "addressLine1", "city", "state", "zip"];
    const next: Partial<Record<RequiredField, string>> = {};
    requiredFields.forEach((key) => {
      const error = getFieldError(key, form[key] as string);
      if (error) next[key] = error;
    });
    setErrors(next);
    setTouched(Object.fromEntries(requiredFields.map((k) => [k, true])) as Record<RequiredField, boolean>);
    setTermsTouched(true);
    return Object.keys(next).length === 0 && form.termsConsent;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan: plan.id }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className="space-y-5">
        <ToggleSwitch
          id="isGift"
          checked={isGift}
          onChange={setIsGift}
          label="Is this a gift for someone else?"
          hint="Toggle on to send a multi-month gift edition with a personal note instead of a membership for yourself."
        />

        {/* Both forms stay mounted so toggling back and forth never loses
            what's been typed, and the height animates smoothly (via
            grid-template-rows 0fr → 1fr) instead of snapping — no layout
            jump either way. */}
        <div
          className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: isGift ? "0fr" : "1fr" }}
          aria-hidden={isGift}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="grid grid-cols-1 gap-12 pt-1 lg:grid-cols-[1.3fr_1fr]">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h2 className="font-serif text-xl font-medium text-olive">Your Details <span className="font-sans text-sm font-normal text-charcoal/50">(Purchaser)</span></h2>
                </div>
                <FieldWrapper label="Full name" htmlFor="fullName" error={touched.fullName ? errors.fullName : undefined} required>
                  <TextInput id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} onBlur={() => handleBlur("fullName")} error={Boolean(touched.fullName && errors.fullName)} autoComplete="name" />
                </FieldWrapper>
                <FieldWrapper label="Email address" htmlFor="email" error={touched.email ? errors.email : undefined} required hint="For your order confirmation and account access.">
                  <TextInput id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} onBlur={() => handleBlur("email")} error={Boolean(touched.email && errors.email)} autoComplete="email" />
                </FieldWrapper>

                <div className="border-t border-olive/10 pt-5">
                  <h2 className="font-serif text-xl font-medium text-olive">Shipping Address <span className="font-sans text-sm font-normal text-charcoal/50">(Recipient)</span></h2>
                </div>
                <FieldWrapper label="Street address" htmlFor="addressLine1" error={touched.addressLine1 ? errors.addressLine1 : undefined} required>
                  <TextInput id="addressLine1" value={form.addressLine1} onChange={(e) => update("addressLine1", e.target.value)} onBlur={() => handleBlur("addressLine1")} error={Boolean(touched.addressLine1 && errors.addressLine1)} autoComplete="address-line1" />
                </FieldWrapper>
                <FieldWrapper label="Address line 2" htmlFor="addressLine2" hint="Apartment, suite, etc. (optional)">
                  <TextInput id="addressLine2" value={form.addressLine2} onChange={(e) => update("addressLine2", e.target.value)} autoComplete="address-line2" />
                </FieldWrapper>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <FieldWrapper label="City" htmlFor="city" error={touched.city ? errors.city : undefined} required>
                    <TextInput id="city" value={form.city} onChange={(e) => update("city", e.target.value)} onBlur={() => handleBlur("city")} error={Boolean(touched.city && errors.city)} autoComplete="address-level2" />
                  </FieldWrapper>
                  <FieldWrapper label="State" htmlFor="state" error={touched.state ? errors.state : undefined} required>
                    <SelectInput id="state" value={form.state} onChange={(e) => update("state", e.target.value)} onBlur={() => handleBlur("state")} error={Boolean(touched.state && errors.state)} autoComplete="address-level1">
                      <option value="">Select</option>
                      {usStates.map((s) => <option key={s} value={s}>{s}</option>)}
                    </SelectInput>
                  </FieldWrapper>
                  <FieldWrapper label="ZIP code" htmlFor="zip" error={touched.zip ? errors.zip : undefined} required>
                    <TextInput id="zip" value={form.zip} onChange={(e) => update("zip", e.target.value)} onBlur={() => handleBlur("zip")} error={Boolean(touched.zip && errors.zip)} inputMode="numeric" autoComplete="postal-code" />
                  </FieldWrapper>
                </div>

                <div className="space-y-3 border-t border-olive/10 pt-5">
                  <CheckboxField
                    id="newsletterConsent"
                    checked={form.newsletterConsent}
                    onChange={(e) => update("newsletterConsent", e.target.checked)}
                    label="Also send me Wildflower Notes, occasional reflections and edition previews by email."
                  />
                  <CheckboxField
                    id="termsConsent"
                    checked={form.termsConsent}
                    onChange={(e) => { update("termsConsent", e.target.checked); setTermsTouched(true); }}
                    label={<>I agree to the <a href="/terms" className="underline">Terms &amp; Conditions</a> and <a href="/privacy" className="underline">Privacy Policy</a>.</>}
                  />
                  {termsError && <p role="alert" className="font-sans text-xs font-medium text-[#8a3b2a]">{termsError}</p>}
                </div>

                <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                  {status === "loading" ? "Redirecting to secure checkout…" : "Continue to Secure Checkout"}
                </Button>
                {status === "error" && (
                  <p role="alert" className="font-sans text-xs font-medium text-[#8a3b2a]">
                    Something went wrong starting checkout. Please try again.
                  </p>
                )}
              </form>

              <aside className="h-fit rounded-sm border border-olive/15 bg-ivory p-6">
                <h2 className="font-serif text-lg font-medium text-olive">Order summary</h2>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-sans text-charcoal/80">{plan.name}</span>
                  <span className="font-sans font-medium text-olive">{plan.displayPrice}</span>
                </div>
                <p className="mt-1 font-sans text-xs text-charcoal/60">{plan.billingCadence} · U.S. shipping included</p>
                <p className="mt-6 font-sans text-xs leading-relaxed text-charcoal/55">
                  Billing (Purchaser) details and payment are entered on Stripe&rsquo;s secure
                  checkout in the next step. Wildflower Mail never stores your full card number.
                </p>
              </aside>
            </div>
          </div>
        </div>

        <div
          className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: isGift ? "1fr" : "0fr" }}
          aria-hidden={!isGift}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-1">
              <GiftForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
