import { AdminShell } from "@/components/admin/AdminShell";
import { listSubscribers } from "@/lib/admin/queries";
import { pricing } from "@/lib/config/site-config";

export default async function AdminSubscribersPage({
  searchParams,
}: {
  searchParams: { search?: string; type?: string };
}) {
  const { isConfigured, rows } = await listSubscribers(searchParams.search, searchParams.type);

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Subscribers</h1>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" method="get">
        <input
          type="search"
          name="search"
          defaultValue={searchParams.search}
          placeholder="Search by customer name or email"
          className="w-full rounded-sm border border-olive/25 bg-paper px-4 py-2 text-sm sm:max-w-xs"
        />
        <select name="type" defaultValue={searchParams.type || ""} className="rounded-sm border border-olive/25 bg-paper px-4 py-2 text-sm">
          <option value="">All membership types</option>
          <option value={pricing.monthlyMembership.id}>Monthly Membership</option>
        </select>
        <button type="submit" className="rounded-sm bg-olive px-4 py-2 text-sm font-medium text-paper">
          Filter
        </button>
      </form>

      {!isConfigured ? (
        <p className="mt-8 text-sm text-charcoal/70">Connect Supabase to see live subscriber data.</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-charcoal/70">No subscribers found.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-sm border border-olive/15 bg-paper">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-olive/10 text-xs uppercase tracking-wide text-olive/70">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Renews / Ends</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: any) => (
                <tr key={r.id} className="border-b border-olive/10 last:border-0">
                  <td className="px-4 py-3">{r.customers?.full_name}</td>
                  <td className="px-4 py-3">{r.customers?.email}</td>
                  <td className="px-4 py-3 capitalize">{r.status}</td>
                  <td className="px-4 py-3">
                    {r.current_period_end ? new Date(r.current_period_end).toLocaleDateString() : "—"}
                    {r.cancel_at_period_end && " (canceling)"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
