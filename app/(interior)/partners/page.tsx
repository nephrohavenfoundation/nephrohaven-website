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
const awardLine = "Presented the 2025 NurseHack4Health Pitch-A-Thon.";

const partners: {
  title: string;
  copy?: string;
  href?: string;
  label?: string;
  logo: { src: string; width: number; height: number; inverse: boolean; fit?: "cover" };
}[] = [
  {
    title: "Trust Premium Hospital",
    copy: "Hospital partner for the solar and grid dialysis feasibility study in Osu, Accra.",
    href: "https://thetrusthospital.com/trust-premium-hospital/",
    label: "Visit Trust Premium Hospital",
    logo: { src: "/images/the-trust-hospital-logo.png", width: 709, height: 288, inverse: false },
  },
  {
    title: "Akomapa Health",
    copy: "Community partner for screening, referrals, National Health Insurance Scheme registration support, and follow-up.",
    href: "https://www.akomapa.org/",
    label: "Visit Akomapa Health",
    logo: { src: "/images/akomapa-health-green.png", width: 2000, height: 400, inverse: false },
  },
  {
    title: "Johnson & Johnson",
    copy: awardLine,
    href: links.award,
    label: "Read about the award",
    logo: {
      src: "/images/johnson-johnson-logo-black-and-white.png",
      width: 2400,
      height: 2400,
      inverse: true,
      fit: "cover",
    },
  },
  {
    title: "Microsoft",
    copy: awardLine,
    href: links.award,
    label: "Read about the award",
    logo: {
      src: "/images/microsoft-logo-black-and-white.png",
      width: 2400,
      height: 513,
      inverse: true,
    },
  },
  {
    title: "SONSIEL",
    copy: awardLine,
    href: links.award,
    label: "Read about the award",
    logo: { src: "/images/sonsiel-white-lgo.webp", width: 1500, height: 567, inverse: true },
  },
  {
    title: "Yale",
    copy: "Bernard Abeiku Mensah is a doctoral student at Yale School of Nursing.",
    href: links.founder,
    label: "Read the Yale profile",
    logo: { src: "/images/yale-logo-white.png", width: 748, height: 324, inverse: true },
  },
  {
    title: "Ghana Health Service",
    logo: { src: "/images/ghs-official-logo.png", width: 1893, height: 2529, inverse: false },
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
                    data-fit={logo.fit}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>{title}</h3>
                {copy ? <p>{copy}</p> : null}
                {href && label ? <EditorialLink href={href}>{label}</EditorialLink> : null}
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
