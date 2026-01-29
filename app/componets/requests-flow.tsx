import { MoveDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RequestsFlow() {
  return (
    <>
      <h1>Requests flow</h1>

      <span>Press to start</span>
      <MoveDown />
      <Button>Make a request</Button>

      <h2>Outside my control</h2>

      <h2>Inside my control</h2>
    </>
  );
}
