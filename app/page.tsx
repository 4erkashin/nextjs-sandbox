export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <pre>login flow</pre>
        <pre>{JSON.stringify({ 1: "shadcn", 2: "tanstack-query" }, null, 2)}</pre>
      </main>
    </div>
  );
}
