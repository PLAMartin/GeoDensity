import { createClient } from "@supabase/supabase-js";
import { CONSENT_VERSION, type ValidatedWaitlistSubmission } from "./validation";

export type InsertWaitlistEntryInput = ValidatedWaitlistSubmission & {
  userAgent?: string;
};

export type InsertWaitlistResult = "success" | "duplicate";

const PRODUCT_NAME = "Geodensity";

// DEV-ONLY FALLBACK — remove this block once Supabase credentials are configured.
// Mirrors the uniqueness behaviour of the real `interest_register` table so the
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
    email: entry.emailNormalised,
    product_name: PRODUCT_NAME,
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

  // interest_register has no unique constraint on email, so duplicates are
  // checked explicitly rather than relying on a DB error code.
  const { data: existing, error: selectError } = await supabase
    .from("interest_register")
    .select("register_id")
    .eq("email", entry.emailNormalised)
    .eq("product_name", PRODUCT_NAME)
    .is("deleted_at", null)
    .maybeSingle();

  if (selectError) {
    throw selectError;
  }

  if (existing) {
    return "duplicate";
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const consentTimestamp = new Date().toISOString();

  const { error: insertError } = await supabase.from("interest_register").insert({
    email: entry.emailNormalised,
    product_name: PRODUCT_NAME,
    source: entry.source,
    status: "subscribed",
    consent_marketing: true,
    consent_privacy_policy: true,
    privacy_policy_version: CONSENT_VERSION,
    privacy_policy_url: siteUrl ? `${siteUrl}/privacy` : "/privacy",
    consent_terms: true,
    terms_version: CONSENT_VERSION,
    terms_url: siteUrl ? `${siteUrl}/terms` : "/terms",
    consent_timestamp: consentTimestamp,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return "duplicate";
    }
    throw insertError;
  }

  return "success";
}
