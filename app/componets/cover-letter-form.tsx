"use client";

import { useCompletion } from "@ai-sdk/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const inputClass = cn(
  "w-full rounded border p-2",
  "border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900",
);

export function CoverLetterForm() {
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const { complete, completion, error, isLoading, stop } = useCompletion({
    api: "/api/completion",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedCompany = company.trim();
    const trimmedJobTitle = jobTitle.trim();
    if (!trimmedCompany || !trimmedJobTitle) return;
    complete("", {
      body: {
        additionalDetails: additionalDetails.trim() || undefined,
        company: trimmedCompany,
        jobTitle: trimmedJobTitle,
        skills: skills.trim() || undefined,
      },
    });
  }

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col gap-6 py-24">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="company">
            Company (required)
          </label>
          <input
            className={inputClass}
            id="company"
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            required
            type="text"
            value={company}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="jobTitle">
            Job title (required)
          </label>
          <input
            className={inputClass}
            id="jobTitle"
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job title"
            required
            type="text"
            value={jobTitle}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="skills">
            Skills (optional)
          </label>
          <input
            className={inputClass}
            id="skills"
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. React, TypeScript"
            type="text"
            value={skills}
          />
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="additionalDetails"
          >
            Additional details (optional)
          </label>
          <textarea
            className={cn(inputClass, "min-h-[80px] resize-y")}
            id="additionalDetails"
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Any extra context for the letter"
            value={additionalDetails}
          />
        </div>
        <div className="flex gap-2">
          <button
            className={cn(
              "rounded bg-zinc-800 px-4 py-2 text-white dark:bg-zinc-200 dark:text-zinc-900",
              "disabled:opacity-50",
            )}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Generating…" : "Generate cover letter"}
          </button>
          {isLoading && (
            <button
              className="rounded border border-zinc-300 px-4 py-2 dark:border-zinc-700"
              onClick={stop}
              type="button"
            >
              Stop
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          {error.message}
        </div>
      )}

      {completion && (
        <div className="rounded border border-zinc-200 p-4 whitespace-pre-wrap dark:border-zinc-800">
          {completion}
        </div>
      )}
    </div>
  );
}
