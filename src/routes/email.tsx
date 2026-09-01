import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { OutputPanel } from "@/components/OutputPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callAi } from "@/lib/ai-client";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content: "Generate professional workplace emails with a chosen tone and length in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Generate professional workplace emails with a chosen tone and length in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [topic, setTopic] = useState("");
  const [recipient, setRecipient] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState("Formal");
  const [length, setLength] = useState("Medium");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!topic.trim()) {
      toast.error("Please describe the purpose of the email.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const text = await callAi({ mode: "email", topic, recipient, keyPoints, tone, length });
      setOutput(text);
      toast.success("Email generated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setOutput("");
    setError(null);
  };

  return (
    <AppLayout
      title="Smart Email Generator"
      description="Describe what you need to say — get a professional, ready-to-send email."
    >
      <section className="glass space-y-5 rounded-3xl p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="topic">Email purpose / topic *</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Request a deadline extension for the Q3 report"
              className="rounded-xl bg-background/70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Thandi, Finance Manager"
              className="rounded-xl bg-background/70"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="points">Key points to include</Label>
          <Textarea
            id="points"
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            rows={5}
            placeholder={"- Current status of the report\n- Reason for the delay\n- Proposed new date: 14 October"}
            className="rounded-2xl bg-background/70"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-full rounded-xl bg-background/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Formal", "Friendly", "Persuasive"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger className="w-full rounded-xl bg-background/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Short", "Medium", "Detailed"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generate} disabled={loading} className="w-full rounded-xl sm:w-auto">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkle className="size-4" />}
          {loading ? "Generating…" : "Generate email"}
        </Button>
      </section>

      <OutputPanel
        label="Generated email (editable)"
        value={output}
        onChange={setOutput}
        onRegenerate={generate}
        onClear={clearAll}
        loading={loading}
        error={error}
        emptyText="Your generated email will appear here — fully editable before you send it."
      />
    </AppLayout>
  );
}
