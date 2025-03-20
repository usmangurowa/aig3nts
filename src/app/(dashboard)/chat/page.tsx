"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // From shadcn-ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // From shadcn-ui
import { Button } from "@/components/ui/button"; // From shadcn-ui
import { useRouter } from "next/navigation";
import { agents } from "@/ai/agents";
import { nanoid } from "nanoid";
import Image from "next/image";

export default function DiscoverAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter agents based on the search query
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Discover Agents</h1>

      {/* Search Input */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search for an agent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Agents List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card
            key={agent.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/chat/${agent.id}/${nanoid()}`)}
          >
            <CardHeader>
              <div className="w-16 h-16 rounded-full mx-auto relative overflow-hidden">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="size-full"
                />
              </div>
              <CardTitle className="text-center mt-2">{agent.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                {agent.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredAgents.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">
          No agents found. Try a different search.
        </p>
      )}
    </div>
  );
}
