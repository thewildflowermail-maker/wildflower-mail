"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
  }

  return (
    <Button variant="secondary" onClick={handleClick} disabled={loading}>
      {loading ? "Loading…" : "Manage Billing"}
    </Button>
  );
}
