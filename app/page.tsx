import { Code } from "bright";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>It all starts with the command:</p>

      <Code lang="bash" title="bash" theme="github-light">
        npx create-next-app@latest
      </Code>
    </div>
  );
}
