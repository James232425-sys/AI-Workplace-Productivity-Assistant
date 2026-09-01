export async function callAi(payload: Record<string, unknown>): Promise<string> {
  let res: Response;
  try {
    res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const data = (await res.json().catch(() => null)) as { text?: string; error?: string } | null;
  if (!res.ok || !data?.text) {
    throw new Error(data?.error ?? "Something went wrong. Please try again.");
  }
  return data.text;
}

export const AI_DISCLAIMER =
  "AI-generated content may contain errors. Always review and verify AI outputs before using them for professional, business, legal, financial, or other important decisions.";
