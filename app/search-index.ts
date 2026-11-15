import { foundationLinks, partnershipLink, pilotLink, workLinks } from "./content";

const pages = [
  ...workLinks.filter(({ href }) => href !== pilotLink.href),
  ...foundationLinks,
  partnershipLink,
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/", label: "Home" },
];

const aliases: Record<string, string> = {
  "/about": "foundation founder founder's story leadership team mission",
  "/partners": "contact partnership contribute support donate donation",
  "/news": "updates progress news award",
  "/faq": "FAQ FAQs help answers",
  "/#pilot": "pilot project solar feasibility study",
};

export const searchSuggestions = [pilotLink, ...pages];

type SearchEntry = {
  href: string;
  title: string;
  page: string;
  description: string;
  passages: string[];
};

export type SearchIndex = { entries: SearchEntry[]; unavailable: number };

const cleanText = (text: string) => text.replace(/\s+/g, " ").trim();
const searchable = (text: string) => text
  .normalize("NFKD")
  .replace(/\p{M}/gu, "")
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .trim();

export function searchTerms(query: string) {
  return Array.from(new Set(searchable(query).split(" ").filter(Boolean)));
}

function passagesFrom(element: Element) {
  return Array.from(element.querySelectorAll("h1, h2, h3, p, li, dt, dd"))
    .filter((block) => !block.querySelector("h1, h2, h3, p, li, dt, dd"))
    .map((block) => cleanText(block.textContent ?? ""))
    .filter(Boolean);
}

async function readPage({ href, label }: (typeof pages)[number]): Promise<SearchEntry[]> {
  const response = await fetch(href);
  if (!response.ok) throw new Error(`Search could not load ${href}`);

  const template = document.createElement("template");
  // Template contents stay inert, so indexing HTML does not run scripts or load page images.
  template.innerHTML = await response.text();
  const main = template.content.querySelector("main");
  if (!main) throw new Error(`Search could not read ${href}`);

  const description = template.content.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  const sections = Array.from(main.querySelectorAll("section[id], article[id], .faq-answer[id]"));
  const entries = sections.flatMap((section) => {
    const heading = section.matches(".faq-answer")
      ? section.parentElement?.querySelector("summary")
      : section.querySelector("h2, h3");
    if (!heading) return [];

    return [{
      href: `${href}#${encodeURIComponent(section.id)}`,
      title: section.id === "pilot" && href === "/" ? pilotLink.label : cleanText(heading.textContent ?? ""),
      page: label,
      description: "",
      passages: passagesFrom(section),
    }];
  });

  sections.forEach((section) => section.remove());
  entries.unshift({ href, title: label, page: "", description, passages: passagesFrom(main) });
  return entries;
}

let pendingIndex: Promise<SearchIndex> | undefined;

export function loadSearchIndex() {
  pendingIndex ??= Promise.allSettled(pages.map(readPage)).then((pages) => {
    const entries = pages.flatMap((page) => page.status === "fulfilled" ? page.value : []);
    const unavailable = pages.filter((page) => page.status === "rejected").length;
    if (unavailable) pendingIndex = undefined;
    return { entries, unavailable };
  });
  return pendingIndex;
}

export function findSearchMatches(entries: SearchEntry[], terms: string[]) {
  const phrase = terms.join(" ");
  return entries.flatMap((entry) => {
    const title = searchable(entry.title);
    const keywords = searchable(aliases[entry.href] ?? "");
    const passages = [entry.description, ...entry.passages].filter((passage) => passage && passage !== entry.title);
    const normalizedPassages = passages.map(searchable);
    const corpus = [title, keywords, ...normalizedPassages].join(" ");
    if (!terms.every((term) => corpus.includes(term))) return [];

    const score = (title === phrase ? 30 : title.includes(phrase) ? 12 : 0)
      + terms.filter((term) => title.includes(term)).length * 4
      + terms.filter((term) => keywords.split(" ").includes(term)).length * 3;
    let excerpt = "";
    let excerptScore = 0;
    normalizedPassages.forEach((passage, index) => {
      const matches = terms.filter((term) => passage.includes(term)).length;
      if (matches > excerptScore || (matches > 0 && matches === excerptScore && passages[index].length > excerpt.length)) {
        excerptScore = matches;
        excerpt = passages[index];
      }
    });

    const snippet = excerpt || passages[0] || "";
    return [{ href: entry.href, title: entry.title, page: entry.page, snippet, score }];
  }).sort((first, second) => second.score - first.score);
}
