"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Input } from "@/shared/components/ui/input";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "./bubble";
import aiChat from "../services/aiChat";
import { slugify } from "@/shared/utils/slugify";

type RecData = {
  message: string;
  recommendations: { title: string; type: string; slug: string; id: number }[];
};

export function SheetDemo() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    const res = await aiChat({ param: text });
    const data = await res?.json();
    const reply = data?.choices?.[0]?.message?.content ?? "";
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 end-6 z-50 size-12 rounded-full shadow-lg"
          aria-label="Open chat"
        >
          <MessageCircle className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full max-w-xl flex-col p-0">
        <SheetHeader className="border-border flex flex-row items-center gap-2 border-b px-4 py-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
            AI
          </div>
          <SheetTitle className="text-sm">IMDB-stream</SheetTitle>
          <SheetClose className="ring-offset-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ms-auto rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none disabled:pointer-events-none">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((msg, i) => {
            let rec: RecData | null = null;
            if (msg.role === "assistant") {
              try {
                const parsed = JSON.parse(msg.content);
                if (parsed?.message && Array.isArray(parsed?.recommendations)) rec = parsed;
              } catch {}
            }

            return (
              <Message key={i} align={msg.role === "user" ? "end" : "start"}>
                <MessageAvatar>
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {msg.role === "user" ? "ME" : "AI"}
                  </div>
                </MessageAvatar>
                <MessageContent>
                  {rec ? (
                    <Bubble variant="muted">
                      <p className="text-sm">{rec.message}</p>
                      <div className="mt-2 space-y-0.5">
                        {rec.recommendations.map((item) => (
                          <Link
                            key={item.id}
                            href={`/${item.type === "tv" ? "tv-shows" : "movies"}/${item.slug || slugify(item.title)}/${item.id}`}
                            className="block text-sm hover:text-brand transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </Bubble>
                  ) : (
                    <Bubble variant={msg.role === "assistant" ? "muted" : undefined}>
                      <BubbleContent>{msg.content}</BubbleContent>
                    </Bubble>
                  )}
                </MessageContent>
              </Message>
            );
          })}
        </div>

        <div className="border-border flex items-center gap-2 border-t p-3">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            disabled={!input.trim()}
            onClick={handleSend}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
