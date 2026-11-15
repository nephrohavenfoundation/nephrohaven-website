"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, partnershipLink, pilotLink } from "./content";
import { SiteSearch } from "./site-search";

function closeParentDialog(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("dialog")?.close();
}

export function SiteHeader({ variant = "home" }: { variant?: "home" | "interior" }) {
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const currentPage = (href: string) => (pathname === href ? "page" : undefined);
  const renderNavLink = (
    { href, label }: { href: string; label: string },
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void,
  ) => {
    // Use native fragment navigation so the browser can focus and scroll to the pilot.
    const NavLink = href === pilotLink.href ? "a" : Link;
    return (
      <NavLink key={href} href={href} aria-current={currentPage(href)} onClick={onClick}>
        {label}
      </NavLink>
    );
  };

  useEffect(() => {
    const marker = document.querySelector(".header-marker");
    if (!marker) return;

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(entry.boundingClientRect.bottom < 0);
    });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) panel.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled} data-variant={variant}>
      <nav className="shell main-nav" aria-label="Main navigation">
        <div className="nav-group">
          <Link
            className="brand-link"
            href={variant === "home" ? "#top" : "/"}
            aria-label="NephroHaven Foundation home"
          >
            <img
              className="brand-light"
              src="/images/nephrohaven-white.webp"
              alt=""
              width="440"
              height="347"
            />
            <img
              className="brand-color"
              src="/images/nephrohaven-color.webp"
              alt=""
              width="440"
              height="347"
            />
          </Link>
          <div className="nav-destinations">
            <div className="desktop-links">{navigation.map((item) => renderNavLink(item))}</div>
            <SiteSearch />
          </div>
        </div>
        <Link
          className="button nav-cta"
          href={partnershipLink.href}
          aria-current={currentPage(partnershipLink.href)}
        >
          {partnershipLink.label}
        </Link>
        <button
          className="menu-trigger"
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={() => panel.current?.showModal()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <dialog
        className="nav-drawer"
        ref={panel}
        aria-labelledby="menu-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="drawer-inner">
          <div className="drawer-heading">
            <h2 id="menu-title">Menu</h2>
            <form method="dialog">
              <button className="menu-trigger" type="submit" aria-label="Close menu" autoFocus>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="m5 5 14 14M19 5 5 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>
          {[...navigation, partnershipLink].map((item) => renderNavLink(item, closeParentDialog))}
        </div>
      </dialog>
    </header>
  );
}
