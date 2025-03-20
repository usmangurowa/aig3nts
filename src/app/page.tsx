import { agents } from "@/ai/agents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { nanoid } from "nanoid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <main className="flex flex-col items-center justify-center space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              AI-G3NTS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of AI interaction with our specialized
              agents
            </p>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/avatars/${agent.id.toLowerCase()}.png`}
                    />
                    <AvatarFallback>{agent.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      AI Assistant
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    {agent.description ||
                      `Chat with ${agent.name} to explore AI capabilities`}
                  </p>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Link href={`/chat-2/${agent.id}/${nanoid()}`}>
                      Start Chat
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Advanced AI</CardTitle>
                <CardDescription>
                  Powered by cutting-edge language models
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Specialized Agents</CardTitle>
                <CardDescription>
                  Each agent has unique capabilities and expertise
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Real-time Interaction</CardTitle>
                <CardDescription>
                  Engage in natural conversations instantly
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
