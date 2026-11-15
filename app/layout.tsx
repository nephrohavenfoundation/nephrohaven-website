import type { Metadata } from "next";
import "@fontsource/baskervville/latin-400.css";
import "@fontsource-variable/dm-sans";
import "./brand.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "NephroHaven Foundation | Kidney care within reach",
  description: "NephroHaven Foundation is developing a more affordable approach to kidney care through solar energy, community access, and whole-person support, starting in Ghana.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: "NephroHaven Foundation",
    description: "Developing a more affordable approach to kidney care, starting in Ghana.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
