"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { Logo } from "@/components/pro-blocks/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignIn9() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Login failed");
        setPending(false);
        return;
      }

      document.cookie = `session=${data.session}; Path=/; SameSite=Lax`;
      const params = new URLSearchParams(window.location.search);
      const to = params.get("redirect") || "/";
      window.location.href = to;
    } catch (err) {
      console.error(err);
      setError("Network error");
      setPending(false);
    }
  }

  return (
    <div className="bg-background min-h-screen gap-x-6 md:p-16">
      {/* Content wrapper */}
      <div className="items-top flex w-full justify-center">
        {/* Sign-in form container */}
        <div className="w-full max-w-sm px-6 py-16 md:p-0">
          {/* Logo and header section */}
          <div className="mb-6 flex flex-col items-center space-y-6">
            <Logo className="h-8 w-8" />
            <h1 className="text-4xl font-semibold md:text-5xl">Welcome</h1>
          </div>
          {/* Input fields section */}
          <form onSubmit={onSubmit}>
            <div className="mb-6 space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
            </div>
            {/* Forgot password above submit */}
            <div className="flex justify-center">
              <Link
                className="text-muted-foreground hover:text-foreground text-sm underline"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
            {/* Submit + Remember me */}
            <div className="mt-6 flex flex-col space-y-6">
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Signing in..." : "Log in"}
              </Button>
              <div className="flex items-center justify-center gap-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-muted-foreground text-sm"
                >
                  Remember me
                </Label>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Bottom CTA */}
      <div className="fixed inset-x-0 bottom-8">
        <p className="text-muted-foreground text-center text-sm">
          No account?{" "}
          <Link className="text-foreground underline" href="/sign-up">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
