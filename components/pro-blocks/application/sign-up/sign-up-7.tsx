"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { Logo } from "@/components/pro-blocks/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function SignUp7() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agree) {
      setError("Please accept the terms");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Sign up failed");
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
    <div className="bg-background flex min-h-screen justify-center px-6 py-8 md:items-start md:py-16">
      {/* Content wrapper with max width */}
      <div className="w-full max-w-md space-y-8">
        {/* Header section with logo and text */}
        <div className="flex flex-col items-center gap-6 text-center">
          <Logo />
          {/* Title and subtitle */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold md:text-3xl">
              Create an account
            </h2>
            <p className="text-muted-foreground text-sm">
              Let&apos;s get started. Fill in the details below to create your
              account.
            </p>
          </div>
        </div>

        {/* Form inputs section */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name input fields */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email input field */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password input field with helper text */}
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
            <p className="text-muted-foreground text-sm">
              Minimum 8 characters.
            </p>
          </div>

          {/* Terms and conditions checkbox with link */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agree}
              onCheckedChange={(v) => setAgree(Boolean(v))}
            />
            <label htmlFor="terms" className="text-sm leading-none">
              By registering you accept our{" "}
              <Link href="#" className="underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          {/* Footer section with sign up button and sign in link */}
          <div className="space-y-6 pt-2">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating account..." : "Get started"}
            </Button>
            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline">
                Log in
              </Link>
            </p>
          </div>
        </form>

        {/* Footer section moved into form submit area */}
      </div>
    </div>
  );
}
