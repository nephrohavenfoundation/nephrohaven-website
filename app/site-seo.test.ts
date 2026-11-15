import { describe, expect, test } from "vitest";
import { absoluteUrl, pageBySlug, previewCopy, sitePages, siteUrl } from "./site-seo";

describe("site metadata", () => {
  test("gives every public page a unique path, slug, and description", () => {
    const paths = sitePages.map((page) => page.path);
    const slugs = sitePages.map((page) => page.slug);
    expect(new Set(paths).size).toBe(paths.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(
      sitePages.every((page) => page.description.length > 40 && page.headline.length > 8),
    ).toBe(true);
    expect(pageBySlug("missing")).toBeUndefined();
  });

  test("builds canonical urls from the configured site address", () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.org/";
    expect(siteUrl()).toBe("https://example.org");
    expect(absoluteUrl("/")).toBe("https://example.org");
    expect(absoluteUrl("/about")).toBe("https://example.org/about");
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previous;
  });

  test("shortens preview copy on a word boundary", () => {
    expect(previewCopy("Short description.", 150)).toBe("Short description.");
    expect(previewCopy("Kidney care for families across Ghana and beyond the clinic.", 24)).toBe(
      "Kidney care for…",
    );
  });
});
