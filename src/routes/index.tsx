import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, MessageSquareText, ArrowRight, Zap, ShieldCheck, Clock } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Write emails, summarize meeting notes and chat with an AI workplace assistant — no signup required.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Write emails, summarize meeting notes and chat with an AI workplace assistant — no signup required.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const FEATURES = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    text: "Turn a few bullet points into a polished, ready-to-send email with the tone and length you choose.",
    cta: "Write an email",
  },
  {
    to: "/meeting-notes",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    text: "Paste raw notes and get a clear summary, key decisions, action items and deadlines in seconds.",
    cta: "Summarize notes",
  },
  {
    to: "/chat",
    icon: MessageSquareText,
    title: "AI Workplace Chat",
    text: "Brainstorm, plan tasks, improve documents and draft professional replies with an expert assistant.",
    cta: "Start chatting",
  },
] as const;

const STATS = [
  { icon: Zap, label: "Instant access", text: "No login or setup" },
  { icon: Clock, label: "Minutes saved", text: "On every routine task" },
  { icon: ShieldCheck, label: "You stay in control", text: "Every output is editable" },
] as const;

function Dashboard() {
  return (
    <AppLayout
      title="Welcome back"
      description="Your AI workspace for faster writing, sharper summaries and better workplace communication."
    >
      <section className="glass rounded-3xl p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {STATS.map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/12 p-2.5 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map(({ to, icon: Icon, title, text, cta }) => (
          <article
            key={to}
            className="glass group flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass"
          >
            <div className="gradient-primary mb-4 flex size-11 items-center justify-center rounded-2xl shadow-soft">
              <Icon className="size-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            <Button asChild className="mt-6 w-full rounded-xl">
              <Link to={to}>
                {cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </article>
        ))}
      </section>
    </AppLayout>
  );
}
