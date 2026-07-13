import { z } from "zod";

export const HONEYPOT_FIELD_NAME = "company_website";

export const CONSENT_VERSION = "v1";

export const CONSENT_TEXT =
  "By joining, you agree to receive occasional emails about Geodensity. You can unsubscribe at any time. See the Privacy Notice.";

const waitlistSubmissionSchema = z.object({
  email: z.email("Enter a valid email address").max(320),
  [HONEYPOT_FIELD_NAME]: z.string().max(200).optional().default(""),
  source: z.string().max(64).optional().default("landing_page"),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  referrer: z.string().max(2000).optional(),
});

export type WaitlistSubmissionInput = z.input<typeof waitlistSubmissionSchema>;

export type ValidatedWaitlistSubmission = {
  email: string;
  emailNormalised: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

export type ValidationResult =
  | { ok: true; data: ValidatedWaitlistSubmission }
  | { ok: false; reason: "invalid" | "honeypot" };

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateWaitlistSubmission(input: unknown): ValidationResult {
  const parsed = waitlistSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, reason: "invalid" };
  }

  if (parsed.data[HONEYPOT_FIELD_NAME]) {
    return { ok: false, reason: "honeypot" };
  }

  return {
    ok: true,
    data: {
      email: parsed.data.email.trim(),
      emailNormalised: normaliseEmail(parsed.data.email),
      source: parsed.data.source,
      utmSource: parsed.data.utm_source,
      utmMedium: parsed.data.utm_medium,
      utmCampaign: parsed.data.utm_campaign,
      referrer: parsed.data.referrer,
    },
  };
}
