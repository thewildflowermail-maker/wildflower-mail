import { AdminShell } from "@/components/admin/AdminShell";
import { listEditions, listFailedPayments } from "@/lib/admin/queries";

export default async function AdminMailingPage() {
  const { rows: editions } = await listEditions();
  const { rows: failedPayments } = await listFailedPayments();

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Mailing &amp; CSV Export</h1>
      <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
        Export the current mailing list for label printing or a shipping tool. The CSV includes
        recipient name, full address, subscription/gift type, gift message, and mailing status —
        avoid sharing this file outside of fulfillment.
      </p>

      <div className="mt-6 space-y-3">
        {editions.map((e: any) => (
          <div key={e.id} className="flex flex-col justify-between gap-3 rounded-sm border border-olive/15 bg-paper p-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif text-lg font-medium text-olive">{e.name}</p>
              <p className="text-sm text-charcoal/70">{e.month_year}</p>
            </div>
            <a
              href={`/api/admin/mailing-list?edition=${e.id}`}
              className="inline-flex items-center justify-center rounded-sm bg-olive px-4 py-2 text-sm font-medium text-paper hover:bg-charcoal"
            >
              Export CSV
            </a>
          </div>
        ))}
        {editions.length === 0 && (
          <p className="text-sm text-charcoal/60">
            No editions yet — create one on the Monthly Editions page first.
          </p>
        )}
        <a
          href="/api/admin/mailing-list"
          className="inline-block text-sm font-medium text-olive underline underline-offset-4 hover:text-clay"
        >
          Or export the full mailing list across all editions →
        </a>
      </div>

      <h2 className="mt-12 font-serif text-xl font-medium text-olive">Failed payments</h2>
      <div className="mt-4 space-y-2">
        {failedPayments.length === 0 && <p className="text-sm text-charcoal/60">No failed payments.</p>}
        {failedPayments.map((p: any) => (
          <div key={p.id} className="rounded-sm border border-rose/30 bg-rose/5 p-4 text-sm">
            <p className="text-charcoal/85">${(p.amount_cents / 100).toFixed(2)} — {p.failure_reason || "Unknown reason"}</p>
            <p className="text-xs text-charcoal/55">{new Date(p.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
