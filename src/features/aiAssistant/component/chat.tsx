'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bot,
  Eraser,
  Film,
  Flame,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  Star,
  Tv,
  User,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Input } from '@/shared/components/ui/input';
import { Message, MessageAvatar, MessageContent } from '@/components/ui/message';
import { Bubble, BubbleContent } from './bubble';
import aiChat from '../services/aiChat';
import { slugify } from '@/shared/utils/slugify';
import { cn } from '@/shared/utils/utils';

type RecData = {
  message: string;
  recommendations: { title: string; type: string; slug: string; id: number }[];
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
  error?: boolean;
};

const SUGGESTION_ICONS = [Film, Tv, Flame, Star];

export function SheetDemo() {
  const t = useTranslations('AiChat');
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content, ts: Date.now() }]);
    setLoading(true);

    const res = await aiChat({ param: content });
    let reply = '';
    let isError = false;
    try {
      const data = await res?.json();
      reply = data?.choices?.[0]?.message?.content ?? '';
      if (!res?.ok || !reply) isError = true;
    } catch {
      isError = true;
    }

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: isError ? t('error') : reply, ts: Date.now(), error: isError },
    ]);
    setLoading(false);
  }

  function parseRec(content: string): RecData | null {
    try {
      const parsed = JSON.parse(content);
      if (parsed?.message && Array.isArray(parsed?.recommendations)) return parsed;
    } catch {}
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 end-6 z-50 size-12 rounded-full shadow-lg"
          aria-label={t('openChat')}
        >
          <MessageCircle className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col gap-0 p-0 sm:max-w-lg"
      >
        <SheetHeader className="flex shrink-0 flex-row items-center gap-3 border-b px-4 py-3">
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand via-brand/80 to-brand/60 text-brand-foreground shadow-sm">
            <Bot className="size-5" />
            <span className="absolute -bottom-0.5 -end-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <SheetTitle className="text-sm leading-tight">IMDB-stream</SheetTitle>
            <SheetDescription className="flex items-center gap-1.5 text-xs">
              <span className="text-emerald-500">●</span>
              {t('subtitle')}
            </SheetDescription>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMessages([])}
              aria-label={t('clearChat')}
              className="ms-auto text-muted-foreground"
            >
              <Eraser className="size-4" />
            </Button>
          )}
          <SheetClose className="ring-offset-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none disabled:pointer-events-none">
            <X className="size-4" />
            <span className="sr-only">{t('close')}</span>
          </SheetClose>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-xs">
                <Sparkles className="size-7" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">{t('emptyTitle')}</p>
                <p className="mx-auto max-w-[260px] text-sm text-muted-foreground">
                  {t('emptySubtitle')}
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {SUGGESTION_ICONS.map((Icon, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="justify-start gap-2 text-left text-sm text-foreground"
                    onClick={() => handleSend(t(`suggestion${i + 1}`))}
                  >
                    <Icon className="size-4 shrink-0 text-brand" />
                    <span className="min-w-0 truncate">{t(`suggestion${i + 1}`)}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => {
                const rec = msg.role === 'assistant' ? parseRec(msg.content) : null;

                return (
                  <Message key={i} align={msg.role === 'user' ? 'end' : 'start'}>
                    <MessageAvatar className="self-start mt-1">
                      {msg.role === 'user' ? (
                        <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <User className="size-4" />
                        </div>
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand/60 text-brand-foreground">
                          <Bot className="size-4" />
                        </div>
                      )}
                    </MessageAvatar>
                    <MessageContent>
                      {rec ? (
                        <Bubble variant="muted" className="text-foreground">
                          <p className="text-sm whitespace-pre-wrap">{rec.message}</p>
                          <div className="mt-2 flex flex-col gap-1.5">
                            {rec.recommendations.map((item) => (
                              <Link
                                key={item.id}
                                href={`/${item.type === 'tv' ? 'tv-shows' : 'movies'}/${item.slug || slugify(item.title)}/${item.id}`}
                                className="group flex items-center justify-between gap-3 rounded-lg border bg-background/70 px-3 py-2 text-sm transition-colors hover:border-brand/40 hover:bg-brand/5"
                              >
                                <span className="min-w-0 truncate font-medium text-foreground group-hover:text-brand">
                                  {item.title}
                                </span>
                                <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                  {item.type === 'tv' ? 'TV' : 'Movie'}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </Bubble>
                      ) : (
                        <Bubble
                          variant={msg.role === 'user' ? undefined : 'muted'}
                          className={cn(
                            msg.role === 'assistant' && 'text-foreground',
                            msg.error && 'border border-destructive/30 bg-destructive/10 text-destructive'
                          )}
                        >
                          <BubbleContent className="whitespace-pre-wrap">
                            {msg.content}
                          </BubbleContent>
                        </Bubble>
                      )}
                      <span className="px-1 text-[10px] text-muted-foreground/60">
                        {new Date(msg.ts).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </MessageContent>
                  </Message>
                );
              })}

              {loading && (
                <Message align="start">
                  <MessageAvatar className="self-start mt-1">
                    <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand/60 text-brand-foreground">
                      <Bot className="size-4" />
                    </div>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble variant="muted" className="gap-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {t('thinking')}
                      </span>
                      <span className="flex items-center gap-1">
                        {[0, 150, 300].map((delay) => (
                          <span
                            key={delay}
                            className="size-1.5 animate-bounce rounded-full bg-current"
                            style={{ animationDelay: `${delay}ms` }}
                          />
                        ))}
                      </span>
                    </Bubble>
                  </MessageContent>
                </Message>
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="shrink-0 border-t p-3">
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 p-1.5 focus-within:border-ring">
            <Input
              ref={inputRef}
              placeholder={t('typeMessage')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-0"
            />
            <Button
              type="button"
              size="icon"
              disabled={!input.trim() || loading}
              onClick={() => handleSend()}
              aria-label={t('sendMessage')}
              className="rounded-lg"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}