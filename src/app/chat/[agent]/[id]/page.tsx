"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Message } from "@/components/message";
const AgentChat = () => {
  const { agent, id } = useParams<{ agent: string; id: string }>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { handleInputChange, input, handleSubmit, messages } = useChat({
    api: `/api/chat/${agent}`,
    id
  });

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scroll({
        behavior: "smooth",
        top: containerRef.current.scrollHeight
      });
    }
  }, [messages]);

  return (
    <main className="container flex flex-col h-screen pb-5 overflow-hidden">
      <ScrollArea className="flex-grow" viewportRef={containerRef}>
        <div className="max-w-lg mx-auto w-full h-full">
          <ul className="space-y-5 py-10">
            {messages.map((message, index) => (
              <Message {...message} key={message.id} />
            ))}
          </ul>
        </div>
      </ScrollArea>
      <div className="w-full max-w-lg mx-auto relative">
        <Button
          onClick={handleSubmit}
          size={"icon"}
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          <SendIcon />
        </Button>
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          className="w-full h-16 resize-none flex items-center justify-center rounded-full p-5 align-middle outline-none  border border-input"
          placeholder="chat here..."
        ></textarea>
      </div>
    </main>
  );
};

export default AgentChat;
