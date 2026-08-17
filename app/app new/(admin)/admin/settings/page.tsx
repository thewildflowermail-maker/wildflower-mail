import { AdminShell } from "@/components/admin/AdminShell";
import { pricing, operations, currentPlaylist } from "@/lib/config/site-config";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Settings</h1>
      <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
        For the MVP, prices, operational dates, and the current playlist are edited in a single
        code file rather than this page, so they can be changed with a very small, low-risk
        edit and no database migration. This screen shows the current values for reference.
      </p>
      <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
        File to edit: <code className="rounded-sm bg-charcoal/10 px-1.5 py-0.5">lib/config/site-config.ts</code>
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-sm border border-olive/15 bg-paper p-6">
          <h2 className="font-serif text-lg font-medium text-olive">Pricing</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Monthly Membership</dt><dd>{pricing.monthlyMembership.displayPrice}</dd></div>
            <div className="flex justify-between"><dt>Three-Month Gift</dt><dd>{pricing.giftThreeMonth.displayPrice}</dd></div>
            <div className="flex justify-between"><dt>Six-Month Gift</dt><dd>{pricing.giftSixMonth.displayPrice}</dd></div>
          </dl>
        </div>
        <div className="rounded-sm border border-olive/15 bg-paper p-6">
          <h2 className="font-serif text-lg font-medium text-olive">Operational dates</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt>Order cutoff</dt><dd className="text-right">{operations.orderCutoffDay}</dd></div>
            <div className="flex justify-between gap-4"><dt>Mailing date</dt><dd className="text-right">{operations.mailingDay}</dd></div>
            <div className="flex justify-between gap-4"><dt>Delivery window</dt><dd className="text-right">{operations.domesticDeliveryWindow}</dd></div>
            <div className="flex justify-between gap-4"><dt>Address change deadline</dt><dd className="text-right">{operations.addressChangeDeadline}</dd></div>
            <div className="flex justify-between gap-4"><dt>Cancellation deadline</dt><dd className="text-right">{operations.cancellationDeadline}</dd></div>
          </dl>
        </div>
        <div className="rounded-sm border border-olive/15 bg-paper p-6 sm:col-span-2">
          <h2 className="font-serif text-lg font-medium text-olive">Current playlist</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt>Title</dt><dd className="text-right">{currentPlaylist.title}</dd></div>
            <div className="flex justify-between gap-4"><dt>Spotify link</dt><dd className="text-right break-all">{currentPlaylist.spotifyUrl}</dd></div>
            <div className="flex justify-between gap-4"><dt>QR image path</dt><dd className="text-right">{currentPlaylist.qrImagePath}</dd></div>
          </dl>
        </div>
      </div>
    </AdminShell>
  );
}
