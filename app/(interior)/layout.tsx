import type { ReactNode } from "react";
import { SiteHeader } from "../site-header";
import { SiteFooter } from "../site-footer";
import "./interior.css";

export default function InteriorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="top" />
      <SiteHeader variant="interior" />
      <main id="main" className="interior-main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
