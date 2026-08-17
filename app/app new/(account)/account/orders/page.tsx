import { AccountShell } from "@/components/account/AccountShell";
import { getCurrentCustomer, getCustomerOrders } from "@/lib/account/queries";

export const runtime = 'edge';

export default async function AccountOrdersPage() {
  const { customer } = await getCurrentCustomer();
  const orders = customer ? await getCustomerOrders(customer.id) : [];

  return (
    <AccountShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Order history</h1>
      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-charcoal/70">No orders yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {orders.map((o: any) => (
            <div key={o.id} className="flex items-center justify-between rounded-sm border border-olive/15 bg-paper p-4 text-sm">
              <div>
                <p className="font-medium text-olive">{o.product_id}</p>
                <p className="text-charcoal/60">{new Date(o.created_at).toLocaleDateString()}</p>
              </div>
              <span className="rounded-sm bg-sage/20 px-3 py-1 text-xs font-medium capitalize text-olive">{o.status}</span>
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  );
}
