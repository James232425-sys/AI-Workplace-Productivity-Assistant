import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Eraser, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { callAi } from "@/lib/ai-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chat | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Chat with a professional AI assistant for writing, brainstorming, planning and workplace communication.",
      },
      { property: "og:title", content: "AI Workplace Chat" },
      {
        property: "og:description",
        content:
          "Chat with a professional AI assistant for writing, brainstorming, planning and workplace communication.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Help me plan my week around three priorities",
  "Improve this message to sound more professional",
  "Brainstorm ideas to speed up our onboarding process",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await callAi({ mode: "chat", messages: next });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      title="AI Workplace Chat"
      description="Your professional assistant for writing, planning, brainstorming and communication."
    >
      <section className="glass flex h-[calc(100vh-16rem)] min-h-[26rem] flex-col rounded-3xl p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
          <p className="text-sm font-semibold">Conversation</p>
          {messages.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="rounded-xl"
              onClick={() => setMessages([])}
            >
              <Eraser className="size-4" />
              Clear chat
            </Button>
          )}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          {messages.length === 0 && !loading && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="gradient-primary flex size-12 items-center justify-center rounded-2xl shadow-soft">
                <MessageSquareText className="size-6 text-primary-foreground" />
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Ask anything about your work — drafting, planning, brainstorming or explaining
                workplace concepts.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs text-foreground transition-colors hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "glass-soft text-foreground",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="glass-soft flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin text-primary" />
                Assistant is typing…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-end gap-2 border-t border-border pt-3"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Ask your workplace assistant…"
            aria-label="Message"
            className="max-h-40 min-h-11 resize-none rounded-2xl bg-background/70 text-sm"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="size-11 shrink-0 rounded-2xl"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </Button>
        </form>
      </section>
    </AppLayout>
  );
}
