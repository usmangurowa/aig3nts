"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // From shadcn-ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // From shadcn-ui
import { useRouter } from "next/navigation";

type Agent = {
  id: string;
  name: string;
  description: string;
  avatar: string;
};

const agents: Agent[] = [
  {
    id: "1",
    name: "Agent Alpha",
    description: "Your friendly assistant for general inquiries.",
    avatar: "/avatars/agent-alpha.png"
  },
  {
    id: "2",
    name: "Agent Beta",
    description: "Specialized in technical support.",
    avatar: "/avatars/agent-beta.png"
  },
  {
    id: "3",
    name: "Agent Gamma",
    description: "Expert in financial advice.",
    avatar: "/avatars/agent-gamma.png"
  }
];

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
            onClick={() => router.push(`/chat/${agent.id}`)}
          >
            <CardHeader>
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-16 h-16 rounded-full mx-auto"
              />
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
