import { agents } from "@/ai/agents";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { nanoid } from "nanoid";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
        <h1 className="font-bold text-center">AI-G3NTS</h1>

        <div className=" gap-4 grid grid-cols-5  content-center">
          {agents.map((agent) => (
            <Button key={agent.id}>
              <Link href={`/chat/${agent.id}/${nanoid()}`}>
                Chat with {agent.name}
              </Link>
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
