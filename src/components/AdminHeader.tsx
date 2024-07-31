"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export const AdminHeader = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="shadow">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-2">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src={"/website_logo.png"}
            alt="website logo"
            width={60}
            height={60}
          />
        </Link>
        <Button onClick={logout}>Log out</Button>
      </nav>
    </header>
  );
};
