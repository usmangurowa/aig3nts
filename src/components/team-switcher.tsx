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

const TeamSwitcher = ({
  teams
}: {
  teams: {
    name: string;
    logo: string;
  }[];
}) => {
  const [activeTeam, setActiveTeam] = React.useState(teams[0] ?? null);

  if (!teams.length) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Image
                src={activeTeam?.logo ?? ""}
                alt={activeTeam?.name ?? ""}
                width={24}
                height={24}
                className="size-6"
              />
              <span className="flex-1 truncate">{activeTeam?.name}</span>
              <ChevronsUpDown className="size-4 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Switch team</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="cursor-pointer"
              >
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={24}
                  height={24}
                  className="mr-2 size-6"
                />
                <span className="flex-1 truncate">{team.name}</span>
                {activeTeam?.name === team.name && (
                  <DropdownMenuShortcut>✓</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Plus className="mr-2 size-4" />
              <span>New team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export { TeamSwitcher };
