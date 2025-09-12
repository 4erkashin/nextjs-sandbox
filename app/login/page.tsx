import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SignIn9 } from "@/components/pro-blocks/application/sign-in/sign-in-9";

export default async function Page() {
  const cookie = (await cookies()).get("session")?.value;
  if (cookie?.startsWith("mock-session-")) redirect("/");
  return <SignIn9 />;
}
