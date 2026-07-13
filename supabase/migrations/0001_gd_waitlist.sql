-- Waitlist table for the Geodensity landing page.
-- Not yet applied against a live Supabase project — see lib/supabase-server.ts
-- for the dev-only in-memory fallback used until real credentials exist.

create table gd_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalised text not null unique,
  source text not null default 'landing_page',
  consent_text text not null,
  consent_version text not null default 'v1',
  created_at timestamptz not null default now(),
  user_agent text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);
