import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { Markdown } from "./mark-down";
import { UIMessage } from "ai";
import { useParams } from "next/navigation";

export function ChatMessage({ content, role }: UIMessage) {
  const isUser = role === "user";
  const { agent } = useParams<{ agent: string }>();
  return (
    <article
      className={cn(
        "flex items-start gap-4 text-[15px] leading-relaxed",
        isUser && "justify-end"
      )}
    >
      <Image
        className={cn(
          "rounded-full",
          isUser ? "order-1" : "border border-black/[0.08] shadow-sm"
        )}
        src={
          isUser
            ? "https://api.dicebear.com/9.x/dylan/png"
            : `https://api.dicebear.com/9.x/bottts-neutral/png?seed=${agent}`
        }
        alt={isUser ? "User profile" : "Bart logo"}
        width={40}
        height={40}
      />
      <div
        className={cn(isUser ? "bg-muted px-4 py-3 rounded-xl" : "space-y-4")}
      >
        <div className="flex flex-col gap-3">
          <p className="sr-only">{isUser ? "You" : "Bart"} said:</p>
          <Markdown>{content}</Markdown>
        </div>
        {/* {!isUser && <MessageActions />} */}
      </div>
    </article>
  );
}

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
};

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="relative text-muted-foreground/80 hover:text-foreground transition-colors size-8 flex items-center justify-center before:absolute before:inset-y-1.5 before:left-0 before:w-px before:bg-border first:before:hidden first-of-type:rounded-s-lg last-of-type:rounded-e-lg focus-visible:z-10 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70">
          {icon}
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="dark px-2 py-1 text-xs">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// function MessageActions() {
//   return (
//     <div className="relative inline-flex bg-white rounded-md border border-black/[0.08] shadow-sm -space-x-px">
//       <TooltipProvider delayDuration={0}>
//         <ActionButton icon={<Code size={16} />} label="Show code" />
//         <ActionButton icon={<BookMarked size={16} />} label="Bookmark" />
//         <ActionButton icon={<RotateCw size={16} />} label="Refresh" />
//         <ActionButton icon={<Check size={16} />} label="Approve" />
//       </TooltipProvider>
//     </div>
//   );
// }
