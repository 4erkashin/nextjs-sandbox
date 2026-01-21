import { cn } from "@/lib/utils";

import { RequestsFlow } from "./requests-flow";

export default function Home() {
  return (
    <div
      className={cn(
        "min-h-screen",
        "flex flex-col items-center justify-center",
        "bg-zinc-50 font-sans dark:bg-black",
      )}
    >
      <main
        className={cn(
          "w-full max-w-3xl",
          "flex flex-1 flex-col",
          "bg-white dark:bg-black",
        )}
      >
        <RequestsFlow />
      </main>
    </div>
  );
}
