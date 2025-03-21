"use client";

import * as React from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ChevronsUpDown, Plus } from "lucide-react";

import { agents } from "@/ai/agents";
import { Input } from "./ui/input";
import { useParams, useRouter } from "next/navigation";
import { nanoid } from "nanoid";

const AgentSwitcher = () => {
  const { agent } = useParams<{ agent: string; id: string }>();

  const [activeAgent, setActiveAgent] = React.useState(agents[0] ?? null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const router = useRouter();

  // Filter agents based on the search query
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const switchAgent = (agent: string) => {
    router.push(`/chat/${agent}/${nanoid()}`);
  };

  React.useEffect(() => {
    const foundAgent = agents.find((a) => a.id === agent);
    if (foundAgent) {
      setActiveAgent(foundAgent);
    } else {
      setActiveAgent(agents[0] ?? null);
    }
  }, [agent]);

  if (!agent) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Image
                src={activeAgent?.image ?? ""}
                alt={activeAgent?.name ?? ""}
                width={24}
                height={24}
                className="size-6"
              />
              <span className="flex-1 truncate">{activeAgent?.name}</span>
              <ChevronsUpDown className="size-4 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px] dark">
            <DropdownMenuLabel>Switch agent</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Search Input */}
            <div className="px-2 py-1">
              <Input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded-md"
              />
            </div>
            <DropdownMenuSeparator />
            {/* Filtered Agents */}
            {filteredAgents.map((agent) => (
              <DropdownMenuItem
                key={agent.name}
                onClick={() => switchAgent(agent.id)}
                className="cursor-pointer"
              >
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={24}
                  height={24}
                  className="mr-2 size-6"
                />
                <span className="flex-1 truncate">{agent.name}</span>
                {activeAgent?.name === agent.name && (
                  <DropdownMenuShortcut>✓</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Plus className="mr-2 size-4" />
              <span>New agent</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export { AgentSwitcher };
