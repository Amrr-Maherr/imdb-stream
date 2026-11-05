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
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
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
          className="fixed bottom-5 end-5 z-50 size-14 rounded-full shadow-xl shadow-brand/20 ring-4 ring-background/80 transition-transform hover:scale-105 focus-visible:ring-brand/50 sm:bottom-6 sm:end-6"
          aria-label={t('openChat')}
        >
          <MessageCircle className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        closeLabel={t('close')}
        className="flex h-[100dvh] w-full max-w-[min(100vw,28rem)] flex-col gap-0 overflow-hidden border-s border-border/70 bg-background p-0 shadow-2xl sm:max-w-[28rem]"
      >
        <SheetHeader className="flex shrink-0 flex-row items-center gap-3 border-b border-border/70 bg-card/80 px-5 py-4 pe-14">
          <div className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-sm ring-4 ring-brand/10">
            <Bot className="size-5" />
            <span className="absolute -bottom-0.5 -end-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="min-w-0 space-y-1">
            <SheetTitle className="text-base leading-tight">IMDB-stream</SheetTitle>
            <SheetDescription className="flex items-center gap-1.5 text-xs">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {t('subtitle')}
            </SheetDescription>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMessages([])}
              disabled={loading}
              aria-label={t('clearChat')}
              className="ms-auto rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Eraser className="size-4" />
            </Button>
          )}
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-gradient-to-b from-muted/30 to-background px-4 py-5 sm:px-5">
          {messages.length === 0 ? (
            <div className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-6 py-10 text-center">
              <div className="relative flex size-16 items-center justify-center rounded-3xl border border-brand/20 bg-brand/10 text-brand shadow-lg shadow-brand/10">
                <Sparkles className="size-7" />
                <span className="absolute -end-1 -top-1 flex size-6 items-center justify-center rounded-full border-2 border-background bg-card text-brand">
                  <Film className="size-3" />
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {t('emptyTitle')}
                </p>
                <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-muted-foreground">
                  {t('emptySubtitle')}
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-2.5">
                {SUGGESTION_ICONS.map((Icon, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-auto min-h-14 w-full justify-start gap-3 rounded-xl border-border/70 bg-card/80 px-3 py-2.5 text-start whitespace-normal text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-brand/5 hover:shadow-md"
                    onClick={() => handleSend(t(`suggestion${i + 1}`))}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">
                      {t(`suggestion${i + 1}`)}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col gap-5"
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-label={t('subtitle')}
            >
              {messages.map((msg, i) => {
                const rec = msg.role === 'assistant' ? parseRec(msg.content) : null;

                return (
                  <Message
                    key={`${msg.role}-${msg.ts}-${i}`}
                    align={msg.role === 'user' ? 'end' : 'start'}
                    className="gap-2.5"
                  >
                    <MessageAvatar className="mt-1 self-start">
                      {msg.role === 'user' ? (
                        <div className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground ring-1 ring-border/70">
                          <User className="size-4" aria-hidden="true" />
                        </div>
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
                          <Bot className="size-4" aria-hidden="true" />
                        </div>
                      )}
                    </MessageAvatar>
                    <MessageContent className="max-w-[88%] gap-1.5">
                      {rec ? (
                        <Bubble
                          variant="muted"
                          className="w-full max-w-full gap-3 border border-border/70 bg-card p-3.5 text-foreground shadow-sm"
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {rec.message}
                          </p>
                          <div className="flex flex-col gap-2">
                            {rec.recommendations.map((item) => (
                              <Link
                                key={item.id}
                                href={`/${item.type === 'tv' ? 'tv-shows' : 'movies'}/${item.slug || slugify(item.title)}/${item.id}`}
                                className="group flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background px-3 py-2.5 text-sm transition-colors hover:border-brand/50 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <span className="min-w-0 truncate font-medium text-foreground">
                                  {item.title}
                                </span>
                                <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                  {t(item.type === 'tv' ? 'tvLabel' : 'movieLabel')}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </Bubble>
                      ) : (
                        <Bubble
                          variant={msg.role === 'user' ? undefined : 'muted'}
                          className={cn(
                            msg.role === 'user'
                              ? 'rounded-2xl rounded-ee-md bg-primary px-4 py-2.5 text-primary-foreground shadow-sm'
                              : 'rounded-2xl rounded-es-md border border-border/70 bg-card px-4 py-2.5 text-foreground shadow-sm',
                            msg.error &&
                              'border-destructive/30 bg-destructive/10 text-destructive shadow-none'
                          )}
                        >
                          <BubbleContent className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </BubbleContent>
                        </Bubble>
                      )}
                      <span className="px-1 text-[10px] text-muted-foreground/70">
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
                  <MessageAvatar className="mt-1 self-start">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
                      <Bot className="size-4" aria-hidden="true" />
                    </div>
                  </MessageAvatar>
                  <MessageContent className="max-w-[88%] gap-1.5">
                    <Bubble
                      variant="muted"
                      className="gap-2 border border-border/70 bg-card px-4 py-3 text-foreground shadow-sm"
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        {t('thinking')}
                      </span>
                      <span className="flex items-center gap-1.5" aria-hidden="true">
                        {[0, 150, 300].map((delay) => (
                          <span
                            key={delay}
                            className="size-1.5 animate-bounce rounded-full bg-brand"
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

        <div className="shrink-0 border-t border-border/70 bg-card/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-20px_var(--foreground)] backdrop-blur">
          <form
            className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-border/80 bg-background p-1.5 shadow-sm transition-colors focus-within:border-brand/60 focus-within:ring-4 focus-within:ring-brand/10"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSend();
            }}
          >
            <Input
              ref={inputRef}
              aria-label={t('typeMessage')}
              autoComplete="off"
              placeholder={t('typeMessage')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-11 min-w-0 border-0 bg-transparent px-3 shadow-none focus-visible:ring-0 focus-visible:border-0"
            />
            <Button
              type="submit"
              disabled={!input.trim() || loading}
              size="icon-lg"
              aria-label={t('sendMessage')}
              className="size-11 rounded-xl shadow-sm transition-transform hover:scale-[1.03] disabled:scale-100"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </form>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">{t('inputHint')}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
