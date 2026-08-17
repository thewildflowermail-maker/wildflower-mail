"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  FieldWrapper,
  TextInput,
  TextArea,
  SelectInput,
  CheckboxField,
} from "@/components/ui/FormField";
import { isValidEmail, isValidZip } from "@/lib/utils/format";
import { pricing } from "@/lib/config/site-config";

type FormState = {
  duration: "gift-three-month" | "gift-six-month";
  recipientName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  purchaserName: string;
  purchaserEmail: string;
  giftMessage: string;
  startingMonth: string;
  revealSender: "reveal" | "anonymous";
  announcementPreference: "email-now" | "letter-first";
  consent: boolean;
};

const initialState: FormState = {
  duration: "gift-three-month",
  recipientName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  purchaserName: "",
  purchaserEmail: "",
  giftMessage: "",
  startingMonth: "",
  revealSender: "reveal",
  announcementPreference: "letter-first",
  consent: false,
};

const usStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

export function GiftForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.recipientName.trim()) next.recipientName = "Please enter the recipient's full name.";
    if (!form.addressLine1.trim()) next.addressLine1 = "Please enter a street address.";
    if (!form.city.trim()) next.city = "Please enter a city.";
    if (!form.state.trim()) next.state = "Please select a state.";
    if (!isValidZip(form.zip)) next.zip = "Please enter a valid 5-digit ZIP code.";
    if (!form.purchaserName.trim()) next.purchaserName = "Please enter your full name.";
    if (!isValidEmail(form.purchaserEmail)) next.purchaserEmail = "Please enter a valid email address.";
    if (form.giftMessage.length > 500) next.giftMessage = "Gift messages must be 500 characters or fewer.";
    if (!form.startingMonth) next.startingMonth = "Please select a starting month.";
    if (!form.consent) next.consent = "Please confirm the recipient's shipping details are correct.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("checkout failed");
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12">
      {/* Step 1 */}
      <fieldset>
        <legend className="font-serif text-xl font-medium text-olive">Step 1 — Select three or six months</legend>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(["gift-three-month", "gift-six-month"] as const).map((key) => {
            const plan = key === "gift-three-month" ? pricing.giftThreeMonth : pricing.giftSixMonth;
            const selected = form.duration === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => update("duration", key)}
                aria-pressed={selected}
                className={`rounded-sm border p-5 text-left transition-colors duration-250 ${
                  selected ? "border-olive bg-olive text-paper" : "border-olive/20 bg-paper text-charcoal hover:border-olive/50"
                }`}
              >
                <p className="font-serif text-lg font-medium">{plan.name}</p>
                <p className={`mt-1 text-sm ${selected ? "text-paper/80" : "text-charcoal/70"}`}>
                  {plan.displayPrice} · {plan.billingCadence}
                </p>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Step 2 */}
      <fieldset className="space-y-5">
        <legend className="font-serif text-xl font-medium text-olive">Step 2 — Recipient's details</legend>
        <FieldWrapper label="Recipient's full name" htmlFor="recipientName" error={errors.recipientName} required>
          <TextInput id="recipientName" value={form.recipientName} onChange={(e) => update("recipientName", e.target.value)} error={Boolean(errors.recipientName)} />
        </FieldWrapper>
        <FieldWrapper label="Address line 1" htmlFor="addressLine1" error={errors.addressLine1} required>
          <TextInput id="addressLine1" value={form.addressLine1} onChange={(e) => update("addressLine1", e.target.value)} error={Boolean(errors.addressLine1)} />
        </FieldWrapper>
        <FieldWrapper label="Address line 2" htmlFor="addressLine2" hint="Apartment, suite, etc. (optional)">
          <TextInput id="addressLine2" value={form.addressLine2} onChange={(e) => update("addressLine2", e.target.value)} />
        </FieldWrapper>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <FieldWrapper label="City" htmlFor="city" error={errors.city} required>
            <TextInput id="city" value={form.city} onChange={(e) => update("city", e.target.value)} error={Boolean(errors.city)} />
          </FieldWrapper>
          <FieldWrapper label="State" htmlFor="state" error={errors.state} required>
            <SelectInput id="state" value={form.state} onChange={(e) => update("state", e.target.value)} error={Boolean(errors.state)}>
              <option value="">Select</option>
              {usStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </SelectInput>
          </FieldWrapper>
          <FieldWrapper label="ZIP code" htmlFor="zip" error={errors.zip} required>
            <TextInput id="zip" value={form.zip} onChange={(e) => update("zip", e.target.value)} error={Boolean(errors.zip)} inputMode="numeric" />
          </FieldWrapper>
        </div>
        <p className="text-xs text-charcoal/55">Wildflower Mail currently ships to addresses within the United States.</p>
      </fieldset>

      {/* Step 3 */}
      <fieldset className="space-y-5">
        <legend className="font-serif text-xl font-medium text-olive">Step 3 — Your personal message</legend>
        <FieldWrapper label="Your full name" htmlFor="purchaserName" error={errors.purchaserName} required>
          <TextInput id="purchaserName" value={form.purchaserName} onChange={(e) => update("purchaserName", e.target.value)} error={Boolean(errors.purchaserName)} />
        </FieldWrapper>
        <FieldWrapper label="Your email address" htmlFor="purchaserEmail" error={errors.purchaserEmail} required hint="For your order confirmation and receipt.">
          <TextInput id="purchaserEmail" type="email" value={form.purchaserEmail} onChange={(e) => update("purchaserEmail", e.target.value)} error={Boolean(errors.purchaserEmail)} />
        </FieldWrapper>
        <FieldWrapper label="Gift message (optional)" htmlFor="giftMessage" error={errors.giftMessage} hint={`${form.giftMessage.length}/500 characters`}>
          <TextArea id="giftMessage" value={form.giftMessage} onChange={(e) => update("giftMessage", e.target.value)} error={Boolean(errors.giftMessage)} maxLength={500} />
        </FieldWrapper>
        <fieldset>
          <legend className="text-sm font-medium text-charcoal">Should the recipient know it's from you?</legend>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-6">
            <label className="flex items-center gap-2 text-sm text-charcoal/85">
              <input type="radio" name="reveal" checked={form.revealSender === "reveal"} onChange={() => update("revealSender", "reveal")} className="h-4 w-4 text-olive" />
              Reveal my name
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal/85">
              <input type="radio" name="reveal" checked={form.revealSender === "anonymous"} onChange={() => update("revealSender", "anonymous")} className="h-4 w-4 text-olive" />
              Remain anonymous
            </label>
          </div>
        </fieldset>
      </fieldset>

      {/* Step 4 */}
      <fieldset className="space-y-5">
        <legend className="font-serif text-xl font-medium text-olive">Step 4 — Starting month</legend>
        <FieldWrapper label="First-delivery month" htmlFor="startingMonth" error={errors.startingMonth} required>
          <SelectInput id="startingMonth" value={form.startingMonth} onChange={(e) => update("startingMonth", e.target.value)} error={Boolean(errors.startingMonth)}>
            <option value="">Select a starting month</option>
            {Array.from({ length: 6 }).map((_, i) => {
              const d = new Date();
              d.setMonth(d.getMonth() + i);
              const label = d.toLocaleString("en-US", { month: "long", year: "numeric" });
              return <option key={label} value={label}>{label}</option>;
            })}
          </SelectInput>
        </FieldWrapper>

        <fieldset>
          <legend className="text-sm font-medium text-charcoal">How should the recipient learn about this gift?</legend>
          <div className="mt-2 flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-charcoal/85">
              <input type="radio" name="announcement" checked={form.announcementPreference === "letter-first"} onChange={() => update("announcementPreference", "letter-first")} className="h-4 w-4 text-olive" />
              Let the physical letter be the first surprise
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal/85">
              <input type="radio" name="announcement" checked={form.announcementPreference === "email-now"} onChange={() => update("announcementPreference", "email-now")} className="h-4 w-4 text-olive" />
              Send a digital gift announcement by email right away
            </label>
          </div>
        </fieldset>
      </fieldset>

      {/* Step 5 & 6 */}
      <fieldset className="space-y-5 border-t border-olive/10 pt-8">
        <legend className="font-serif text-xl font-medium text-olive">Step 5 — Review &amp; pay securely</legend>
        <CheckboxField
          id="consent"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          label="I confirm the recipient's shipping details above are correct."
        />
        {errors.consent && <p role="alert" className="text-xs font-medium text-[#8a3b2a]">{errors.consent}</p>}
        <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? "Redirecting to secure checkout…" : "Continue to Secure Checkout"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-xs font-medium text-[#8a3b2a]">
            Something went wrong starting checkout. Please try again.
          </p>
        )}
        <p className="text-xs text-charcoal/55">
          Step 6 — After payment, you'll receive an emailed confirmation, and the recipient will
          receive theirs according to the preference selected above.
        </p>
      </fieldset>
    </form>
  );
}
