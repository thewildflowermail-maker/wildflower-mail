"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, SelectInput } from "@/components/ui/FormField";
import { isValidZip } from "@/lib/utils/format";

const usStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

type AddressFields = "addressLine1" | "addressLine2" | "city" | "state" | "zip";

/**
 * Field-level validation, shared between onBlur (real-time) and onSubmit
 * (final catch-all for fields the user never blurred). Address line 2 is
 * optional so it never produces an error.
 */
function getFieldError(key: AddressFields, value: string): string | undefined {
  switch (key) {
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

export function AddressForm({ current }: { current?: { addressLine1?: string; addressLine2?: string; city?: string; state?: string; zip?: string } }) {
  const [form, setForm] = useState({
    addressLine1: current?.addressLine1 || "",
    addressLine2: current?.addressLine2 || "",
    city: current?.city || "",
    state: current?.state || "",
    zip: current?.zip || "",
  });
  const [errors, setErrors] = useState<Partial<Record<AddressFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<AddressFields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(key: AddressFields, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    // Real-time validation: once a field has been touched (blurred at
    // least once), keep re-checking it on every keystroke so the error
    // clears the moment it's fixed, instead of waiting for the next blur.
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: getFieldError(key, value) }));
    }
  }

  function handleBlur(key: AddressFields) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: getFieldError(key, form[key]) }));
  }

  function validate() {
    const next: Partial<Record<AddressFields, string>> = {};
    (["addressLine1", "city", "state", "zip"] as const).forEach((key) => {
      const error = getFieldError(key, form[key]);
      if (error) next[key] = error;
    });
    setErrors(next);
    setTouched({ addressLine1: true, city: true, state: true, zip: true });
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    const res = await fetch("/api/account/address", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Shipping vs. billing — this account only ever collects a mailing
          address (where physical editions are delivered). Payment/billing
          details are entered and stored securely by Stripe at checkout, so
          rather than duplicate a billing-address form we never actually
          use, we label this clearly and point to where billing lives. */}
      <div>
        <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-charcoal">
          Shipping Address <span className="font-normal normal-case text-charcoal/50">(Recipient)</span>
        </h3>
        <p className="mt-1 font-sans text-xs text-charcoal/60">
          This is where your Wildflower Mail is delivered each month. Billing and payment
          details are managed securely by Stripe from your{" "}
          <a href="/account" className="underline underline-offset-2 hover:text-clay">
            account overview
          </a>
          , not stored here.
        </p>
      </div>

      <FieldWrapper label="Street address" htmlFor="addr1" error={touched.addressLine1 ? errors.addressLine1 : undefined} required>
        <TextInput
          id="addr1"
          value={form.addressLine1}
          onChange={(e) => update("addressLine1", e.target.value)}
          onBlur={() => handleBlur("addressLine1")}
          error={Boolean(touched.addressLine1 && errors.addressLine1)}
          autoComplete="address-line1"
        />
      </FieldWrapper>
      <FieldWrapper label="Address line 2" htmlFor="addr2" hint="Apartment, suite, etc. (optional)">
        <TextInput id="addr2" value={form.addressLine2} onChange={(e) => update("addressLine2", e.target.value)} autoComplete="address-line2" />
      </FieldWrapper>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FieldWrapper label="City" htmlFor="city" error={touched.city ? errors.city : undefined} required>
          <TextInput
            id="city"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            error={Boolean(touched.city && errors.city)}
            autoComplete="address-level2"
          />
        </FieldWrapper>
        <FieldWrapper label="State" htmlFor="state" error={touched.state ? errors.state : undefined} required>
          <SelectInput
            id="state"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            onBlur={() => handleBlur("state")}
            error={Boolean(touched.state && errors.state)}
            autoComplete="address-level1"
          >
            <option value="">Select</option>
            {usStates.map((s) => <option key={s} value={s}>{s}</option>)}
          </SelectInput>
        </FieldWrapper>
        <FieldWrapper label="ZIP code" htmlFor="zip" error={touched.zip ? errors.zip : undefined} required>
          <TextInput
            id="zip"
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
            onBlur={() => handleBlur("zip")}
            error={Boolean(touched.zip && errors.zip)}
            inputMode="numeric"
            autoComplete="postal-code"
          />
        </FieldWrapper>
      </div>
      <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Saving…" : "Save Address"}</Button>
      {status === "success" && <p role="status" className="font-sans text-sm font-medium text-olive">Address updated. A confirmation email is on its way.</p>}
      {status === "error" && <p role="alert" className="font-sans text-xs font-medium text-[#8a3b2a]">Something went wrong. Please try again.</p>}
    </form>
  );
}
