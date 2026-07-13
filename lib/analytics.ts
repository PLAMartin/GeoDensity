declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

function sendEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, props ?? {});
  }

  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
  }
}

export function trackPageView() {
  sendEvent("geodensity_page_view");
}

export function trackWaitlistFormStarted(source: string) {
  sendEvent("waitlist_form_started", { source });
}

export function trackWaitlistSubmitted(source: string) {
  sendEvent("waitlist_submitted", { source });
}

export function trackWaitlistDuplicate(source: string) {
  sendEvent("waitlist_duplicate", { source });
}

export function trackWaitlistError(source: string, reason?: string) {
  sendEvent("waitlist_error", reason ? { source, reason } : { source });
}

export function trackHeatmapHotspotViewed(hotspotId: string, category: string) {
  sendEvent("heatmap_hotspot_viewed", { hotspotId, category });
}

export function trackUseCaseViewed(useCase: string) {
  sendEvent("use_case_viewed", { useCase });
}
