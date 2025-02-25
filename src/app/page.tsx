import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-banner bg-cover bg-center">
      <main className="h-dvh max-w-5xl mx-auto flex flex-col justify-center text-center">
        <div className="w-4/5 sm:max-w-96 mx-auto p-12 flex flex-col gap-6 rounded-xl bg-black/90 text-white sm:text-2xl">
          <h1 className="text-4xl font-bold capitalize">
            Dan&apos;s computer
            <br />
            repair shop
          </h1>
          <address>
            555 Gateway Lane
            <br />
            Kansas City, MO 64118
          </address>
          <p className="">Open Daily: 9am to 5pm</p>
          <Link href="tel:+1-816-555-5555" className="hover:underline">
            816-555-5555
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
