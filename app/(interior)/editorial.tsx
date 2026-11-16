import type { ReactNode } from "react";
import Link from "next/link";
import { Arrow } from "../arrow";
import type { Photo } from "../photos";

export { pageMetadata } from "../site-seo";

export function EditorialLink({
  href,
  children,
  button = false,
}: {
  href: string;
  children: ReactNode;
  button?: boolean;
}) {
  const external = href.startsWith("https://");
  const className = button ? "button" : "text-link";
  const label = (
    <>
      {children}
      <Arrow external={external} />
    </>
  );
  return external ? (
    <a className={className} href={href}>
      {label}
    </a>
  ) : (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

export function PageHero({
  title,
  children,
  media,
}: {
  title: string;
  children: ReactNode;
  media?: ReactNode;
}) {
  return (
    <header className="editorial-hero">
      <div className={media ? "shell editorial-hero-split" : "shell editorial-hero-text"}>
        <div className="editorial-hero-copy">
          <h1>{title}</h1>
          <div className="editorial-intro">{children}</div>
        </div>
        {media}
      </div>
    </header>
  );
}

export function PageCta({
  title,
  children,
  href,
  label,
}: {
  title: string;
  children: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <section className="editorial-cta inverse">
      <div className="shell">
        <h2>{title}</h2>
        <div>
          <p className="lead">{children}</p>
          <EditorialLink href={href} button>
            {label}
          </EditorialLink>
        </div>
      </div>
    </section>
  );
}

export function StatusDate() {
  return (
    <p className="editorial-note">
      Program status as of <time dateTime="2026-10-11">October 11, 2026</time>.
    </p>
  );
}

export function EditorialPhoto({ image, priority = false }: { image: Photo; priority?: boolean }) {
  return (
    <div className="editorial-media">
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        data-monochrome={image.monochrome || undefined}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </div>
  );
}
