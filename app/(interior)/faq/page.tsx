import Link from "next/link";
import { faqEntries } from "../../faq-entries";
import { FaqList } from "../../faq-list";
import { EditorialLink, PageCta, PageHero, pageMetadata, StatusDate } from "../editorial";
import { PageJsonLd } from "../../page-json-ld";

export const metadata = pageMetadata("/faq");

const fullQuestions = faqEntries.map((entry) =>
  entry.id === "get-involved"
    ? {
        ...entry,
        answer: (
          <>
            Visit our <Link href="/partners#contact">partnership page</Link> to reach us on
            LinkedIn. Tell us about yourself, your organization, and how you’d like to contribute.
          </>
        ),
      }
    : entry,
);

export default function FaqPage() {
  return (
    <>
      <PageJsonLd path="/faq" />
      <PageHero title="Frequently asked questions">
        <p className="lead">
          Find out how the model works, where our programs stand, and how to get involved.
        </p>
        <StatusDate />
      </PageHero>

      <div className="shell interior-faq interior-faq-layout">
        <FaqList questions={fullQuestions} />
        <aside className="faq-related">
          <h2>Kidney care beyond dialysis</h2>
          <p>See how screening, patient support, and training fit into the model.</p>
          <EditorialLink href="/model">Explore our model</EditorialLink>
        </aside>
      </div>

      <PageCta
        title="Have more questions about partnering?"
        href="/partners"
        label="Explore partnerships"
      >
        See where your organization’s expertise, equipment, or funding could support our work.
      </PageCta>
    </>
  );
}
