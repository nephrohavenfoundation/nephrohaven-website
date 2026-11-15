import { describe, expect, test } from "vitest";
import { consentStorageKey, readAnalyticsConsent, writeAnalyticsConsent } from "./consent";
import type { ConsentStorage } from "./consent";

function memoryStorage(initial?: string): ConsentStorage {
  const values = new Map<string, string>();
  if (initial) values.set(consentStorageKey, initial);
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
}

describe("analytics consent", () => {
  test("ignores a missing or unknown choice", () => {
    expect(readAnalyticsConsent(memoryStorage())).toBeNull();
    expect(readAnalyticsConsent(memoryStorage("later"))).toBeNull();
    expect(readAnalyticsConsent(null)).toBeNull();
  });

  test("stores accept and decline", () => {
    const storage = memoryStorage();
    writeAnalyticsConsent("accepted", storage);
    expect(readAnalyticsConsent(storage)).toBe("accepted");
    writeAnalyticsConsent("declined", storage);
    expect(storage.getItem(consentStorageKey)).toBe("declined");
  });
});
