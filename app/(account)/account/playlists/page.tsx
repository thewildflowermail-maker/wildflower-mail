import { AccountShell } from "@/components/account/AccountShell";
import { getCurrentCustomer, getCustomerSubscription, getRecipientPlaylists } from "@/lib/account/queries";

export default async function AccountPlaylistsPage() {
  const { customer } = await getCurrentCustomer();
  const subscription = customer ? await getCustomerSubscription(customer.id) : null;
  const playlists = subscription?.recipient_id ? await getRecipientPlaylists(subscription.recipient_id) : [];

  return (
    <AccountShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Your playlists</h1>
      <p className="mt-2 max-w-xl text-sm text-charcoal/70">
        Every playlist linked to an edition you've received, all in one place.
      </p>
      {playlists.length === 0 ? (
        <p className="mt-6 text-sm text-charcoal/70">Playlists will appear here once your first edition has been mailed.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {playlists.map((p: any, i: number) => (
            <div key={i} className="flex items-center justify-between rounded-sm border border-olive/15 bg-paper p-4 text-sm">
              <div>
                <p className="font-medium text-olive">{p.monthly_editions?.name}</p>
                <p className="text-charcoal/60">{p.monthly_editions?.month_year}</p>
              </div>
              {p.monthly_editions?.playlist_links?.[0]?.spotify_url && (
                <a href={p.monthly_editions.playlist_links[0].spotify_url} className="text-olive underline underline-offset-4 hover:text-clay">
                  Listen ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  );
}
