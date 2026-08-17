import { AccountShell } from "@/components/account/AccountShell";
import { getCurrentCustomer, getCustomerSubscription, getCustomerGiftSubscriptions } from "@/lib/account/queries";
import { CancelMembershipButton } from "@/components/account/CancelMembershipButton";
import { BillingPortalButton } from "@/components/account/BillingPortalButton";

export default async function AccountOverviewPage() {
  const { customer } = await getCurrentCustomer();
  if (!customer) {
    return (
      <AccountShell>
        <p className="text-sm text-charcoal/70">
          We couldn't find a Wildflower Mail order linked to this email yet. If you just
          subscribed, please allow a moment, or contact support.
        </p>
      </AccountShell>
    );
  }

  const subscription = await getCustomerSubscription(customer.id);
  const giftSubscriptions = await getCustomerGiftSubscriptions(customer.id);

  return (
    <AccountShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Your membership</h1>

      {subscription ? (
        <div className="mt-6 rounded-sm border border-olive/15 bg-paper p-6">
          <p className="text-sm text-charcoal/70">Status</p>
          <p className="font-serif text-xl font-medium text-olive capitalize">
            {subscription.status}
            {subscription.cancel_at_period_end && " (ending after current period)"}
          </p>
          {subscription.current_period_end && (
            <p className="mt-2 text-sm text-charcoal/70">
              Next expected mailing month reflects your current billing period, ending{" "}
              {new Date(subscription.current_period_end).toLocaleDateString()}.
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <BillingPortalButton />
            {!subscription.cancel_at_period_end && <CancelMembershipButton />}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-charcoal/70">You don't have an active monthly membership.</p>
      )}

      {giftSubscriptions.length > 0 && (
        <>
          <h2 className="mt-10 font-serif text-xl font-medium text-olive">Gifts you've sent</h2>
          <div className="mt-4 space-y-3">
            {giftSubscriptions.map((g: any) => (
              <div key={g.id} className="rounded-sm border border-olive/15 bg-paper p-4 text-sm">
                <p className="font-medium text-olive">To: {g.recipients?.full_name}</p>
                <p className="text-charcoal/70">
                  {g.editions_sent} of {g.editions_total} editions sent · starting {g.starting_month}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </AccountShell>
  );
}
