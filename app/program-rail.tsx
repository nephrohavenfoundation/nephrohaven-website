"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { programs } from "./content";

const count = programs.length;
const loopEdge = 2;
const loop = [...programs.slice(-loopEdge), ...programs, ...programs.slice(0, loopEdge)];

function subscribeToNothing() {
  return () => {};
}

function centeredCard(rail: HTMLDivElement) {
  const center = rail.scrollLeft + rail.clientWidth / 2;
  let closest = 0;
  let distance = Infinity;

  Array.from(rail.children).forEach((card, index) => {
    if (!(card instanceof HTMLElement)) return;
    const gap = Math.abs(center - card.offsetLeft - card.offsetWidth / 2);
    if (gap < distance) {
      closest = index;
      distance = gap;
    }
  });

  return closest;
}

function scrollToCard(rail: HTMLDivElement, index: number, behavior: ScrollBehavior) {
  const card = rail.children.item(index);
  if (!(card instanceof HTMLElement)) return;

  rail.scrollTo({
    left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
    behavior,
  });
}

export function ProgramRail() {
  const track = useRef<HTMLDivElement>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const enhanced = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const [active, setActive] = useState(0);
  const [positioned, setPositioned] = useState(false);
  const [settled, setSettled] = useState(true);
  const [autoplayAllowed, setAutoplayAllowed] = useState(false);

  if (enhanced && !positioned) {
    setPositioned(true);
    setActive(loopEdge);
  }

  useLayoutEffect(() => {
    if (!enhanced || !track.current) return;
    scrollToCard(track.current, loopEdge, "instant");
  }, [enhanced]);

  useEffect(() => {
    const rail = track.current;
    if (!rail) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => setAutoplayAllowed(inView && !preference.matches && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.intersectionRatio >= 0.6;
        update();
      },
      { threshold: 0.6 },
    );
    observer.observe(rail);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      clearTimeout(finishTimer.current);
    };
  }, []);

  const cards = enhanced ? loop : programs;
  const selected = enhanced ? (active + count - loopEdge) % count : active;
  const running = enhanced && autoplayAllowed;

  function finishScroll() {
    const rail = track.current;
    if (!rail) return;
    clearTimeout(finishTimer.current);

    let index = centeredCard(rail);
    if (enhanced && (index < loopEdge || index >= count + loopEdge)) {
      index += index < loopEdge ? count : -count;
      scrollToCard(rail, index, "instant");
    }
    setActive(index);
    setSettled(true);
  }

  function goTo(index: number) {
    const rail = track.current;
    if (!rail || (centeredCard(rail) === index && settled)) return;

    setSettled(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToCard(rail, index, reduced ? "instant" : "smooth");
    clearTimeout(finishTimer.current);
    finishTimer.current = setTimeout(finishScroll, 180);
  }

  const select = (index: number) => goTo(enhanced ? index + loopEdge : index);

  return (
    <div className="program-carousel" data-running={running}>
      <div className="shell rail-controls" role="group" aria-label="Choose a program">
        {programs.map(({ shortTitle }, index) => (
          <button
            key={shortTitle}
            type="button"
            aria-pressed={selected === index}
            onClick={() => select(index)}
          >
            {shortTitle}
          </button>
        ))}
      </div>
      <div
        className="program-track"
        role="region"
        aria-label="NephroHaven programs"
        tabIndex={0}
        ref={track}
        onScroll={(event) => {
          const rail = event.currentTarget;
          const center = centeredCard(rail);
          setActive(center);

          setSettled(false);
          clearTimeout(finishTimer.current);
          finishTimer.current = setTimeout(finishScroll, 120);
        }}
        onScrollEnd={finishScroll}
      >
        {cards.map(({ title, status, copy, activities }, index) => {
          const duplicate = enhanced && (index < loopEdge || index >= count + loopEdge);
          const isActive = active === index;

          return (
            <article
              className="program-card"
              key={duplicate ? `${title}-loop-${index}` : title}
              data-active={isActive}
              aria-hidden={duplicate || undefined}
            >
              <div className="program-card-surface">
                <div className="program-card-heading">
                  <h3>{title}</h3>
                  <p>{status}</p>
                </div>
                <div className="program-card-body">
                  <p>{copy}</p>
                  <ul>
                    {activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div className="program-timing" aria-hidden="true">
                  {isActive && settled && !duplicate && enhanced && (
                    <span onAnimationEnd={() => goTo(index + 1)} />
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="rail-footer">
        <div className="rail-pagination" role="group" aria-label="Program slides">
          {programs.map(({ shortTitle }, index) => (
            <button
              key={shortTitle}
              type="button"
              aria-label={shortTitle}
              aria-current={selected === index ? "true" : undefined}
              onClick={() => select(index)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
