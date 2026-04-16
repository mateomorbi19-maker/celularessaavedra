"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import clsx from "clsx";
import { ChatList } from "@/components/ChatList";
import { CONVERSATIONS } from "@/data/conversations";

export default function BandejaLayout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const hasSelection = segment !== null && segment !== "__PAGE__";

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div
        className={clsx(
          "w-full md:w-[360px] md:shrink-0 md:block",
          hasSelection ? "hidden" : "block"
        )}
      >
        <ChatList conversations={CONVERSATIONS} />
      </div>
      <section
        className={clsx(
          "flex-1 min-w-0 flex flex-col bg-csblack",
          hasSelection ? "flex" : "hidden md:flex"
        )}
      >
        {children}
      </section>
    </div>
  );
}
