import { createClient } from "@supabase/supabase-js";
import { CONSENT_TEXT, CONSENT_VERSION, type ValidatedWaitlistSubmission } from "./validation";

export type InsertWaitlistEntryInput = ValidatedWaitlistSubmission & {
  userAgent?: string;
};

export type InsertWaitlistResult = "success" | "duplicate";

// DEV-ONLY FALLBACK — remove this block once Supabase credentials are configured.
// Mirrors the uniqueness behaviour of the real `gd_waitlist` table so the
// success/duplicate/error UX can be exercised locally without a live project.
const devFallbackEntries = new Set<string>();

async function insertWithDevFallback(
  entry: InsertWaitlistEntryInput
): Promise<InsertWaitlistResult> {
  if (devFallbackEntries.has(entry.emailNormalised)) {
    return "duplicate";
  }

  devFallbackEntries.add(entry.emailNormalised);
  console.log("[dev-fallback] waitlist insert", {
    email_normalised: entry.emailNormalised,
    source: entry.source,
    consent_version: CONSENT_VERSION,
    utm_source: entry.utmSource ?? null,
    utm_medium: entry.utmMedium ?? null,
    utm_campaign: entry.utmCampaign ?? null,
  });
  return "success";
}
// END DEV-ONLY FALLBACK

export async function insertWaitlistEntry(
  entry: InsertWaitlistEntryInput
): Promise<InsertWaitlistResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return insertWithDevFallback(entry);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("gd_waitlist").insert({
    email: entry.email,
    email_normalised: entry.emailNormalised,
    source: entry.source,
    consent_text: CONSENT_TEXT,
    consent_version: CONSENT_VERSION,
    user_agent: entry.userAgent ?? null,
    referrer: entry.referrer ?? null,
    utm_source: entry.utmSource ?? null,
    utm_medium: entry.utmMedium ?? null,
    utm_campaign: entry.utmCampaign ?? null,
  });

  if (error) {
    if (error.code === "23505") {
      return "duplicate";
    }
    throw error;
  }

  return "success";
}
