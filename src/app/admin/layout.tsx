import { AdminHeader } from "@/components/AdminHeader";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AdminHeader />
      {children}
    </ClerkProvider>
  );
}
