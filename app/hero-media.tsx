"use client";

import { useEffect, useRef, useState } from "react";
import { photos } from "./photos";

export type HeroVideoSource = { src: string; type?: string };

export function HeroMedia({ video }: { video?: HeroVideoSource }) {
  const frame = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!video || !frame.current) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => {
      const allowed = !motion.matches && inView && !document.hidden;
      setVideoAllowed(allowed);
      if (!allowed) setPlaying(false);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.intersectionRatio >= 0.1;
        update();
      },
      { threshold: 0.1 },
    );

    observer.observe(frame.current);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [video]);

  useEffect(() => {
    const element = player.current;
    if (!element) return;

    if (videoAllowed) element.play().catch(() => setPlaying(false));
    else element.pause();
  }, [videoAllowed]);

  return (
    <div className="hero-media" ref={frame} aria-hidden="true">
      <img
        src={photos.solarRoof.src}
        srcSet={`/images/nephrohaven-images/solar-roof-small.webp 900w, ${photos.solarRoof.src} 1620w`}
        sizes="100vw"
        width={photos.solarRoof.width}
        height={photos.solarRoof.height}
        alt=""
        fetchPriority="high"
      />
      {video && (
        <video
          ref={player}
          className="hero-video"
          data-playing={playing}
          muted
          playsInline
          loop
          preload="none"
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        >
          <source src={video.src} type={video.type} />
        </video>
      )}
    </div>
  );
}
