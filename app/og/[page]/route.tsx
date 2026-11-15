import { pageBySlug, sitePages } from "../../site-seo";
import { shareImage } from "../../share-image";

export const dynamicParams = false;

export function generateStaticParams() {
  return sitePages.map((page) => ({ page: page.slug }));
}

export async function GET(_request: Request, context: { params: Promise<{ page: string }> }) {
  const { page: slug } = await context.params;
  const page = pageBySlug(slug);
  if (!page) return new Response("Not found", { status: 404 });
  return shareImage(page);
}
