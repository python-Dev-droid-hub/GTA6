"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export type NewsletterFormProps = {
  className?: string;
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * Why client: form state + fetch. Server section wraps this island.
 * API is a stub until a provider is chosen (Phase 4+).
 */
export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll ping you when something drops.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and retry.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex w-full flex-col gap-3", className)}
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          disabled={status === "loading"}
          className={cn(
            "h-12 w-full flex-1 rounded-md border border-border-strong bg-ink-900 px-4",
            "font-sans text-sm text-paper placeholder:text-paper-faint",
            "transition-cinema focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            "disabled:opacity-50",
          )}
        />
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={status === "loading"}
          className="sm:min-w-[10rem]"
        >
          {status === "loading" ? "Joining…" : "Join waitlist"}
        </Button>
      </div>

      <p className="text-xs text-paper-faint">
        Fan updates only. No spam. Unsubscribe anytime.
      </p>

      <div
        className="min-h-[1.25rem]"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message ? (
          <p
            className={cn(
              "text-sm",
              status === "success" ? "text-neon-cyan" : "text-vice-pink",
            )}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
