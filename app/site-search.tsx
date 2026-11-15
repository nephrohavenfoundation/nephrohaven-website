"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Arrow } from "./arrow";
import { findSearchMatches, loadSearchIndex, searchSuggestions, searchTerms } from "./search-index";
import type { SearchIndex } from "./search-index";
import "./site-search.css";

export function SiteSearch() {
  const titleId = useId();
  const inputId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const results = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndex>();
  const [loading, setLoading] = useState(false);

  const terms = searchTerms(query);
  const hasQuery = terms.length > 0;
  const matches = index && hasQuery ? findSearchMatches(index.entries, terms) : [];
  const items = hasQuery
    ? matches
    : searchSuggestions.map(({ href, label }) => ({ href, title: label, page: "", snippet: "" }));

  const status = hasQuery
    ? index
      ? matches.length
        ? `${matches.length} result${matches.length === 1 ? "" : "s"}`
        : index.unavailable
          ? ""
          : "No matches. Try a different search."
      : "Searching the website…"
    : "";

  async function refreshIndex() {
    setLoading(true);
    setIndex(await loadSearchIndex());
    setLoading(false);
  }

  return (
    <>
      <button
        className="search-trigger"
        type="button"
        aria-label="Search website"
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal();
          input.current?.focus();
        }}
      >
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.7" cy="10.7" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="m15.3 15.3 4.4 4.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <dialog
        className="site-search"
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => setQuery("")}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="search-shell">
          <div className="search-heading">
            <h2 id={titleId}>Search the site</h2>
            <form method="dialog">
              <button type="submit" className="search-close" aria-label="Close search">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          <label className="search-label" htmlFor={inputId}>
            Search pages and FAQs
          </label>
          <input
            id={inputId}
            type="search"
            ref={input}
            value={query}
            maxLength={120}
            autoComplete="off"
            placeholder="Search pages and FAQs…"
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              if (!index && !loading && searchTerms(event.currentTarget.value).length)
                void refreshIndex();
            }}
            onKeyDown={(event) => {
              const firstResult = results.current?.querySelector("a");
              if (!firstResult) return;
              if (event.key === "ArrowDown") {
                event.preventDefault();
                firstResult.focus();
              }
              if (event.key === "Enter") {
                event.preventDefault();
                firstResult.click();
              }
            }}
          />

          <div className="search-body">
            <p className="search-status" role="status">
              {status}
            </p>
            {hasQuery && !!index?.unavailable && (
              <div className="search-retry">
                <span>Some pages are temporarily unavailable.</span>
                <button type="button" disabled={loading} onClick={() => void refreshIndex()}>
                  {loading ? "Retrying…" : "Try again"}
                </button>
              </div>
            )}
            <ul
              className="search-results"
              ref={results}
              aria-label={hasQuery ? "Search results" : "Suggested pages"}
            >
              {items.map(({ href, title, page, snippet }) => {
                const ResultLink = href.includes("#") ? "a" : Link;
                return (
                  <li key={href}>
                    <ResultLink href={href} onClick={() => dialog.current?.close()}>
                      <div>
                        <span className="search-result-title">{title}</span>
                        {page && <span className="search-result-page">{page}</span>}
                        {snippet && <span className="search-result-snippet">{snippet}</span>}
                      </div>
                      <Arrow />
                    </ResultLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
