import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { NavBar } from "@/components/nav-bar";
import FeaturesSectionDemo from "@/components/features-section";
import { Button } from "@/components/ui/button";
import { PartyPopperIcon, RocketIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="relative dark flex h-svh w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
        <NavBar />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            AI-g3nts, On Demand
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-lg font-normal text-neutral-300">
            Find the perfect AI agent for your needs, hire them instantly, and
            achieve your goals faster. AIG3NTS makes advanced AI accessible to
            everyone.
          </p>
          <div className="mx-auto flex items-center gap-5   justify-center mt-10">
            <Button>
              Get Started <RocketIcon />
            </Button>
            <Button variant={"outline"} className="text-white" asChild>
              <Link href={"/chat"}>
                Chat with an agent <PartyPopperIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <FeaturesSectionDemo />
    </>
  );
};

export default Page;
