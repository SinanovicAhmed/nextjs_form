import Image from "next/image";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header>
      <nav className="mx-auto flex max-w-5xl py-4 justify-between">
        <Image
          src={"/images/website_logo.png"}
          alt="website logo"
          width={60}
          height={60}
        />
        <Button>Post job</Button>
      </nav>
    </header>
  );
};
