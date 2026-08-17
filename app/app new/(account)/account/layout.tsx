import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/account/queries";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getCurrentCustomer();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
