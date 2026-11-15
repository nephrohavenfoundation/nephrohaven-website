import Link from "next/link";
import { footerSocialLinks, foundationLinks, partnershipLink, pilotLink, workLinks } from "./content";

const footerGroups = [
  {
    title: "Our work",
    items: workLinks,
  },
  {
    title: "Foundation",
    items: [
      ...foundationLinks,
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Get involved",
    items: [partnershipLink],
  },
];

const socialIcons = [
  {
    name: "LinkedIn",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.57h.05a3.73 3.73 0 0 1 3.36-1.85c3.61 0 4.29 2.38 4.29 5.48v6.25ZM5.33 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9H7.1v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z",
  },
  {
    name: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.27.15 4.8 1.7 4.95 4.95.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.25-1.68 4.8-4.95 4.95-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.28-.15-4.8-1.7-4.95-4.95-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.25 1.68-4.8 4.95-4.95 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 2.66.27.27 2.65.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.39 2.58 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.39-.2 6.78-2.58 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.39-2.58-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  {
    name: "Facebook",
    path: "M12 0a12 12 0 0 0-1.88 23.85v-8.38H7.08V12h3.04V9.36c0-3 1.8-4.66 4.53-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 12 0Z",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="footer inverse">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <p>A safe place for dialysis care.</p>
            <p>Starting in Ghana. Building toward greater access across Africa.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerGroups.map(({ title, items }) => (
              <div className="footer-group" key={title}>
                <p>{title}</p>
                <ul>
                  {items.map(({ label, href }) => {
                    const NavLink = href === pilotLink.href ? "a" : Link;
                    return <li key={href}><NavLink href={href}>{label}</NavLink></li>;
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <a className="footer-identity" href="/#top" aria-label="NephroHaven Foundation home">
          <span className="footer-emblem" aria-hidden="true" />
          <span className="footer-wordmark" aria-hidden="true">NephroHaven</span>
        </a>

        <div className="footer-bottom">
          <a className="text-link" href="#top">Back to top <span aria-hidden="true">↑</span></a>
          <div className="footer-community">
            <span>© NephroHaven Foundation</span>
            <ul className="footer-socials" aria-label="Social media">
              {socialIcons.map(({ name, path }) => {
                const href = footerSocialLinks[name];
                const icon = <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={path} /></svg>;

                return (
                  <li key={name}>
                    {href
                      ? <a href={href} aria-label={name}>{icon}</a>
                      : <span role="img" aria-label={name}>{icon}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
