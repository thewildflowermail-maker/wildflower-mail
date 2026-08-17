import { AdminShell } from "@/components/admin/AdminShell";
import { listRecipientsWithAddresses } from "@/lib/admin/queries";

export default async function AdminRecipientsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const { isConfigured, rows } = await listRecipientsWithAddresses(searchParams.search);

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Recipients &amp; Mailing Addresses</h1>
      <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
        Full shipping addresses are only ever shown here, inside the protected admin dashboard —
        never on public-facing pages, and never visible to a gift purchaser.
      </p>

      <form className="mt-6" method="get">
        <input
          type="search"
          name="search"
          defaultValue={searchParams.search}
          placeholder="Search by recipient name"
          className="w-full max-w-xs rounded-sm border border-olive/25 bg-paper px-4 py-2 text-sm"
        />
      </form>

      {!isConfigured ? (
        <p className="mt-8 text-sm text-charcoal/70">Connect Supabase to see live recipient data.</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-charcoal/70">No recipients found.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-sm border border-olive/15 bg-paper">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-olive/10 text-xs uppercase tracking-wide text-olive/70">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Gift Message</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: any) => {
                const addr = r.shipping_addresses?.[0];
                return (
                  <tr key={r.id} className="border-b border-olive/10 last:border-0 align-top">
                    <td className="px-4 py-3">{r.full_name}</td>
                    <td className="px-4 py-3">{r.is_self ? "Self (member)" : "Gift recipient"}</td>
                    <td className="px-4 py-3">
                      {addr ? `${addr.address_line1}${addr.address_line2 ? ", " + addr.address_line2 : ""}, ${addr.city}, ${addr.state} ${addr.zip}` : "—"}
                    </td>
                    <td className="px-4 py-3">{r.gift_message || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
