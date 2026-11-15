import { structuredData } from "./site-seo";

export function PageJsonLd({ path }: { path: string }) {
  const json = JSON.stringify(structuredData(path)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
