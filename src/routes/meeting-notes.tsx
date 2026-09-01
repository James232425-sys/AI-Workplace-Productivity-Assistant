import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkle, Loader2, Eraser } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { OutputPanel } from "@/components/OutputPanel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { callAi } from "@/lib/ai-client";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into a summary, key decisions, action items and deadlines instantly.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content:
          "Turn raw meeting notes into a summary, key decisions, action items and deadlines instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingNotesPage,
});

function MeetingNotesPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summarize = async () => {
    if (notes.trim().length < 20) {
      toast.error("Please paste your meeting notes first (at least a few sentences).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const text = await callAi({ mode: "summary", notes });
      setOutput(text);
      toast.success("Notes summarized");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      title="Meeting Notes Summarizer"
      description="Paste your raw notes and get a summary, decisions, action items and deadlines."
    >
      <section className="glass space-y-4 rounded-3xl p-5 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="notes">Meeting notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={12}
            placeholder="Paste the full meeting notes or transcript here…"
            className="resize-y rounded-2xl bg-background/70 text-sm leading-relaxed"
          />
          <p className="text-xs text-muted-foreground">{notes.trim().length} characters</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={summarize} disabled={loading} className="rounded-xl">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkle className="size-4" />}
            {loading ? "Summarizing…" : "Summarize"}
          </Button>
          <Button
            variant="ghost"
            className="rounded-xl"
            onClick={() => {
              setNotes("");
              setOutput("");
              setError(null);
            }}
          >
            <Eraser className="size-4" />
            Clear notes
          </Button>
        </div>
      </section>

      <OutputPanel
        label="Summary, decisions, action items & deadlines (editable)"
        value={output}
        onChange={setOutput}
        onRegenerate={summarize}
        onClear={() => {
          setOutput("");
          setError(null);
        }}
        loading={loading}
        error={error}
        rows={20}
        emptyText="Your structured meeting summary will appear here — edit it freely before sharing."
      />
    </AppLayout>
  );
}
