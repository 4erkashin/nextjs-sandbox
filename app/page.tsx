import { CodeBlock } from "@/components/code-block";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>It all starts with the command:</p>

      <CodeBlock title="bash" lang="bash" code="npx create-next-app@latest" />

      <h1>NPX</h1>
      <p>NPX = “Node Package eXecute”</p>
      <p>
        It’s designed to execute Node.js packages directly, without manually
        installing them.
      </p>
    </div>
  );
}
