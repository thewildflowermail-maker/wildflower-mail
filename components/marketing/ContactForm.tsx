"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, TextArea, SelectInput } from "@/components/ui/FormField";
import { isValidEmail } from "@/lib/utils/format";

const topics = [
  "Existing subscription",
  "Gift order",
  "Address change",
  "Missing or damaged mail",
  "Collaboration",
  "Press",
  "General question",
];

type FormState = {
  name: string;
  email: string;
  orderNumber: string;
  topic: string;
  subject: string;
  message: string;
};

const initial: FormState = { name: "", email: "", orderNumber: "", topic: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!isValidEmail(form.email)) next.email = "Please enter a valid email address.";
    if (!form.topic) next.topic = "Please choose a topic.";
    if (!form.subject.trim()) next.subject = "Please add a short subject.";
    if (!form.message.trim()) next.message = "Please add a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-base font-medium text-charcoal">
        Thank you for reaching out — we've received your message and will reply by email soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Name" htmlFor="contact-name" error={errors.name} required>
          <TextInput id="contact-name" value={form.name} onChange={(e) => update("name", e.target.value)} error={Boolean(errors.name)} />
        </FieldWrapper>
        <FieldWrapper label="Email" htmlFor="contact-email" error={errors.email} required>
          <TextInput id="contact-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} error={Boolean(errors.email)} />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Order number" htmlFor="contact-order" hint="Optional — helps us find your order faster.">
        <TextInput id="contact-order" value={form.orderNumber} onChange={(e) => update("orderNumber", e.target.value)} />
      </FieldWrapper>

      <FieldWrapper label="Topic" htmlFor="contact-topic" error={errors.topic} required>
        <SelectInput id="contact-topic" value={form.topic} onChange={(e) => update("topic", e.target.value)} error={Boolean(errors.topic)}>
          <option value="">Select a topic</option>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </SelectInput>
      </FieldWrapper>

      <FieldWrapper label="Subject" htmlFor="contact-subject" error={errors.subject} required>
        <TextInput id="contact-subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} error={Boolean(errors.subject)} />
      </FieldWrapper>

      <FieldWrapper label="Message" htmlFor="contact-message" error={errors.message} required>
        <TextArea id="contact-message" value={form.message} onChange={(e) => update("message", e.target.value)} error={Boolean(errors.message)} />
      </FieldWrapper>

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-xs font-medium text-[#8a3b2a]">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
