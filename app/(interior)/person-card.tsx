"use client";

import { useRef } from "react";

export type Person = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  email?: string;
};

const linkedInPath =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.57h.05a3.73 3.73 0 0 1 3.36-1.85c3.61 0 4.29 2.38 4.29 5.48v6.25ZM5.33 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9H7.1v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z";

const emailPath =
  "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2.2-8 5.2L4 6.2V6h16v.2ZM4 18V8.7l7.4 4.8a1 1 0 0 0 1.2 0L20 8.7V18H4Z";

function initials(name: string) {
  const words = name
    .split(/[\s,]+/)
    .map((word) => word.replace(/[^A-Za-z]/g, ""))
    .filter((word) => word.length > 1 && word !== word.toUpperCase());
  const first = words[0]?.charAt(0) ?? "";
  const last = words.length > 1 ? (words.at(-1)?.charAt(0) ?? "") : "";
  return (first + last).toUpperCase();
}

function ContactIcon({ href, label, path }: { href?: string; label: string; path: string }) {
  const icon = (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
  if (!href) {
    return (
      <span className="person-icon" aria-disabled="true" aria-label={label}>
        {icon}
      </span>
    );
  }
  return (
    <a className="person-icon" href={href} aria-label={label}>
      {icon}
    </a>
  );
}

export function PersonCard({ person }: { person: Person }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = `${person.id}-title`;

  return (
    <article className="person-card">
      <button type="button" onClick={() => dialog.current?.showModal()}>
        {person.image ? (
          <img src={person.image} alt="" width="480" height="640" />
        ) : (
          <span className="person-placeholder" aria-hidden="true">
            {initials(person.name)}
          </span>
        )}
        <span className="person-name">{person.name}</span>
        <span className="person-role">{person.role}</span>
      </button>
      <div className="person-links">
        <ContactIcon
          href={person.linkedin}
          label={person.linkedin ? `${person.name} on LinkedIn` : "LinkedIn"}
          path={linkedInPath}
        />
        <ContactIcon
          href={person.email ? `mailto:${person.email}` : undefined}
          label={person.email ? `Email ${person.name}` : "Email"}
          path={emailPath}
        />
      </div>
      <dialog className="person-dialog" ref={dialog} aria-labelledby={titleId}>
        <form method="dialog">
          <button className="person-close" type="submit">
            Close
          </button>
        </form>
        <h3 id={titleId}>{person.name}</h3>
        <p className="editorial-meta">{person.role}</p>
        <p>{person.bio}</p>
      </dialog>
    </article>
  );
}
