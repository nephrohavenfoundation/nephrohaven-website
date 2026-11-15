import type { ReactNode } from "react";
import { links } from "../../content";
import { EditorialLink, PageHero, pageMetadata } from "../editorial";
import { PageJsonLd } from "../../page-json-ld";

export const metadata = pageMetadata("/terms");

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "using-this-site",
    title: "Using this site",
    body: (
      <p>
        These terms apply to your use of the NephroHaven Foundation website. If you do not agree
        with them, please leave the site.
      </p>
    ),
  },
  {
    id: "information-only",
    title: "Information only",
    body: (
      <>
        <p>
          The site describes our work. It is not medical advice, a diagnosis, or a promise of
          treatment, cost savings, or outcomes. For medical care, contact a qualified clinician or
          local emergency services.
        </p>
        <p>
          Program descriptions can change. A page may describe work that is installed, underway,
          preparing to launch, or still a future concept.
        </p>
      </>
    ),
  },
  {
    id: "no-patient-services",
    title: "No patient services on this site",
    body: (
      <p>
        This website is not a clinic and it does not provide a patient portal, appointments, or a
        way to send medical records.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The text, design, and NephroHaven name on this site belong to NephroHaven Foundation or
        their respective owners. You may share links to public pages. Please ask before reusing the
        site’s materials for a commercial purpose.
      </p>
    ),
  },
  {
    id: "other-sites",
    title: "Other sites",
    body: (
      <p>
        The site links to organizations such as LinkedIn, hospitals, research publishers, and social
        networks. We are not responsible for those sites or for what you share with them.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <p>
        Please use the site for its public, informational purpose. Do not attempt to disrupt it,
        gain access you were not given, or misuse it.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Availability",
    body: (
      <p>
        The site is provided as it is available. We may change, remove, or pause content. To the
        extent the law allows, NephroHaven Foundation is not liable for loss or damage that comes
        from using this informational website.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        The foundation works from Ghana. These terms are governed by the laws of Ghana. That does
        not take away rights that the law where you live does not allow to be waived.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        We may update these terms on this page. The date below shows when they were last updated.
        Continuing to use the site after an update means you accept the updated terms.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <PageJsonLd path="/terms" />
      <PageHero title="Terms of service">
        <p className="lead">These terms cover use of the NephroHaven Foundation website.</p>
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
          <p>Questions about these terms can be sent through the foundation’s LinkedIn page.</p>
          <EditorialLink href={links.linkedIn}>Contact NephroHaven on LinkedIn</EditorialLink>
        </div>
      </section>
    </>
  );
}
