"use client";

import { useRef, useState } from "react";
import { CONSENT_TEXT, HONEYPOT_FIELD_NAME } from "@/lib/validation";
import {
  trackWaitlistDuplicate,
  trackWaitlistError,
  trackWaitlistFormStarted,
  trackWaitlistSubmitted,
} from "@/lib/analytics";
import type { WaitlistResponse } from "@/app/api/waitlist/route";

type Status = "idle" | "submitting" | "success" | "duplicate" | "invalid" | "error";

const MESSAGES: Record<Exclude<Status, "idle" | "submitting">, string> = {
  success: "You’re on the list. We’ll email you when there is something useful to try.",
  duplicate: "You’re already on the Geodensity waitlist.",
  invalid: "Enter a valid email address.",
  error: "We couldn’t add your email just now. Please try again.",
};

export default function WaitlistForm({
  source,
  id,
}: {
  source: "hero" | "final_cta";
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const hasStartedRef = useRef(false);

  const handleFocus = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackWaitlistFormStarted(source);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const honeypotValue = formData.get(HONEYPOT_FIELD_NAME);
    const submittedEmail = String(formData.get("email") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submittedEmail)) {
      setStatus("invalid");
      trackWaitlistError(source, "client_invalid");
      return;
    }

    setStatus("submitting");

    const params = new URLSearchParams(window.location.search);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: submittedEmail,
          [HONEYPOT_FIELD_NAME]: honeypotValue,
          source: "landing_page",
          utm_source: params.get("utm_source") ?? undefined,
          utm_medium: params.get("utm_medium") ?? undefined,
          utm_campaign: params.get("utm_campaign") ?? undefined,
          referrer: document.referrer || undefined,
        }),
      });

      const data: WaitlistResponse = await response.json();
      setStatus(data.status);

      if (data.status === "success") {
        trackWaitlistSubmitted(source);
        setEmail("");
      } else if (data.status === "duplicate") {
        trackWaitlistDuplicate(source);
      } else {
        trackWaitlistError(source, data.status);
      }
    } catch {
      setStatus("error");
      trackWaitlistError(source, "network");
    }
  };

  const inputId = id ? `${id}-email` : "waitlist-email";
  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
            className="h-12 w-full rounded-xl border border-surface-border bg-surface px-4 text-base text-ink placeholder:text-ink-secondary/60 focus-visible:outline-none"
          />
        </div>

        {/* Honeypot: off-screen, not display:none, so it's a real trap for bots but invisible to sighted users */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
        >
          <label htmlFor={`${inputId}-company`}>Company website</label>
          <input
            id={`${inputId}-company`}
            name={HONEYPOT_FIELD_NAME}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 min-w-[44px] shrink-0 rounded-xl bg-accent px-6 text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {isSubmitting ? "Joining…" : "Join the waitlist"}
        </button>
      </div>

      <p className="mt-2 text-sm text-ink-secondary/80">
        Get product updates and an invitation to test the first version.
      </p>

      <p className="mt-2 text-xs text-ink-secondary/70">{CONSENT_TEXT}</p>

      <div aria-live="polite" className="mt-2 min-h-[1.5rem] text-sm">
        {status !== "idle" && status !== "submitting" && (
          <p
            className={
              status === "success" ? "text-accent" : status === "duplicate" ? "text-ink-secondary" : "text-[#B0243A]"
            }
          >
            {MESSAGES[status]}
          </p>
        )}
      </div>
    </form>
  );
}
