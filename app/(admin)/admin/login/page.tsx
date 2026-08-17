"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput } from "@/components/ui/FormField";
import { Logo } from "@/components/marketing/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const responseBody = await res.json();
        setError(responseBody.error || "Incorrect password.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-sm rounded-sm border border-olive/15 bg-paper p-8">
        <Logo className="mb-8 justify-center" />
        <h1 className="text-center font-serif text-xl font-medium text-olive">Admin sign in</h1>
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <FieldWrapper label="Admin password" htmlFor="admin-password" error={error} required>
            <TextInput
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(error)}
              autoComplete="current-password"
            />
          </FieldWrapper>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
