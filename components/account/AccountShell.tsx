import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";
import { SignOutButton } from "./SignOutButton";

const links = [
  { href: "/account", label: "Membership" },
  { href: "/account/address", label: "Shipping Address" },
  { href: "/account/orders", label: "Order History" },
  { href: "/account/playlists", label: "Playlists" },
];

export function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-olive/10 bg-paper">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <SignOutButton />
        </div>
      </header>
      <div className="mx-auto flex max-w-content flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row">
        <nav aria-label="Account" className="flex flex-row flex-wrap gap-1 lg:w-56 lg:flex-col">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-sm px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-paper">
              {l.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
