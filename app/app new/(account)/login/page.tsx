"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput } from "@/components/ui/FormField";
import { Logo } from "@/components/marketing/Logo";
import { isValidEmail } from "@/lib/utils/format";

export default function AccountLoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/account`,
      },
    });
    if (signInError) {
      setError("We couldn't send a sign-in link. Please try again.");
      setStatus("idle");
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-sm rounded-sm border border-olive/15 bg-paper p-8">
        <Logo className="mb-8 justify-center" />
        <h1 className="text-center font-serif text-xl font-medium text-olive">Sign in to your account</h1>
        {status === "sent" ? (
          <p className="mt-6 text-center text-sm text-charcoal/80" role="status">
            Check your email for a secure sign-in link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <FieldWrapper label="Email address" htmlFor="account-email" error={error} required>
              <TextInput
                id="account-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
                autoComplete="email"
              />
            </FieldWrapper>
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Sending link…" : "Send Sign-In Link"}
            </Button>
            <p className="text-center text-xs text-charcoal/55">
              No password needed — we'll email you a secure link.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
