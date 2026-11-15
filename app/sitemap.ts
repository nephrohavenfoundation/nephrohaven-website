import type { MetadataRoute } from "next";
import { absoluteUrl, sitePages } from "./site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date("2026-11-14"),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: [absoluteUrl(`/og/${page.slug}`), ...(page.image ? [absoluteUrl(page.image)] : [])],
  }));
}
