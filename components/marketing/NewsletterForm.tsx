"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput } from "@/components/ui/FormField";
import { isValidEmail } from "@/lib/utils/format";

export function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!firstName.trim()) nextErrors.firstName = "Please share your first name.";
    if (!isValidEmail(email)) nextErrors.email = "Please enter a valid email address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-olive" role="status">
        Thank you — Wildflower Notes will find its way to your inbox soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="flex-1">
        <FieldWrapper label="First name" htmlFor="newsletter-first-name" error={errors.firstName} required>
          <TextInput
            id="newsletter-first-name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={Boolean(errors.firstName)}
            autoComplete="given-name"
          />
        </FieldWrapper>
      </div>
      <div className="flex-1">
        <FieldWrapper label="Email address" htmlFor="newsletter-email" error={errors.email} required>
          <TextInput
            id="newsletter-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            autoComplete="email"
          />
        </FieldWrapper>
      </div>
      <div className="sm:pt-7">
        <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? "Sending…" : "Send Me Wildflower Notes"}
        </Button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-xs font-medium text-[#8a3b2a]">
          Something went wrong. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
