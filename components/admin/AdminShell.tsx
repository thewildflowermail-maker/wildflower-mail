"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/marketing/Logo";
import { cn } from "@/lib/utils/format";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/recipients", label: "Recipients & Mailing Addresses" },
  { href: "/admin/editions", label: "Monthly Editions" },
  { href: "/admin/mailing", label: "Mailing & CSV Export" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col lg:flex-row">
      <aside className="border-b border-olive/10 bg-paper p-6 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <Logo className="mb-8" />
        <nav aria-label="Admin" className="flex flex-row flex-wrap gap-1 lg:flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-ivory",
                pathname === l.href && "bg-olive text-paper hover:bg-olive"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 text-sm font-medium text-clay underline underline-offset-4 hover:text-olive"
        >
          Sign out
        </button>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
