import { AdminShell } from "@/components/admin/AdminShell";
import { getDashboardCounts } from "@/lib/admin/queries";

export default async function AdminOverviewPage() {
  const counts = await getDashboardCounts();

  const cards = [
    { label: "Active monthly subscribers", value: counts.subscribers },
    { label: "Active gift subscriptions", value: counts.giftSubscriptions },
    { label: "Failed payments", value: counts.failedPayments },
    { label: "Canceled subscriptions", value: counts.canceledSubscriptions },
  ];

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Overview</h1>

      {!counts.isConfigured && (
        <div className="mt-4 rounded-sm border border-clay/30 bg-rose/10 p-4 text-sm text-charcoal/85">
          Supabase is not yet configured (see .env.example). These numbers will populate once
          NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set and the schema in
          supabase/migrations/0001_init.sql has been run.
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-sm border border-olive/15 bg-paper p-6">
            <p className="font-serif text-3xl font-medium text-olive">{c.value}</p>
            <p className="mt-1 text-sm text-charcoal/70">{c.label}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
