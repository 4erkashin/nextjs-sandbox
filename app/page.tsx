import { CodeBlock } from '@/components/code-block';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-[200vh] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <Navbar />
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
