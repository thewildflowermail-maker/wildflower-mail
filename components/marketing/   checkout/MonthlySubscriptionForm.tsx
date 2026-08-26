"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  FieldWrapper,
  TextInput,
  SelectInput,
  CheckboxField,
} from "@/components/ui/FormField";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

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
  state: "",
  zip: "",
  newsletterConsent: false,
  termsConsent: false,
};

export function MonthlySubscriptionForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setGeneralError("");
    setErrors({});

    try {
      const res = await fetch("/api/checkout/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "monthly-membership", ...form }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.issues) {
          const flat: Record<string, string> = {};
          for (const key in data.issues) {
            const messages = data.issues[key];
            if (messages?.[0]) flat[key] = messages[0];
          }
          setErrors(flat);
        } else {
          setGeneralError(data.error || "Something went wrong. Please try again.");
        }
        setSubmitting(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setGeneralError("Unable to reach checkout. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 text-left">
      <FieldWrapper label="Full name" htmlFor="fullName" required error={errors.fullName}>
        <TextInput
          id="fullName"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={!!errors.fullName}
        />
      </FieldWrapper>

      <FieldWrapper label="Email" htmlFor="email" required error={errors.email}>
        <TextInput
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={!!errors.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Street address" htmlFor="addressLine1" required error={errors.addressLine1}>
        <TextInput
          id="addressLine1"
          value={form.addressLine1}
          onChange={(e) => update("addressLine1", e.target.value)}
          error={!!errors.addressLine1}
        />
      </FieldWrapper>

      <FieldWrapper label="Apartment, suite, etc. (optional)" htmlFor="addressLine2">
        <TextInput
          id="addressLine2"
          value={form.addressLine2}
          onChange={(e) => update("addressLine2", e.target.value)}
        />
      </FieldWrapper>

      <div className="grid grid-cols-2 gap-4">
        <FieldWrapper label="City" htmlFor="city" required error={errors.city}>
          <TextInput
            id="city"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            error={!!errors.city}
          />
        </FieldWrapper>

        <FieldWrapper label="State" htmlFor="state" required error={errors.state}>
          <SelectInput
            id="state"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            error={!!errors.state}
          >
            <option value="">Select</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      <FieldWrapper label="ZIP code" htmlFor="zip" required error={errors.zip}>
        <TextInput
          id="zip"
          value={form.zip}
          onChange={(e) => update("zip", e.target.value)}
          error={!!errors.zip}
        />
      </FieldWrapper>

      <CheckboxField
        id="newsletterConsent"
        checked={form.newsletterConsent}
        onChange={(e) => update("newsletterConsent", e.target.checked)}
        label="Also send me Wildflower Notes, our occasional newsletter."
      />

      <CheckboxField
        id="termsConsent"
        checked={form.termsConsent}
        onChange={(e) => update("termsConsent", e.target.checked)}
        label="I agree to the Terms & Conditions."
      />
      {errors.termsConsent && (
        <p role="alert" className="text-xs font-medium text-[#8a3b2a]">{errors.termsConsent}</p>
      )}

      {generalError && (
        <p role="alert" className="text-sm font-medium text-[#8a3b2a]">{generalError}</p>
      )}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Redirecting to checkout…" : "Continue to payment"}
      </Button>
    </form>
  );
}
