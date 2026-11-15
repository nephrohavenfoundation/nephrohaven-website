import Link from "next/link";
import { FaqList } from "../../faq-list";
import { ConceptImage, EditorialLink, PageCta, PageHero, pageMetadata, StatusDate } from "../editorial";
import { illustrations } from "../illustrations";

export const metadata = pageMetadata(
  "Frequently asked questions",
  "Find answers about NephroHaven, solar-powered dialysis, patient subsidies, program availability, and getting involved.",
);

const fullQuestions = [
  {
    id: "about-the-foundation",
    title: "What is NephroHaven Foundation?",
    answer: "NephroHaven is a nonprofit working to expand access to sustainable kidney care through prevention, early detection, and solar-powered dialysis solutions. Founded by a nurse, the foundation brings together a multidisciplinary team.",
  },
  {
    id: "dialysis-center",
    title: "Does NephroHaven currently operate its own dialysis center?",
    answer: "Our first solar installation is at Trust Premium Hospital in Osu, Accra. A dedicated NephroHaven center is a future concept.",
  },
  {
    id: "solar-powered-dialysis",
    title: "What does solar-powered dialysis mean?",
    answer: "Our initial model combines solar energy with grid electricity. The feasibility study will assess electricity costs, power-related treatment interruptions, and patient affordability.",
  },
  {
    id: "cost-savings",
    title: "Have you demonstrated cost savings yet?",
    answer: "The foundation’s October update confirmed the panels were installed and identified commissioning and data collection as the next steps. We will share results when they are available.",
  },
  {
    id: "patient-subsidies",
    title: "How will savings benefit patients?",
    answer: "The feasibility study will examine what patients pay after any electricity savings are applied as subsidies.",
  },
  {
    id: "whole-person-care",
    title: "What does whole-person kidney care mean?",
    answer: "It means looking at the wider needs of people living with kidney disease, including emotional well-being, financial barriers, health education, and access to appropriate care.",
  },
  {
    id: "program-availability",
    title: "Are the mental health and training programs available now?",
    answer: "Both were preparing to launch as of the foundation’s October update. We will share participation details and how patients can access support as those programs develop.",
  },
  {
    id: "international-partners",
    title: "Can organizations outside Ghana partner with you?",
    answer: "Yes. We welcome local and international partners who can support the work in Ghana and help us develop the approach for wider use across Africa.",
  },
  {
    id: "get-involved",
    title: "How can I get involved?",
    answer: <>Visit our <Link href="/partners#contact">partnership page</Link> to reach us on LinkedIn. Tell us about yourself, your organization, and how you’d like to contribute.</>,
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero title="Frequently asked questions" media={
        <ConceptImage image={illustrations.dialysisRoom} priority />
      }>
        <p className="lead">Find out how the model works, where our programs stand, and how to get involved.</p>
        <StatusDate />
      </PageHero>

      <div className="shell interior-faq interior-faq-layout">
        <FaqList questions={fullQuestions} />
        <aside className="faq-related">
          <ConceptImage image={illustrations.careDiscussion} />
          <h2>Kidney care beyond dialysis</h2>
          <p>See how screening, patient support, and training fit into the model.</p>
          <EditorialLink href="/model">Explore our model</EditorialLink>
        </aside>
      </div>

      <PageCta title="Have more questions about partnering?" href="/partners" label="Explore partnerships">
        See where your organization’s expertise, equipment, or funding could support our work.
      </PageCta>
    </>
  );
}
