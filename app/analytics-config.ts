export type AnalyticsEnv = {
  posthogKey?: string;
  posthogHost?: string;
  gaId?: string;
};

export type AnalyticsScript = {
  id: string;
  src: string;
};

function present(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function analyticsScriptSources(env: AnalyticsEnv): AnalyticsScript[] {
  const sources: AnalyticsScript[] = [];
  const posthogKey = present(env.posthogKey);
  const gaId = present(env.gaId);

  if (posthogKey) {
    const host = present(env.posthogHost) ?? "https://us.i.posthog.com";
    const assets = host.replace(".i.posthog.com", "-assets.i.posthog.com");
    sources.push({ id: "nephrohaven-posthog", src: `${assets}/static/array.js` });
  }

  if (gaId) {
    sources.push({
      id: "nephrohaven-ga",
      src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`,
    });
  }

  return sources;
}

export function analyticsEnvFromProcess(): AnalyticsEnv {
  return {
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    gaId: process.env.NEXT_PUBLIC_GA_ID,
  };
}
