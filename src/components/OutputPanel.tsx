import { useState } from "react";
import { Copy, Check, RefreshCw, Eraser, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function OutputPanel({
  value,
  onChange,
  onRegenerate,
  onClear,
  loading,
  error,
  emptyText,
  label,
  rows = 16,
}: {
  value: string;
  onChange: (v: string) => void;
  onRegenerate: () => void;
  onClear: () => void;
  loading: boolean;
  error: string | null;
  emptyText: string;
  label: string;
  rows?: number;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy. Please select and copy manually.");
    }
  };

  return (
    <section className="glass rounded-3xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight">{label}</h2>
        {value && !loading && (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" className="rounded-xl" onClick={copy}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button size="sm" variant="secondary" className="rounded-xl" onClick={onRegenerate}>
              <RefreshCw className="size-4" />
              Regenerate
            </Button>
            <Button size="sm" variant="ghost" className="rounded-xl" onClick={onClear}>
              <Eraser className="size-4" />
              Clear
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/40 py-16 text-center">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Generating with AI…</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/8 p-5 text-sm text-destructive">
          {error}
        </div>
      ) : value ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="resize-y rounded-2xl border-border bg-background/70 text-sm leading-relaxed"
          aria-label={`${label} (editable)`}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-16 text-center text-sm text-muted-foreground">
          {emptyText}
        </div>
      )}
    </section>
  );
}
