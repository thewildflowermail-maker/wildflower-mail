import { AccountShell } from "@/components/account/AccountShell";
import { AddressForm } from "@/components/account/AddressForm";
import { getCurrentCustomer, getCustomerSubscription } from "@/lib/account/queries";
import { operations } from "@/lib/config/site-config";

export default async function AccountAddressPage() {
  const { customer } = await getCurrentCustomer();
  const subscription = customer ? await getCustomerSubscription(customer.id) : null;
  const currentAddress = subscription?.recipients?.shipping_addresses?.find((a: any) => a.is_current) || subscription?.recipients?.shipping_addresses?.[0];

  return (
    <AccountShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Shipping address</h1>
      <p className="mt-2 max-w-xl text-sm text-charcoal/70">
        Address changes made after {operations.addressChangeDeadline} may not be reflected until
        the following month's mailing.
      </p>
      <div className="mt-6 max-w-xl">
        <AddressForm
          current={
            currentAddress && {
              addressLine1: currentAddress.address_line1,
              addressLine2: currentAddress.address_line2,
              city: currentAddress.city,
              state: currentAddress.state,
              zip: currentAddress.zip,
            }
          }
        />
      </div>
    </AccountShell>
  );
}
