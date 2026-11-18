"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/constants/contact";
import { cn } from "@/utils/cn";

const SUBJECTS = [
  "General inquiry",
  "Book / game question",
  "Partnership",
  "Media / press",
  "Feedback",
] as const;

const fieldClass = cn(
  "mt-2 w-full border border-[#ff4fc3]/35 bg-[#0a0812] px-4 py-3 text-sm text-white",
  "placeholder:text-white/35 shadow-[0_0_14px_rgba(90,215,255,0.08)]",
  "transition-[border-color,box-shadow] duration-200",
  "focus-visible:border-[#ff4fc3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fc3]",
);

const labelClass =
  "font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.22em] text-white/65";

type Status = "idle" | "sent";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    const body = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      trimmedMessage,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[Contact] ${subject}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-start gap-4 border border-[#ff4fc3]/35 bg-[#0a0812]/80 p-6 sm:p-8"
        role="status"
      >
        <CheckCircle2 className="size-8 text-[#ff7ad9]" aria-hidden />
        <div>
          <p className="font-[family-name:var(--font-family-bebas)] text-2xl uppercase tracking-[0.06em] text-white">
            Message ready
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
            Your email app should open with the message pre-filled. If it
            doesn&apos;t, send us a note at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#5ad7ff] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border border-white/12 bg-white/[0.03] p-5 sm:gap-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block" htmlFor={`${formId}-name`}>
          <span className={labelClass}>Name</span>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </label>

        <label className="block" htmlFor={`${formId}-email`}>
          <span className={labelClass}>Email</span>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block" htmlFor={`${formId}-subject`}>
        <span className={labelClass}>Subject</span>
        <select
          id={`${formId}-subject`}
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={cn(fieldClass, "appearance-none")}
        >
          {SUBJECTS.map((option) => (
            <option key={option} value={option} className="bg-[#0a0812]">
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block" htmlFor={`${formId}-message`}>
        <span className={labelClass}>Message</span>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us how we can help…"
          className={cn(fieldClass, "resize-y min-h-[9rem]")}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-2 text-xs text-white/50">
          <Mail className="size-3.5 shrink-0 text-[#ff7ad9]" aria-hidden />
          Replies go to {CONTACT_EMAIL}
        </p>
        <Button type="submit" variant="primary" size="md" className="rounded-full">
          <Send className="size-4" aria-hidden />
          Send message
        </Button>
      </div>
    </form>
  );
}
