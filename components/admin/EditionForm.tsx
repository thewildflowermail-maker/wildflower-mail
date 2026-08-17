"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, TextArea } from "@/components/ui/FormField";

export function EditionForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", monthYear: "", themeDescription: "", orderCutoffDate: "", mailingDate: "" });
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/editions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ name: "", monthYear: "", themeDescription: "", orderCutoffDate: "", mailingDate: "" });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-sm border border-olive/15 bg-paper p-6 sm:grid-cols-2">
      <FieldWrapper label="Edition name" htmlFor="edition-name" required>
        <TextInput id="edition-name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
      </FieldWrapper>
      <FieldWrapper label="Month / Year" htmlFor="edition-month" required hint="e.g. September 2026">
        <TextInput id="edition-month" value={form.monthYear} onChange={(e) => update("monthYear", e.target.value)} required />
      </FieldWrapper>
      <FieldWrapper label="Order cutoff date" htmlFor="edition-cutoff">
        <TextInput id="edition-cutoff" type="date" value={form.orderCutoffDate} onChange={(e) => update("orderCutoffDate", e.target.value)} />
      </FieldWrapper>
      <FieldWrapper label="Mailing date" htmlFor="edition-mailing">
        <TextInput id="edition-mailing" type="date" value={form.mailingDate} onChange={(e) => update("mailingDate", e.target.value)} />
      </FieldWrapper>
      <div className="sm:col-span-2">
        <FieldWrapper label="Theme description" htmlFor="edition-theme">
          <TextArea id="edition-theme" value={form.themeDescription} onChange={(e) => update("themeDescription", e.target.value)} />
        </FieldWrapper>
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={loading}>{loading ? "Saving…" : "Create Edition"}</Button>
      </div>
    </form>
  );
}
