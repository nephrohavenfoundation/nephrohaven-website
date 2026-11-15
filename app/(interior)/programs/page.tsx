import { pilotSteps, programs } from "../../content";
import {
  ConceptImage,
  EditorialLink,
  PageCta,
  PageHero,
  pageMetadata,
  StatusDate,
} from "../editorial";
import { illustrations } from "../illustrations";
import { PageJsonLd } from "../../page-json-ld";

export const metadata = pageMetadata("/programs");

const [study, community, mentalHealth, training] = programs;

const chapters = [
  {
    id: "solar-study",
    program: study,
    image: illustrations.solarInstallation,
    description:
      "At Trust Premium Hospital in Osu, Accra, we plan to evaluate a system that combines solar and grid electricity in an existing dialysis unit. The findings will help identify what other facilities would need to use the approach.",
    partnership:
      "Support the evaluation, contribute technical expertise, or help develop the patient subsidy approach.",
  },
  {
    id: "community",
    program: community,
    image: illustrations.accra,
    description:
      "Together with Akomapa Health, we help people identify health concerns earlier and find appropriate care. Outreach includes screening, health education, referrals, support with National Health Insurance Scheme (NHIS) registration, and follow-up.",
    partnership:
      "Support screening, insurance registration assistance, referral coordination, or follow-up.",
  },
  {
    id: "mental-health",
    program: mentalHealth,
    image: illustrations.careDiscussion,
    description:
      "Living with kidney disease and receiving dialysis can take an emotional toll. We are preparing a program that pairs patient education and screening with nurse training and referrals for further assessment or support.",
    partnership:
      "Help design the program, train nurses, or establish referral pathways with mental health professionals.",
  },
  {
    id: "training",
    program: training,
    image: illustrations.training,
    description:
      "We are developing learning opportunities for nurses and health professional students. Training will connect clinical practice with patient communication, affordability, community referral, and mental health support. We will share participation and supervision details as the program develops.",
    partnership: "Collaborate on curriculum, mentorship, supervised learning, or program delivery.",
  },
];

const futureConcepts = [
  {
    title: "A solar-powered center",
    copy: "A dedicated facility could bring dialysis, patient support, and professional training together under one roof.",
  },
  {
    title: "Mobile dialysis",
    copy: "A proposed solar-supported service for people who live far from care. It would require assessment of clinical safety, water treatment, power reliability, staffing, and operating feasibility.",
  },
  {
    title: "NephroHaven Plus",
    copy: "A proposed consulting and management service for private facilities interested in solar integration, workforce development, patient support, and dialysis operations.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageJsonLd path="/programs" />
      <PageHero
        title="Kidney care beyond each session"
        media={<ConceptImage image={illustrations.communityCare} priority />}
      >
        <p className="lead">
          Our programs address the cost of treatment, opportunities for earlier detection, the
          support patients need, and the skills of the professionals caring for them.
        </p>
        <StatusDate />
      </PageHero>

      <nav className="editorial-jumps shell" aria-label="On this page">
        {chapters.map(({ id, program }) => (
          <a key={id} href={`#${id}`}>
            {program.shortTitle}
          </a>
        ))}
        <a href="#future">Future concepts</a>
      </nav>

      <div className="shell program-chapters">
        {chapters.map(({ id, program, image, description, partnership }, index) => (
          <section
            className="editorial-photo-row editorial-chapter"
            data-image-first={index % 2 === 1 || undefined}
            id={id}
            key={id}
          >
            <div className="editorial-photo-copy">
              <h2>{program.title}</h2>
              <p className="editorial-meta">{program.status}</p>
              <div className="editorial-prose">
                <p>{description}</p>
                {id === "solar-study" && (
                  <p>
                    {pilotSteps[0].copy} The foundation’s October update identified commissioning as
                    the next step before data collection.
                  </p>
                )}
                <ul className="editorial-bullets">
                  {program.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
                <p>
                  <strong>How partners can help.</strong> {partnership}
                </p>
                {id === "solar-study" && (
                  <EditorialLink href="/model#study">See what the study will measure</EditorialLink>
                )}
              </div>
            </div>
            <ConceptImage image={image} />
          </section>
        ))}
      </div>

      <section className="editorial-chapter editorial-mist" id="future">
        <div className="shell">
          <h2>Future concepts</h2>
          <p className="lead editorial-deck">
            These proposals depend on feasibility, funding, clinical requirements, and what we learn
            from our initial work.
          </p>
          <ul className="editorial-columns">
            {futureConcepts.map(({ title, copy }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ul>
          <div className="editorial-image-band">
            <ConceptImage image={illustrations.dialysisRoom} format="wide" />
          </div>
        </div>
      </section>

      <PageCta
        title="Help develop the next stage of our work"
        href="/partners"
        label="Explore partnerships"
      >
        We welcome partners who can support evaluation, community care, program development, and
        training.
      </PageCta>
    </>
  );
}
