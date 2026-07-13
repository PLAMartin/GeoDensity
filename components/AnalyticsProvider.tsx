"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function AnalyticsProvider() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    trackPageView();
  }, []);

  if (!plausibleDomain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={plausibleDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
