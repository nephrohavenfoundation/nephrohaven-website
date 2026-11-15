import { links } from "../../content";
import { ConceptImage, EditorialLink, PageHero, pageMetadata } from "../editorial";
import { illustrations } from "../illustrations";
import { PageJsonLd } from "../../page-json-ld";

export const metadata = pageMetadata("/partners");

const contributions = [
  {
    title: "Fund access and growth",
    copy: "Support patient affordability, community care, mental health integration, training, and the capacity to reach more people.",
  },
  {
    title: "Bring expertise and technology",
    copy: "Contribute solar engineering, equipment, maintenance, clinical expertise, research, or professional training.",
  },
  {
    title: "Build the next implementation",
    copy: "Help evaluate future sites, develop service partnerships, or explore mission-aligned funding for expansion.",
  },
];

const partnerTypes = [
  {
    title: "Funders, companies, and diaspora supporters",
    copy: "Provide grants, sponsorship, donations, or in-kind support for programs and growth.",
  },
  {
    title: "Government and public agencies",
    copy: "Collaborate on access, insurance pathways, workforce development, and evidence for wider implementation.",
  },
  {
    title: "Hospitals and private facilities",
    copy: "Explore renewable energy integration and how the model could work in your facility.",
  },
  {
    title: "Universities and training institutions",
    copy: "Collaborate on research, economic evaluation, mentorship, and professional education.",
  },
  {
    title: "Nonprofits and community organizations",
    copy: "Strengthen screening, referrals, insurance registration support, and continuing care.",
  },
  {
    title: "Energy and technical partners",
    copy: "Support solar system performance, equipment maintenance, monitoring, and future installations.",
  },
  {
    title: "Impact-focused financing partners",
    copy: "Explore mission-aligned financing for future expansion as feasibility evidence develops.",
  },
];

// Owner review: confirm additional institutional relationships, award mark permissions,
// contact details, inquiry delivery, and privacy copy before publishing those additions.
const partners = [
  {
    title: "Trust Premium Hospital",
    copy: "Hospital partner for the solar and grid dialysis feasibility study in Osu, Accra.",
    href: "https://thetrusthospital.com/trust-premium-hospital/",
    label: "Visit Trust Premium Hospital",
    logo: { src: "/images/trust-hospital-white.png", width: 868, height: 869, inverse: true },
  },
  {
    title: "Akomapa Health",
    copy: "Community partner for screening, referrals, National Health Insurance Scheme registration support, and follow-up.",
    href: "https://www.akomapa.org/",
    label: "Visit Akomapa Health",
    logo: { src: "/images/akomapa-logo-dark.png", width: 2000, height: 400, inverse: false },
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageJsonLd path="/partners" />
      <PageHero
        title="Help make affordable kidney care possible"
        media={<ConceptImage image={illustrations.partnership} priority />}
      >
        <p className="lead">
          Work with us to evaluate renewable energy for dialysis and help more people find and
          afford kidney care in Ghana.
        </p>
        <EditorialLink href="#contact" button>
          Start a conversation
        </EditorialLink>
      </PageHero>

      <section className="editorial-chapter" id="contact">
        <div className="shell">
          <h2>Get in touch</h2>
          <div className="contact-options">
            <article>
              <ConceptImage image={illustrations.accra} format="wide" />
              <div className="contact-option-copy">
                <h3>Partnership inquiries</h3>
                <p>Tell us about yourself, your organization, and how you’d like to contribute.</p>
                <EditorialLink href={links.linkedIn} button>
                  Connect on LinkedIn
                </EditorialLink>
              </div>
            </article>
            <article>
              <ConceptImage image={illustrations.careDiscussion} format="wide" />
              <div className="contact-option-copy">
                <h3>Questions about our work</h3>
                <p>Find answers on the pilot, patient subsidies, and getting involved.</p>
                <EditorialLink href="/faq">Read the FAQs</EditorialLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="editorial-chapter editorial-mist">
        <div className="shell">
          <h2>Three ways to contribute</h2>
          <ol className="editorial-columns contribution-list">
            {contributions.map(({ title, copy }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="editorial-chapter">
        <div className="shell editorial-split">
          <div className="editorial-photo-heading">
            <h2>Find your partnership</h2>
            <ConceptImage image={illustrations.solarRooftop} />
          </div>
          <dl className="editorial-definitions">
            {partnerTypes.map(({ title, copy }) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="editorial-chapter editorial-mist">
        <div className="shell">
          <h2>Partners and recognition</h2>
          <div className="editorial-columns partner-recognition">
            {partners.map(({ title, copy, href, label, logo }) => (
              <article key={title}>
                <div className="partner-mark" data-inverse={logo.inverse}>
                  <img
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <EditorialLink href={href}>{label}</EditorialLink>
              </article>
            ))}
            <article>
              <ConceptImage image={illustrations.training} format="wide" />
              <h3>2025 NurseHack4Health™</h3>
              <p>
                Track 2 award recognition for the proposed solar-powered dialysis model. Johnson
                &amp; Johnson, Microsoft, and SONSIEL presented the Pitch-A-Thon with support from
                the Johnson &amp; Johnson Foundation.
              </p>
              <EditorialLink href="/news#nursehack4health">Read about the award</EditorialLink>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
