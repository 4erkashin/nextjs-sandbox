import { convertToModelMessages, streamText, UIMessage } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    messages: await convertToModelMessages(messages),
    model: "openai/gpt-5.2-chat",
  });

  return result.toUIMessageStreamResponse();
}
