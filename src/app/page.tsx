import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
        <h1 className="font-bold text-center">AI-G3NTS</h1>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button>
            <Link href="/chat/mathilda/1">Chat with Mathilda</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
