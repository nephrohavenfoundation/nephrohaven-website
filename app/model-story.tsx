"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { model } from "./content";

export function ModelStory() {
  const story = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!story.current) return;

    const steps = Array.from(story.current.querySelectorAll(".model-step"));
    const media = window.matchMedia("(min-width: 941px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)");
    let frame: number | undefined;

    const update = () => {
      if (!media.matches || frame !== undefined) return;

      frame = requestAnimationFrame(() => {
        frame = undefined;
        const readingLine = window.innerHeight * 0.52;
        const next = steps.findLastIndex((step) => step.getBoundingClientRect().top < readingLine);
        setActive(Math.max(0, next));
      });
    };
    const configure = () => {
      setEnhanced(media.matches);
      update();
    };

    configure();
    media.addEventListener("change", configure);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      media.removeEventListener("change", configure);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="model" className="model-story" aria-labelledby="model-heading" tabIndex={-1}>
      <div className="shell">
        <div className="section-head">
          <div>
            <h2 id="model-heading">One model.<br />Connected components.</h2>
            <p className="lead">Five parts work toward one goal: making kidney care more affordable and accessible.</p>
          </div>
          <a className="button button-dark" href="#pilot">Explore the pilot <span aria-hidden="true">↗</span></a>
        </div>

        <div className="model-layout" data-enhanced={enhanced} ref={story} style={{ "--model-step-count": model.length } as CSSProperties}>
          <ol className="model-steps">
            {model.map(({ title, copy, image, position }, index) => (
              <li className="model-step" key={title} data-active={index === active}>
                <div className="model-step-copy">
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <img className="model-inline-image" src={`/images/${image}`} style={{ objectPosition: position }} alt="" loading="lazy" />
              </li>
            ))}
          </ol>
          {enhanced && (
            <div className="model-stage" aria-hidden="true">
              <div className="model-frame">
                {model.map(({ image, position }, index) => (
                  <img
                    className="model-slide"
                    key={image}
                    data-position={index === active ? "current" : index < active ? "before" : "after"}
                    src={`/images/${image}`}
                    style={{ objectPosition: position }}
                    alt=""
                  />
                ))}
              </div>
              <div className="model-progress">
                {model.map(({ title }, index) => <span key={title} data-active={index === active} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
