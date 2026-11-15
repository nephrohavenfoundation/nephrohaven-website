import { model, pilotSteps, programs } from "../../content";
import { ConceptImage, EditorialLink, PageCta, PageHero, pageMetadata, StatusDate } from "../editorial";
import { illustrations } from "../illustrations";

export const metadata = pageMetadata(
  "Our model",
  "See how NephroHaven connects solar energy, patient affordability, community access, mental health, and workforce development in Ghana.",
);

const [solar, affordability, community, mentalHealth, workforce] = model;

const supportingComponents = [
  { title: solar.title, status: programs[0].status, copy: "Combine solar and grid electricity to test whether the system lowers electricity costs and reduces power-related interruptions." },
  { title: community.title, status: programs[1].status, copy: "Help people find appropriate care through screening, health education, referrals, insurance registration support, and follow-up." },
  { title: mentalHealth.title, status: programs[2].status, copy: "Build emotional well-being into dialysis care through patient screening and pathways for support." },
  { title: workforce.title, status: programs[3].status, copy: "Train nurses and health professional students to provide kidney care and support patients, including recognizing distress." },
];

const measures = [
  { title: "Electricity costs", copy: "How much does electricity for dialysis cost with solar and grid power?" },
  { title: "Treatment interruptions", copy: "How many power-related treatment interruptions does the system help avoid?" },
  { title: "Patient costs", copy: "What do patients pay when any energy savings are applied as subsidies?" },
];

export default function ModelPage() {
  return (
    <>
      <PageHero title="Lower delivery costs. Greater access." media={
        <ConceptImage image={illustrations.solarRooftop} priority />
      }>
        <p className="lead">Our model connects five components to make kidney care more affordable and accessible, starting with a solar and grid feasibility study in Ghana.</p>
        <EditorialLink href="#study">See what the study will measure</EditorialLink>
      </PageHero>

      <section className="editorial-chapter editorial-mist" aria-labelledby="model-overview">
        <div className="shell">
          <h2 id="model-overview">How the components work together</h2>
          <p className="lead editorial-deck">Solar energy could create room for subsidies. Community outreach connects people to care, while planned mental health support and training address needs during treatment and beyond.</p>
          <figure className="model-diagram">
            <ul className="model-inputs">
              {supportingComponents.map(({ title, status, copy }) => (
                <li key={title}>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <p className="editorial-meta">{status}</p>
                </li>
              ))}
            </ul>
            <figcaption className="model-goal">
              <h3>{affordability.title}</h3>
              <p>Our goal is affordable, whole-person kidney care. The study will examine what patients pay after any energy savings are applied as subsidies.</p>
              <p className="editorial-meta">Planned for evaluation</p>
            </figcaption>
          </figure>
          <StatusDate />
        </div>
      </section>

      <section className="editorial-chapter" id="study">
        <div className="shell">
          <div className="editorial-photo-row">
            <div className="editorial-photo-copy editorial-prose">
              <h2>Testing the model at Trust Premium Hospital</h2>
              <p>{pilotSteps[0].copy} The foundation’s October update identified commissioning as the next step before the study can collect data in the hospital’s dialysis unit.</p>
              <p>Three measures will help us refine the approach and decide whether it could work at other facilities.</p>
            </div>
            <ConceptImage image={illustrations.dialysisRoom} />
          </div>
          <ul className="editorial-columns">
            {measures.map(({ title, copy }) => <li key={title}><h3>{title}</h3><p>{copy}</p></li>)}
          </ul>
          <EditorialLink href="/news#solar-installation">Read the installation update</EditorialLink>
        </div>
      </section>

      <section className="editorial-chapter editorial-mist">
        <div className="shell editorial-photo-row" data-image-first>
          <div className="editorial-photo-copy editorial-prose">
            <h2>What we are developing next</h2>
            <p>We’re developing mental health screening and referral pathways and training for nurses and health professional students. The feasibility study will help determine how a subsidy approach could work in practice.</p>
            <p>Longer term, we want to explore a dedicated center, mobile dialysis, and consulting and management support for other facilities.</p>
            <EditorialLink href="/programs#future">Explore the future concepts</EditorialLink>
          </div>
          <ConceptImage image={illustrations.training} />
        </div>
      </section>

      <PageCta title="Help us test the model" href="/partners" label="Partner with us">
        We welcome collaboration on evaluation, solar technology, and patient support.
      </PageCta>
    </>
  );
}
