import { createFileRoute } from "@tanstack/react-router";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

const EMAIL_SYSTEM = `You are a professional workplace email writer.
Write a complete, ready-to-send email based on the user's brief.
Rules:
- Output ONLY the email (subject line first as "Subject: ...", then the body).
- Match the requested tone and length exactly.
- Use clear paragraphs, a natural greeting and a professional sign-off.
- Never invent facts that were not provided; use [placeholders] when details are missing.`;

const SUMMARY_SYSTEM = `You are a meeting notes analyst. Read the raw meeting notes and produce a structured markdown output with EXACTLY these four sections and headings:

## Meeting Summary
A concise overview of the discussion (3-6 sentences).

## Key Decisions
Bullet list of decisions made. If none, write "No decisions were recorded."

## Action Items
Bullet list in the form "- Owner — task". If owner unknown, use "Unassigned".

## Deadlines
Bullet list of dates/deadlines with what they relate to. If none are mentioned, write exactly: "No deadlines were detected in these notes."

Do not add any other sections or commentary.`;

const CHAT_SYSTEM = `You are the AI Workplace Productivity Assistant, a professional assistant for workplace tasks:
writing and improving documents, brainstorming, workplace communication, task planning,
drafting professional responses, explaining workplace concepts, and summarizing information.

Style: clear, concise, professional and friendly. Use markdown-free plain text with short paragraphs,
bullet points ("- ") and numbered steps where useful. Ask a brief clarifying question only when essential.
Stay focused on workplace productivity; politely redirect unrelated requests.
Never claim certainty about facts you cannot verify.`;

function buildMessages(body: Record<string, unknown>): ChatMsg[] | null {
  const mode = body["mode"];
  if (mode === "email") {
    const { topic, recipient, keyPoints, tone, length } = body as Record<string, string>;
    if (!topic?.trim()) return null;
    return [
      { role: "system", content: EMAIL_SYSTEM },
      {
        role: "user",
        content: `Purpose/topic: ${topic}
Recipient: ${recipient || "Not specified"}
Key points to include:
${keyPoints || "None provided"}
Tone: ${tone || "Formal"}
Length: ${length || "Medium"} (Short = under 100 words, Medium = 100-200 words, Detailed = 250-400 words)`,
      },
    ];
  }
  if (mode === "summary") {
    const notes = String(body["notes"] ?? "");
    if (!notes.trim()) return null;
    return [
      { role: "system", content: SUMMARY_SYSTEM },
      { role: "user", content: `Meeting notes:\n\n${notes}` },
    ];
  }
  if (mode === "chat") {
    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) return null;
    return [
      { role: "system", content: CHAT_SYSTEM },
      ...(messages as ChatMsg[]).slice(-24).map((m) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: String(m.content ?? ""),
      })),
    ];
  }
  return null;
}

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ error: "Invalid request body." }, 400);
        }

        const messages = buildMessages(body);
        if (!messages) {
          return json({ error: "Please fill in the required fields before generating." }, 400);
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return json(
            {
              error:
                "AI is not configured yet. Add a LOVABLE_API_KEY secret to enable AI features.",
              configured: false,
            },
            503,
          );
        }

        let res: Response;
        try {
          res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
              model: "google/gemini-3.7-flash",
              messages,
            }),
          });
        } catch {
          return json({ error: "Network error reaching the AI service. Please try again." }, 502);
        }

        if (res.status === 429) {
          return json({ error: "Too many requests right now. Please wait a moment and retry." }, 429);
        }
        if (res.status === 402) {
          return json({ error: "AI credits are exhausted. Please add credits to continue." }, 402);
        }
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          return json({ error: `AI request failed (${res.status}). ${detail.slice(0, 200)}` }, res.status);
        }

        const data = (await res.json().catch(() => null)) as
          | { choices?: Array<{ message?: { content?: string } }> }
          | null;
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (!text) {
          return json({ error: "The AI returned an empty response. Please try again." }, 502);
        }
        return json({ text }, 200);
      },
    },
  },
});

function json(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
