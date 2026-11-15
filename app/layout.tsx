import type { Metadata } from "next";
import "@fontsource/baskervville/latin-400.css";
import "@fontsource-variable/dm-sans";
import { Analytics } from "./analytics";
import { CookieNotice } from "./cookie-notice";
import { rootMetadata } from "./site-seo";
import "./brand.css";
import "./globals.css";

export const metadata: Metadata = rootMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <CookieNotice />
        <Analytics />
      </body>
    </html>
  );
}
