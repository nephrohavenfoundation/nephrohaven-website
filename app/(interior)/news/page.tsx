import { links } from "../../content";
import { EditorialPhoto, EditorialLink, PageCta, PageHero, pageMetadata } from "../editorial";
import { photos } from "../../photos";
import { PageJsonLd } from "../../page-json-ld";

export const metadata = pageMetadata("/news");

export default function NewsPage() {
  return (
    <>
      <PageJsonLd path="/news" />
      <PageHero title="News & progress">
        <p className="lead">
          Follow our work in Ghana, from the solar installation and feasibility study to community
          programs and partnerships.
        </p>
      </PageHero>

      <div className="shell news-stories">
        {/* Owner review: add the publication date. */}
        <article className="news-feature" id="solar-installation">
          <EditorialPhoto image={photos.solarInstallation} priority />
          <div className="news-story-copy editorial-prose">
            <p className="editorial-meta">Feasibility study</p>
            <h2>Solar panels installed at Trust Premium Hospital</h2>
            <p>
              The installation in Osu, Accra, is a step toward testing how solar and grid power
              could make dialysis more affordable.
            </p>
            <p>
              In its <time dateTime="2026-10-11">October 11, 2026</time> update, the foundation
              identified commissioning as the next step before data collection. The study is planned
              to track electricity costs, power-related interruptions, and patient costs after any
              energy savings are applied as subsidies.
            </p>
            <EditorialLink href="/model#study">Explore the feasibility study</EditorialLink>
          </div>
        </article>

        <section className="editorial-chapter news-more" aria-labelledby="news-more-heading">
          <h2 id="news-more-heading">More updates</h2>
          <article className="editorial-deck" id="nursehack4health">
            <div className="news-story-copy editorial-prose">
              <p className="editorial-meta">
                Award announcement · <time dateTime="2026-01-08">January 8, 2026</time>
              </p>
              <h3>Recognized at NurseHack4Health™</h3>
              <p>
                NephroHaven’s nurse-led, multidisciplinary team received the Track 2 award at the
                2025 NurseHack4Health™ Pitch-A-Thon for its proposed approach to solar-powered
                dialysis and equitable kidney care.
              </p>
              <p>
                The award supports our work to develop the model, beginning with a hospital
                partnership and feasibility study in Ghana.
              </p>
              <EditorialLink href={links.award}>Read the original award announcement</EditorialLink>
            </div>
          </article>
        </section>
      </div>

      <PageCta
        title="Explore the work behind the updates"
        href="/programs"
        label="See our programs"
      >
        Learn about the solar study, community screening, mental health integration, and
        professional training.
      </PageCta>
    </>
  );
}
