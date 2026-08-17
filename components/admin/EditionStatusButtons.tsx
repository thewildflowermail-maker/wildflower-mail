"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Friendlier, member-facing wording for each `monthly_editions.status`
 * value (schema: `status text check (status in ('draft','prepared',
 * 'mailed'))`, see supabase/migrations/0001_init.sql). "Draft" doesn't get
 * a badge here — an edition isn't visible/relevant to shipping until it's
 * at least being prepared.
 *
 * Note on scope: this table has no `mailed_at` timestamp and no
 * "delivered" state — those live per-recipient on `mailing_batches`
 * (which does have `mailed_at` + `tracking_number`), not on the edition
 * itself. Showing a real "Shipped on [Date]" / "Delivered" per member
 * would mean reading from `mailing_batches` instead — worth a follow-up if
 * per-recipient tracking should surface here too. This component sticks to
 * what `monthly_editions.status` actually represents (the batch-level
 * production/fulfillment stage), just labeled clearly.
 */
const STATUS_LABEL: Record<string, { label: string; dot: string }> = {
  draft: { label: "Draft", dot: "bg-charcoal/30" },
  prepared: { label: "Preparing for Dispatch", dot: "bg-gold" },
  mailed: { label: "Shipped", dot: "bg-olive" },
};

export function EditionStatusButtons({
  id,
  status,
  mailingDate,
}: {
  id: string;
  status: string;
  /** Planned/actual mailing date (`monthly_editions.mailing_date`), if set. */
  mailingDate?: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function setStatus(next: string) {
    setLoading(next);
    setError(null);
    try {
      const res = await fetch("/api/admin/editions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!res.ok) throw new Error("Update failed");
      router.refresh();
    } catch {
      setError("Couldn't update this edition's status. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  const current = STATUS_LABEL[status] ?? { label: status, dot: "bg-charcoal/30" };
  const shippedCopy = status === "mailed" && mailingDate
    ? `Shipped on ${new Date(mailingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
    : current.label;

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <span
        className="flex items-center gap-1.5 rounded-full border border-olive/15 bg-ivory px-2.5 py-1 font-sans text-xs font-medium text-charcoal"
        role="status"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} aria-hidden="true" />
        {shippedCopy}
      </span>

      <div className="flex gap-2">
        {status !== "prepared" && status !== "mailed" && (
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => setStatus("prepared")}
            className="rounded-sm border border-olive/30 px-3 py-1 font-sans text-xs font-medium text-olive transition-colors duration-150 hover:bg-ivory disabled:opacity-50"
          >
            {loading === "prepared" ? "Updating…" : "Mark Preparing for Dispatch"}
          </button>
        )}
        {status !== "mailed" && (
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => setStatus("mailed")}
            className="rounded-sm bg-olive px-3 py-1 font-sans text-xs font-medium text-paper transition-colors duration-150 hover:bg-charcoal disabled:opacity-50"
          >
            {loading === "mailed" ? "Updating…" : "Mark as Shipped"}
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="font-sans text-xs font-medium text-[#8a3b2a]">
          {error}
        </p>
      )}
    </div>
  );
}
