import { describe, expect, test } from "vitest";
import { analyticsScriptSources } from "./analytics-config";

describe("analytics scripts", () => {
  test("requests nothing until a provider key exists", () => {
    expect(analyticsScriptSources({})).toEqual([]);
    expect(analyticsScriptSources({ posthogKey: "  ", gaId: "" })).toEqual([]);
  });

  test("builds the PostHog and Google Analytics script addresses", () => {
    expect(analyticsScriptSources({ posthogKey: "ph_test" })).toEqual([
      { id: "nephrohaven-posthog", src: "https://us-assets.i.posthog.com/static/array.js" },
    ]);
    expect(
      analyticsScriptSources({
        posthogKey: "ph_eu",
        posthogHost: "https://eu.i.posthog.com",
        gaId: "G-TEST",
      }),
    ).toEqual([
      { id: "nephrohaven-posthog", src: "https://eu-assets.i.posthog.com/static/array.js" },
      { id: "nephrohaven-ga", src: "https://www.googletagmanager.com/gtag/js?id=G-TEST" },
    ]);
  });
});
