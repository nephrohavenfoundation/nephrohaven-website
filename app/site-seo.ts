import type { Metadata } from "next";
import { links } from "./content";
import { faqEntries } from "./faq-entries";

export const siteName = "NephroHaven Foundation";
export const shareImageSize = { width: 1200, height: 630 } as const;

export type SitePage = {
  path: string;
  slug: string;
  kind: "home" | "page" | "faq" | "legal";
  title: string;
  headline: string;
  description: string;
  image?: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const sitePages: readonly SitePage[] = [
  {
    path: "/",
    slug: "home",
    kind: "home",
    title: "Kidney care within reach",
    headline: "More affordable dialysis. Powered by the sun.",
    description:
      "NephroHaven Foundation is developing a more affordable approach to kidney care through solar energy, community access, and whole-person support, starting in Ghana.",
    image: "/images/whole-person-care.webp",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    slug: "about",
    kind: "page",
    title: "About us",
    headline: "A safe place for dialysis care",
    description:
      "Meet the nurse-led team behind NephroHaven Foundation and learn how frontline experience in Ghana shaped its mission for affordable kidney care.",
    image: "/images/dialysis-room.webp",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/programs",
    slug: "programs",
    kind: "page",
    title: "Our programs",
    headline: "Kidney care beyond each session",
    description:
      "Explore NephroHaven’s solar and grid feasibility study, community screening, planned mental health integration, and training for kidney care.",
    image: "/images/community-care.webp",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/model",
    slug: "model",
    kind: "page",
    title: "Our model",
    headline: "Lower delivery costs. Greater access.",
    description:
      "See how NephroHaven connects solar energy, patient affordability, community access, mental health, and workforce development in Ghana.",
    image: "/images/whole-person-care.webp",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/partners",
    slug: "partners",
    kind: "page",
    title: "Partner with us",
    headline: "Help make affordable kidney care possible",
    description:
      "Find out how funders, hospitals, community organizations, educators, public agencies, and technical partners can work with NephroHaven Foundation.",
    image: "/images/partnership-table.webp",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/news",
    slug: "news",
    kind: "page",
    title: "News & progress",
    headline: "News and progress from Ghana",
    description:
      "Follow NephroHaven’s solar installation at Trust Premium Hospital and its NurseHack4Health Pitch-A-Thon recognition.",
    image: "/images/solar-study.webp",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/faq",
    slug: "faq",
    kind: "faq",
    title: "Frequently asked questions",
    headline: "Questions about NephroHaven",
    description:
      "Find answers about NephroHaven, solar-powered dialysis, patient subsidies, program availability, and getting involved.",
    image: "/images/care-training.webp",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    slug: "privacy",
    kind: "legal",
    title: "Privacy policy",
    headline: "Privacy policy",
    description:
      "How NephroHaven Foundation handles information on this website, including optional analytics cookies.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    slug: "terms",
    kind: "legal",
    title: "Terms of service",
    headline: "Terms of service",
    description:
      "The terms for using the NephroHaven Foundation website, an informational site about our work in kidney care.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const preview = process.env.VERCEL_URL;
  const value =
    configured ||
    (production
      ? `https://${production}`
      : preview
        ? `https://${preview}`
        : "http://localhost:3000");
  return value.replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  if (path === "/") return siteUrl();
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageByPath(path: string) {
  const page = sitePages.find((entry) => entry.path === path);
  if (!page) throw new Error(`Unknown site page: ${path}`);
  return page;
}

export function pageBySlug(slug: string) {
  return sitePages.find((entry) => entry.slug === slug);
}

export function documentTitle(page: SitePage) {
  return page.kind === "home" ? `${siteName} | ${page.title}` : `${page.title} | ${siteName}`;
}

export function previewCopy(description: string, max = 150) {
  const text = description.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const clipped = text.slice(0, max - 1);
  const space = clipped.lastIndexOf(" ");
  const end = space >= Math.min(40, max * 0.6) ? space : clipped.length;
  return `${clipped
    .slice(0, end)
    .trimEnd()
    .replace(/[,:;]+$/, "")}…`;
}

function schemaType(kind: SitePage["kind"]) {
  switch (kind) {
    case "faq":
      return "FAQPage";
    case "home":
    case "page":
    case "legal":
      return "WebPage";
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

function socialMetadata(page: SitePage): Pick<Metadata, "openGraph" | "twitter"> {
  const image = `/og/${page.slug}`;
  return {
    openGraph: {
      type: "website",
      locale: "en_GH",
      url: absoluteUrl(page.path),
      siteName,
      title: page.headline,
      description: page.description,
      images: [
        {
          url: image,
          width: shareImageSize.width,
          height: shareImageSize.height,
          alt: page.headline,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.headline,
      description: page.description,
      images: [image],
    },
  };
}

export function rootMetadata(): Metadata {
  const home = pageByPath("/");
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: documentTitle(home),
      template: `%s | ${siteName}`,
    },
    description: home.description,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl() }],
    creator: siteName,
    publisher: siteName,
    category: "Nonprofit",
    alternates: { canonical: absoluteUrl("/") },
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: [{ url: "/images/nephrohaven-color.webp", type: "image/webp" }],
      apple: [{ url: "/images/nephrohaven-color.webp" }],
    },
    ...socialMetadata(home),
    robots: indexRobots,
  };
}

export function pageMetadata(path: string): Metadata {
  const page = pageByPath(path);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(page.path) },
    ...socialMetadata(page),
    robots: indexRobots,
  };
}

export function structuredData(path: string) {
  const page = pageByPath(path);
  const origin = siteUrl();
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(`/og/${page.slug}`);
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
    ...(page.path === "/"
      ? []
      : [{ "@type": "ListItem", position: 2, name: page.title, item: url }]),
  ];
  const webPage: Record<string, unknown> = {
    "@type": schemaType(page.kind),
    "@id": `${url}#webpage`,
    url,
    name: documentTitle(page),
    headline: page.headline,
    description: page.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: image,
      width: shareImageSize.width,
      height: shareImageSize.height,
    },
    inLanguage: "en",
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  if (page.kind === "faq") {
    webPage.mainEntity = faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.title,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    }));
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NGO", "Organization"],
        "@id": organizationId,
        name: siteName,
        url: origin,
        description: pageByPath("/").description,
        logo: absoluteUrl("/images/nephrohaven-color.webp"),
        image,
        areaServed: { "@type": "Country", name: "Ghana" },
        knowsAbout: ["Kidney care", "Dialysis", "Solar energy", "Community health"],
        sameAs: [links.linkedIn],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: origin,
        name: siteName,
        description: pageByPath("/").description,
        publisher: { "@id": organizationId },
        inLanguage: "en",
      },
      webPage,
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs,
      },
    ],
  };
}
