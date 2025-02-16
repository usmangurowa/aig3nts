import { type UIMessage } from "ai";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Markdown } from "./mark-down";

const Message = ({ role, content }: UIMessage) => {
  return (
    <li className="space-x-2 flex">
      <Avatar>
        <AvatarFallback className="text-sm">
          {role === "user" ? "ME" : "AI"}
        </AvatarFallback>
      </Avatar>
      <div className=" gap-2">
        <h4 className="h-10 flex items-center">
          {role === "user" ? "You" : "AI"}
        </h4>
        <Markdown>{content}</Markdown>
      </div>
    </li>
  );
};

export { Message };
