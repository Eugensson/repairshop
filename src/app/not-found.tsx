import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="w-full h-dvh px-2">
      <div className="h-full flex flex-col items-center justify-center gap-10">
        <h2 className="text-4xl">Page Not Found</h2>
        <Image
          src="/images/not-found.png"
          width={300}
          height={300}
          sizes="300px"
          priority={true}
          alt="Page Not Found"
          title="Page Not Found"
          className="m-0 rounded-xl"
        />
        <Button variant="link" asChild>
          <Link href="/home">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
