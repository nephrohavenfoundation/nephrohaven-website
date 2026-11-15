"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import {
  type AnalyticsConsent,
  consentChangedEvent,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "./consent";

let settingsOpen = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((listener) => listener());
}

function noticeIsOpen() {
  return settingsOpen || readAnalyticsConsent() === null;
}

function choiceLabel(choice: AnalyticsConsent) {
  switch (choice) {
    case "accepted":
      return "Analytics are on.";
    case "declined":
      return "Analytics are off.";
    default: {
      const neverChoice: never = choice;
      return neverChoice;
    }
  }
}

export function CookieNotice() {
  const open = useSyncExternalStore(subscribe, noticeIsOpen, () => false);
  const current = useSyncExternalStore(subscribe, readAnalyticsConsent, () => null);

  useEffect(() => {
    document.body.classList.toggle("has-cookie-notice", open);
    return () => document.body.classList.remove("has-cookie-notice");
  }, [open]);

  if (!open) return null;

  function choose(choice: AnalyticsConsent) {
    const previous = readAnalyticsConsent();
    writeAnalyticsConsent(choice);
    settingsOpen = false;
    emit();
    window.dispatchEvent(new Event(consentChangedEvent));
    if (previous && previous !== choice) window.location.reload();
  }

  return (
    <div className="cookie-notice" role="region" aria-labelledby="cookie-notice-title">
      <div className="cookie-notice-inner">
        <div>
          <h2 id="cookie-notice-title">Cookies on this site</h2>
          <p>
            Optional analytics help us see which pages are useful. The site works the same if you
            decline. <Link href="/privacy">Read the privacy policy</Link>.
          </p>
          {current ? <p className="cookie-status">{choiceLabel(current)}</p> : null}
        </div>
        <div className="cookie-actions">
          <button className="button button-quiet" type="button" onClick={() => choose("declined")}>
            Decline
          </button>
          <button className="button" type="button" onClick={() => choose("accepted")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      className="footer-legal-button"
      type="button"
      onClick={() => {
        settingsOpen = true;
        emit();
      }}
    >
      Cookie settings
    </button>
  );
}
