import Link from "next/link";
import { HomeIcon, File, UsersRound } from "lucide-react";

import { NavButton } from "@/components/NavButton";
import { ModeToggle } from "@/components/ModeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-20 animate-slide bg-background h-12 p-2 border-b">
      <div className="w-full h-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NavButton icon={HomeIcon} label="Home" href="/home" />
          <Link
            href="/home"
            className="flex items-center justify-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block m-0 mt-1 text-xl font-bold capitalize">
              Computer repair shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton icon={File} label="Tickets" href="/tickets" />
          <NavButton icon={UsersRound} label="Customers" href="/customers" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
