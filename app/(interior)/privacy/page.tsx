import type { ReactNode } from "react";
import { links } from "../../content";
import { EditorialLink, PageHero, pageMetadata } from "../editorial";
import { PageJsonLd } from "../../page-json-ld";

export const metadata = pageMetadata("/privacy");

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "this-website",
    title: "This website",
    body: (
      <>
        <p>
          This policy describes the NephroHaven Foundation website. The site shares our mission,
          programs, and ways to get involved.
        </p>
        <p>
          It does not provide medical advice, diagnosis, or emergency care, and it is not a patient
          portal. Nothing here asks you to send health information.
        </p>
      </>
    ),
  },
  {
    id: "information",
    title: "Information on this site",
    body: (
      <>
        <p>
          You do not need an account to read the site. The site has no forms that store personal
          information.
        </p>
        <p>
          Partnership inquiries go through our LinkedIn page. LinkedIn receives whatever you choose
          to send there and handles it under its own policy.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          The site works the same if you decline optional analytics. We store that choice in local
          storage on your device so we can respect it on a later visit.
        </p>
        <p>
          If you accept, and only when an analytics service is enabled, the site may use PostHog or
          Google Analytics. Those tools can set cookies and receive information such as the pages
          you visit, general location, and the kind of browser or device you use. We use that
          information to understand which pages are helpful.
        </p>
        <p>
          Until you accept, the site does not load those tools. We do not sell personal information.
        </p>
      </>
    ),
  },
  {
    id: "your-choice",
    title: "Your choice",
    body: (
      <p>
        Use Cookie settings in the footer to accept or decline analytics at any time. Declining
        stops analytics on your next page load.
      </p>
    ),
  },
  {
    id: "other-sites",
    title: "Other sites",
    body: (
      <p>
        Links to LinkedIn, social media, research, and news sites leave this website. Those
        organizations operate their own sites and policies.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        We will update this page if the way the site handles information changes. The date below
        shows when this policy was last updated.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageJsonLd path="/privacy" />
      <PageHero title="Privacy policy">
        <p className="lead">
          This page explains what this website does with information about visitors.
        </p>
        <p className="editorial-note">
          Last updated <time dateTime="2026-11-14">November 14, 2026</time>.
        </p>
      </PageHero>

      {sections.map(({ id, title, body }, index) => (
        <section
          className={index % 2 === 0 ? "editorial-chapter editorial-mist" : "editorial-chapter"}
          id={id}
          key={id}
        >
          <div className="shell editorial-prose">
            <h2>{title}</h2>
            {body}
          </div>
        </section>
      ))}

      <section className="editorial-chapter editorial-mist" id="contact">
        <div className="shell editorial-prose">
          <h2>Contact</h2>
          <p>Questions about this policy can be sent through the foundation’s LinkedIn page.</p>
          <EditorialLink href={links.linkedIn}>Contact NephroHaven on LinkedIn</EditorialLink>
        </div>
      </section>
    </>
  );
}
