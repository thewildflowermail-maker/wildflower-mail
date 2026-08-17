"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Action = "pause" | "skip" | "cancel";
type ActionResult = { action: Action; message: string } | null;

const ENDPOINTS: Record<Action, string> = {
  pause: "/api/account/pause",
  skip: "/api/account/skip-next",
  cancel: "/api/account/cancel",
};

/**
 * Opens into a soft confirmation panel that leads with the two reversible
 * alternatives — Pause and Skip Next Edition — before full cancellation,
 * per the "membership transparency" brief: give members an easy way to
 * step back without losing the relationship entirely.
 */
export function CancelMembershipButton() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState<Action | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ActionResult>(null);

  async function handleAction(action: Action) {
    setLoading(action);
    setError(null);
    try {
      const res = await fetch(ENDPOINTS[action], { method: "POST" });
      if (!res.ok) throw new Error("Request failed");
      setResult({
        action,
        message:
          action === "pause"
            ? "Your membership is paused. You won't be charged or mailed anything until you resume."
            : action === "skip"
              ? "Got it — your next edition will be skipped. Your membership otherwise continues as normal."
              : "Your membership has been canceled. It'll stay active through the end of your current billing period.",
      });
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again, or contact us if this keeps happening.");
    } finally {
      setLoading(null);
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => {
          setConfirming(true);
          setResult(null);
          setError(null);
        }}
        className="font-sans text-sm font-medium text-clay underline underline-offset-4 hover:text-olive"
      >
        Cancel membership
      </button>
    );
  }

  if (result) {
    return (
      <div role="status" className="rounded-sm border border-olive/25 bg-ivory p-4 font-sans text-sm">
        <p className="text-charcoal/85">{result.message}</p>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="mt-3 text-xs font-medium text-charcoal/70 underline underline-offset-2"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div role="dialog" aria-label="Manage your membership" className="rounded-sm border border-clay/30 bg-rose/10 p-4 font-sans text-sm">
      <p className="font-medium text-charcoal">Before you go — you don't have to leave entirely.</p>
      <p className="mt-1 text-charcoal/75">
        You can pause billing and mailings for a while, or just skip the next edition. Both keep
        your membership intact so you can pick back up whenever you're ready.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => handleAction("pause")}
          className="rounded-sm border border-olive/40 bg-paper px-4 py-2.5 text-left text-sm font-medium text-olive transition-colors duration-150 hover:bg-ivory disabled:opacity-50"
        >
          <span className="block">{loading === "pause" ? "Pausing…" : "Pause my membership"}</span>
          <span className="mt-0.5 block text-xs font-normal text-charcoal/60">No charges or mailings until you resume.</span>
        </button>

        <button
          type="button"
          disabled={loading !== null}
          onClick={() => handleAction("skip")}
          className="rounded-sm border border-olive/40 bg-paper px-4 py-2.5 text-left text-sm font-medium text-olive transition-colors duration-150 hover:bg-ivory disabled:opacity-50"
        >
          <span className="block">{loading === "skip" ? "Skipping…" : "Skip next edition only"}</span>
          <span className="mt-0.5 block text-xs font-normal text-charcoal/60">Everything else continues as normal.</span>
        </button>

        <div className="mt-1 border-t border-clay/20 pt-3">
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => handleAction("cancel")}
            className="text-xs font-medium text-charcoal/70 underline underline-offset-2 hover:text-[#8a3b2a] disabled:opacity-50"
          >
            {loading === "cancel" ? "Canceling…" : "No — cancel my membership entirely"}
          </button>
          <p className="mt-1 text-xs text-charcoal/55">
            Your membership will remain active through the end of the current billing period.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-xs font-medium text-[#8a3b2a]">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="mt-4 text-xs font-medium text-charcoal/60 underline underline-offset-2"
      >
        Never mind, keep everything as is
      </button>
    </div>
  );
}
