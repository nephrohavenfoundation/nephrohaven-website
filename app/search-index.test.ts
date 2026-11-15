import { describe, expect, test } from "vitest";
import { searchTerms } from "./search-index";

describe("search terms", () => {
  test("normalizes case, punctuation, and repeated words", () => {
    expect(searchTerms("  Solar-powered, dialysis! ")).toEqual(["solar", "powered", "dialysis"]);
    expect(searchTerms("Care care")).toEqual(["care"]);
    expect(searchTerms("   ")).toEqual([]);
  });

  test("folds accents into plain letters", () => {
    expect(searchTerms("café")).toEqual(["cafe"]);
  });
});
