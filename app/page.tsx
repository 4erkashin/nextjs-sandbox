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
      <header
        className={cn(
          "w-full max-w-3xl",
          "flex flex-col",
          "bg-white dark:bg-black",
        )}
      >
        <pre>
          {JSON.stringify(
            [
              "TODO",
              {
                1: "basic layout",
                description: "paddings and headings scheme",
              },
            ],
            null,
            2,
          )}
        </pre>
      </header>

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
