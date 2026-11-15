export const consentStorageKey = "nephrohaven-consent";
export const consentChangedEvent = "nephrohaven:consent";

export type AnalyticsConsent = "accepted" | "declined";

export type ConsentStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

function browserConsentStorage(): ConsentStorage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readAnalyticsConsent(storage?: ConsentStorage | null): AnalyticsConsent | null {
  const source = storage === undefined ? browserConsentStorage() : storage;
  const value = source?.getItem(consentStorageKey);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function writeAnalyticsConsent(choice: AnalyticsConsent, storage?: ConsentStorage | null) {
  const source = storage === undefined ? browserConsentStorage() : storage;
  source?.setItem(consentStorageKey, choice);
}
