"use client";

import { useEffect } from "react";
import { analyticsEnvFromProcess, analyticsScriptSources } from "./analytics-config";
import { consentChangedEvent, readAnalyticsConsent } from "./consent";

type PostHogStub = {
  __SV?: number;
  _i: unknown[][];
  init: (key: string, options: { api_host: string }) => void;
};

declare global {
  interface Window {
    posthog?: PostHogStub;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function enablePostHog(key: string, src: string, apiHost: string) {
  if (document.getElementById("nephrohaven-posthog")) return;

  const posthog: PostHogStub = window.posthog ?? { _i: [], init: () => undefined };
  posthog.init =
    window.posthog?.init ??
    ((apiKey, options) => {
      posthog._i.push([apiKey, options]);
    });
  posthog.__SV = 1;
  window.posthog = posthog;
  posthog.init(key, { api_host: apiHost });
  appendScript("nephrohaven-posthog", src);
}

function enableGoogleAnalytics(gaId: string, src: string) {
  if (document.getElementById("nephrohaven-ga")) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaId);
  appendScript("nephrohaven-ga", src);
}

export function enableAnalytics() {
  if (readAnalyticsConsent() !== "accepted") return;

  const env = analyticsEnvFromProcess();
  const sources = analyticsScriptSources(env);
  const posthogKey = env.posthogKey?.trim();
  const posthogHost = env.posthogHost?.trim() || "https://us.i.posthog.com";
  const gaId = env.gaId?.trim();

  for (const source of sources) {
    if (source.id === "nephrohaven-posthog" && posthogKey)
      enablePostHog(posthogKey, source.src, posthogHost);
    if (source.id === "nephrohaven-ga" && gaId) enableGoogleAnalytics(gaId, source.src);
  }
}

export function Analytics() {
  useEffect(() => {
    enableAnalytics();
    window.addEventListener(consentChangedEvent, enableAnalytics);
    return () => window.removeEventListener(consentChangedEvent, enableAnalytics);
  }, []);

  return null;
}
