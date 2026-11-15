import { links } from "../../content";
import { ConceptImage, EditorialLink, PageCta, PageHero, pageMetadata } from "../editorial";
import { illustrations } from "../illustrations";
import { PageJsonLd } from "../../page-json-ld";
import { PersonCard, type Person } from "../person-card";

export const metadata = pageMetadata("/about");

const principles = [
  {
    title: "Affordability",
    copy: "We look for ways to reduce the cost of providing care and pass savings on to patients.",
  },
  {
    title: "Dignity",
    copy: "We consider the emotional and financial realities of living with kidney disease alongside treatment.",
  },
  {
    title: "Frontline innovation",
    copy: "Our work draws on the experience of nurses and the wider teams who care for patients every day.",
  },
  {
    title: "Environmental responsibility",
    copy: "We are exploring how renewable energy can support kidney care with less dependence on grid electricity.",
  },
  {
    title: "Evidence and accountability",
    copy: "We will evaluate the model, share what we learn, and use the findings to guide future growth.",
  },
];

const leadership: Person[] = [
  {
    id: "bernard-mensah",
    name: "Bernard Abeiku Mensah, MN, RN",
    role: "Founder and President",
    bio: "Bernard is a nurse and doctoral student at Yale School of Nursing. His experience at Cape Coast Teaching Hospital shaped the foundation’s focus on dialysis affordability and reliable energy.",
  },
  {
    id: "jeanelle-forson",
    name: "Jeanelle Forson",
    role: "Chief Operations Officer",
    bio: "Jeanelle leads operational coordination and supports program development and delivery.",
  },
  {
    id: "brian-fleischer",
    name: "Brian Amu Fleischer, MD",
    role: "Chief Strategy Officer",
    bio: "Brian leads strategy, partnerships, innovation, and long-term planning for NephroHaven.",
  },
];

const advisory: Person[] = [1, 2, 3].map((slot) => ({
  id: `advisory-${slot}`,
  name: "Advisory board member",
  role: "To be announced",
  bio: "Biography coming soon.",
}));

// Owner review: confirm preferred names, current credentials and roles, full biographies, and photo permissions.
const foundingTeam = [
  "Samuel Appiagyei",
  "Bernard Frempong",
  "Esther Gyebi",
  "Faisal Adomako-Duku",
  "Frederick Agaaya Adongo",
];

export default function AboutPage() {
  return (
    <>
      <PageJsonLd path="/about" />
      <PageHero
        title="A safe place for dialysis care"
        media={<ConceptImage image={illustrations.dialysisCare} priority />}
      >
        <p className="lead">
          NephroHaven is a nurse-led nonprofit working to expand access to sustainable kidney care
          through prevention, early detection, and solar-powered dialysis solutions.
        </p>
        <EditorialLink href="#founder">Read our founder’s story</EditorialLink>
      </PageHero>

      <section className="editorial-chapter" id="team">
        <div className="shell">
          <h2>Leadership</h2>
          <ul className="person-grid">
            {leadership.map((person) => (
              <li key={person.id}>
                <PersonCard person={person} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="editorial-chapter editorial-mist" id="advisory">
        <div className="shell">
          <h2>Advisory board</h2>
          <ul className="person-grid">
            {advisory.map((person) => (
              <li key={person.id}>
                <PersonCard person={person} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="editorial-chapter editorial-mist">
        <div className="shell">
          <div className="editorial-pair">
            <div>
              <h2>Our mission</h2>
              <p className="lead">
                Make kidney care more affordable and accessible through solar-powered dialysis,
                prevention, and whole-person support.
              </p>
            </div>
            <div>
              <h2>Our vision</h2>
              <p className="lead">
                A future where people can get the kidney care they need without prohibitive costs or
                unreliable power. We are starting in Ghana and working toward an approach that can
                serve underserved communities across Africa.
              </p>
            </div>
          </div>
          <div className="editorial-image-band">
            <ConceptImage image={illustrations.accra} format="wide" />
          </div>
        </div>
      </section>

      <section className="editorial-chapter" id="founder">
        <div className="shell editorial-photo-row">
          <div className="editorial-photo-copy editorial-prose">
            <h2>Our founder’s story</h2>
            <p>
              As a community nurse at Cape Coast Teaching Hospital, Bernard Abeiku Mensah saw
              families struggle to pay for dialysis week after week. Unreliable electricity added
              uncertainty to treatment. Those experiences led him to ask whether lowering the cost
              of delivering dialysis could make it more accessible to patients.
            </p>
            <p>
              Bernard is pursuing a PhD in Nursing at Yale University. His research examines how
              social determinants of health influence sleep and type 2 diabetes management in low-
              and middle-income countries, with a focus on Ghana. He holds a Master of Nursing from
              the University of Alberta and a Bachelor of Science in Nursing from Valley View
              University.
            </p>
            <EditorialLink href={links.founder}>
              Read Yale School of Nursing’s profile
            </EditorialLink>
          </div>
          <ConceptImage image={illustrations.communityCare} />
        </div>
      </section>

      <section className="editorial-chapter editorial-mist">
        <div className="shell editorial-split">
          <div className="editorial-photo-heading">
            <h2>What guides us</h2>
            <ConceptImage image={illustrations.dialysisRoom} />
          </div>
          <dl className="editorial-definitions">
            {principles.map(({ title, copy }) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="editorial-chapter">
        <div className="shell">
          <div className="editorial-photo-row">
            <div className="editorial-photo-copy editorial-prose">
              <h2>Our founding team</h2>
              <p>
                Our founding team brings together experience in clinical care, nursing research,
                public health, biomedical engineering, and law.
              </p>
              <ul className="team-names">
                {foundingTeam.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
            <ConceptImage image={illustrations.partnership} />
          </div>
        </div>
      </section>

      <PageCta title="Help bring kidney care within reach" href="/partners" label="Partner with us">
        Work with our team on patient affordability, reliable energy, or community care.
      </PageCta>
    </>
  );
}
