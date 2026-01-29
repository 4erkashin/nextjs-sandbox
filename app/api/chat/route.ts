import { streamText } from "ai";

import { COVER_LETTER_SYSTEM_PROMPT } from "@/lib/cover-letter-prompts";

type CoverLetterBody = {
  additionalDetails?: string;
  company?: string;
  jobTitle?: string;
  skills?: string;
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  if (!validateBody(body)) {
    return Response.json(
      { error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  const prompt = buildUserPrompt(body);

  const result = streamText({
    model: "openai/gpt-5.2-chat",
    prompt,
    system: COVER_LETTER_SYSTEM_PROMPT,
  });

  return result.toUIMessageStreamResponse();
}

function buildUserPrompt(body: CoverLetterBody): string {
  return [
    `Company: ${body.company ?? ""}`,
    `Job title: ${body.jobTitle ?? ""}`,
    `Skills: ${body.skills ?? ""}`,
    `Additional details: ${body.additionalDetails ?? "(none)"}`,
  ].join("\n");
}

function validateBody(body: unknown): body is CoverLetterBody {
  if (body == null || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const jobTitle = typeof b.jobTitle === "string" ? b.jobTitle.trim() : "";
  if (!company || !jobTitle) return false;
  return true;
}
