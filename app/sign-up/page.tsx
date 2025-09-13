import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SignUp7 } from "@/components/pro-blocks/application/sign-up/sign-up-7";

export default async function SignUpPage() {
  const cookie = (await cookies()).get("session")?.value;
  if (cookie?.startsWith("mock-session-")) redirect("/");
  return <SignUp7 />;
}
