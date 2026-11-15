import Link from "next/link";
import { accessFigures, heroVideo, links, pilotSteps, questions } from "./content";
import { FaqList } from "./faq-list";
import { HeroMedia } from "./hero-media";
import { PartnerMarquee } from "./partner-marquee";
import { ModelStory } from "./model-story";
import { ProgramRail } from "./program-rail";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Arrow } from "./arrow";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="announcement" id="top">
        <a href="#pilot"><strong>Pilot update.</strong> Solar panels are installed. <Arrow /></a>
      </div>
      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <section className="hero inverse" aria-labelledby="hero-heading">
          <span className="header-marker" aria-hidden="true" />
          <HeroMedia video={heroVideo} />
          <div className="hero-main shell">
            <h1 id="hero-heading">More affordable dialysis.<br />Powered by the sun.</h1>
            <p className="lead">At NephroHaven Foundation, we’re on a mission to develop a more affordable approach to kidney care, starting in Ghana.</p>
            <div className="actions">
              <a className="button" href="#partner">Partner with us</a>
              <a className="quiet-action" href="#pilot"><Arrow /> See our work at Trust Hospital</a>
            </div>
          </div>
          <div className="hero-base">
            <PartnerMarquee />
          </div>
        </section>

        <ModelStory />

        <section id="programs" className="programs" aria-labelledby="programs-heading" tabIndex={-1}>
          <div className="shell program-intro">
            <h2 id="programs-heading">Kidney care beyond each session</h2>
            <p className="lead">Our programs address the cost of treatment, earlier detection, the support patients need, and the skills of the professionals caring for them.</p>
          </div>
          <ProgramRail />
        </section>

        <section id="pilot" className="pilot section inverse" aria-labelledby="pilot-heading" tabIndex={-1}>
          <div className="shell">
            <div className="pilot-intro">
              <h2 id="pilot-heading">From solar installation to patient impact</h2>
              <p className="lead">Trust Premium Hospital in Osu, Accra, is the starting point for testing how solar and grid electricity can support dialysis.</p>
            </div>
            <ol className="pilot-steps">
              {pilotSteps.map(({ title, status, copy }) => (
                <li key={title}>
                  <p className="step-status"><span />{status}</p>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="section evidence" tabIndex={-1} aria-labelledby="evidence-heading">
          <div className="shell">
            <div className="section-head evidence-head">
              <div>
                <h2 id="evidence-heading">When dialysis is out of reach, lives are at risk.</h2>
                <p className="lead">For families in Ghana, accessing dialysis can mean long journeys, repeated bills, and difficult decisions about continuing treatment.</p>
              </div>
              <a className="button button-dark" href={links.dialysisStudy}>Read the 2022 assessment <Arrow external /></a>
            </div>
            <div className="evidence-grid">
              <article className="evidence-card evidence-figures">
                <h3>Dialysis access in Ghana</h3>
                <dl>
                  {accessFigures.map(({ value, label }) => (
                    <div key={value}><dt>{value}</dt><dd>{label}</dd></div>
                  ))}
                </dl>
                <p>2022 national data · <a href={links.dialysisStudy}>Tannor et al., 2023</a></p>
              </article>
              <article className="evidence-card evidence-founder">
                <h3>Built from frontline experience</h3>
                <p>Founder and President Bernard Abeiku Mensah saw families struggle to access dialysis while working as a community nurse at Cape Coast Teaching Hospital. He is pursuing a PhD in Nursing at Yale University.</p>
                <a className="text-link" href={links.founder}>Read Bernard’s story <Arrow external /></a>
              </article>
              <article className="evidence-card evidence-award">
                <h3>Recognized at NurseHack4Health™</h3>
                <p>Our proposed solar-powered dialysis model received a Track 2 award at the 2025 Pitch-A-Thon.</p>
                <a className="text-link" href={links.award}>Read the award announcement <Arrow external /></a>
              </article>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq" tabIndex={-1} aria-labelledby="faq-heading">
          <div className="shell faq-inner">
            <div>
              <h2 id="faq-heading">Frequently asked questions</h2>
              <Link className="text-link faq-more" href="/faq">Read all FAQs <Arrow /></Link>
            </div>
            <FaqList questions={questions} />
          </div>
        </section>

        <section id="partner" className="next-steps" tabIndex={-1} aria-labelledby="partner-heading">
          <div className="partner-main inverse">
            <h2 id="partner-heading">Help us bring the model to more people.</h2>
            <p className="lead">We are seeking partners to grow patient access, launch support and training programs, and build evidence for future expansion.</p>
            <a className="button" href={links.linkedIn}>Connect on LinkedIn <Arrow external /></a>
          </div>
          <div className="partner-pilot inverse">
            <img src="/images/solar-study.webp" width="1672" height="941" loading="lazy" alt="" />
            <h2>Follow the pilot</h2>
            <a className="button button-quiet" href="#pilot">See what comes next <Arrow /></a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
