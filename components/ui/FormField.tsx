import { cn } from "@/lib/utils/format";

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
};

export function FieldWrapper({ label, htmlFor, error, hint, required, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-sans text-sm font-medium text-charcoal">
        {label} {required && <span aria-hidden="true" className="text-clay">*</span>}
      </label>
      {children}
      {hint && !error && <p className="font-sans text-xs text-muted-aaa">{hint}</p>}
      {error && (
        <p role="alert" className="flex items-center gap-1.5 font-sans text-xs font-medium text-[#8a3b2a]">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10 6v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="10" cy="13.6" r="0.9" fill="currentColor" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// Sans-serif everywhere in transactional UI (forms, labels, prices, order
// data) — the site's decorative serif/script fonts are reserved for
// editorial headings and accent quotes, per the typography pass. `text-sm`
// + text-charcoal on bg-paper (#FCFAF5) comfortably clears 4.5:1 contrast.
const controlBase =
  "w-full rounded-sm border bg-paper px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/40 focus-visible:outline-2 focus-visible:outline-olive min-h-[44px] transition-colors duration-150";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
) {
  const { error, className, ...rest } = props;
  return (
    <input
      className={cn(controlBase, error ? "border-[#8a3b2a]" : "border-olive/25", className)}
      {...rest}
    />
  );
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
) {
  const { error, className, ...rest } = props;
  return (
    <textarea
      className={cn(controlBase, "min-h-[120px]", error ? "border-[#8a3b2a]" : "border-olive/25", className)}
      {...rest}
    />
  );
}

export function SelectInput(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }
) {
  const { error, className, children, ...rest } = props;
  return (
    <select
      className={cn(controlBase, error ? "border-[#8a3b2a]" : "border-olive/25", className)}
      {...rest}
    >
      {children}
    </select>
  );
}

export function CheckboxField({
  id,
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        className="mt-1 h-5 w-5 shrink-0 rounded-sm border border-olive/40 text-olive focus-visible:outline-2 focus-visible:outline-olive"
        {...rest}
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-charcoal/85">
        {label}
      </label>
    </div>
  );
}

/**
 * An accessible on/off switch (role="switch") for binary choices that take
 * effect immediately in the UI — e.g. "Is this a gift?" revealing a
 * different set of fields below. Distinct from CheckboxField, which is for
 * consent/agreement checkboxes inside a form submission.
 *
 * Sans-serif, high-contrast label text per the account/checkout typography
 * pass — transactional UI never uses the decorative serif/script fonts.
 */
export function ToggleSwitch({
  id,
  checked,
  onChange,
  label,
  hint,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="cursor-pointer font-sans text-sm font-medium text-charcoal">
          {label}
        </label>
        {hint && <p className="mt-0.5 font-sans text-xs text-muted-aaa">{hint}</p>}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry",
          checked ? "border-raspberry bg-raspberry" : "border-charcoal/25 bg-charcoal/10"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-paper shadow transition-transform duration-250",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
        <span className="sr-only">{checked ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
