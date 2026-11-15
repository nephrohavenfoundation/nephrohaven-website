import { links } from "./content";

const partners = [
  {
    name: "Trust Premium Hospital",
    href: "#pilot",
    image: "trust-hospital-white.png",
    width: 868,
    height: 869,
    style: "trust",
  },
  {
    name: "Akomapa Health",
    href: "#programs",
    image: "akomapa-logo-dark.png",
    width: 2000,
    height: 400,
    style: "akomapa",
  },
  {
    name: "NurseHack4Health™",
    href: links.award,
    image: "nh4h-logo.webp",
    width: 708,
    height: 143,
    style: "award",
  },
];

export function PartnerMarquee() {
  return (
    <div className="partner-marquee" role="group" aria-label="Partners and recognition">
      <div className="partner-marquee-viewport">
        <div className="partner-marquee-track">
          {[false, true].map((duplicate) => (
            <div
              className="partner-logo-set"
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {partners.map(({ name, href, image, width, height, style }) => (
                <a
                  key={name}
                  className={`partner-logo partner-logo-${style}`}
                  href={href}
                  tabIndex={duplicate ? -1 : undefined}
                >
                  <img
                    src={`/images/${image}`}
                    width={width}
                    height={height}
                    alt={duplicate ? "" : name}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
