import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="shadow">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/website_logo.png"}
            alt="website logo"
            width={60}
            height={60}
          />
        </Link>
        <Button asChild>
          <Link href={"/jobs/new"}>Post a job</Link>
        </Button>
      </nav>
    </header>
  );
};
