import { AdminShell } from "@/components/admin/AdminShell";
import { EditionForm } from "@/components/admin/EditionForm";
import { EditionStatusButtons } from "@/components/admin/EditionStatusButtons";
import { listEditions } from "@/lib/admin/queries";

export default async function AdminEditionsPage() {
  const { isConfigured, rows } = await listEditions();

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl font-medium text-olive">Monthly Editions</h1>
      <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
        Create each month's edition here, then mark it prepared and mailed as fulfillment
        progresses. Add cover images and playlist links directly in Supabase for now (see README)
        — image/playlist upload UI can be added here later.
      </p>

      <div className="mt-6">
        <EditionForm />
      </div>

      {!isConfigured ? (
        <p className="mt-8 text-sm text-charcoal/70">Connect Supabase to manage editions.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {rows.map((edition: any) => (
            <div key={edition.id} className="flex flex-col justify-between gap-4 rounded-sm border border-olive/15 bg-paper p-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-serif text-lg font-medium text-olive">{edition.name}</p>
                <p className="font-sans text-sm text-charcoal/70">{edition.month_year}</p>
              </div>
              {/* The status badge + shipping copy now live inside
                  EditionStatusButtons itself, so the raw "status: draft"
                  text above has been removed in favor of the styled
                  indicator. */}
              <EditionStatusButtons id={edition.id} status={edition.status} mailingDate={edition.mailing_date} />
            </div>
          ))}
          {rows.length === 0 && <p className="text-sm text-charcoal/60">No editions created yet.</p>}
        </div>
      )}
    </AdminShell>
  );
}
