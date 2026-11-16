import { links } from "./content";

const partners: {
  name: string;
  href: string;
  image: string;
  width: number;
  height: number;
  fit?: "cover";
  plate?: "light";
}[] = [
  {
    name: "Trust Premium Hospital",
    href: "#pilot",
    image: "trust-hospital-white.png",
    width: 868,
    height: 869,
  },
  {
    name: "Akomapa Health",
    href: "#programs",
    image: "akomapa-logo-dark.png",
    width: 2000,
    height: 400,
  },
  {
    name: "NurseHack4Health™",
    href: links.award,
    image: "nh4h-logo.webp",
    width: 708,
    height: 143,
  },
  {
    name: "Johnson & Johnson",
    href: links.award,
    image: "johnson-johnson-logo-black-and-white.png",
    width: 2400,
    height: 2400,
    fit: "cover",
  },
  {
    name: "Microsoft",
    href: links.award,
    image: "microsoft-logo-black-and-white.png",
    width: 2400,
    height: 513,
  },
  {
    name: "SONSIEL",
    href: links.award,
    image: "sonsiel-white-lgo.webp",
    width: 1500,
    height: 567,
  },
  {
    name: "Yale",
    href: links.founder,
    image: "yale-logo-white.png",
    width: 748,
    height: 324,
  },
  {
    name: "Ghana Health Service",
    href: "/partners",
    image: "ghs-official-logo.png",
    width: 1893,
    height: 2529,
    plate: "light",
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
              {partners.map(({ name, href, image, width, height, fit, plate }) => (
                <a
                  key={name}
                  className="partner-logo"
                  href={href}
                  data-plate={plate}
                  tabIndex={duplicate ? -1 : undefined}
                >
                  <img
                    src={`/images/${image}`}
                    width={width}
                    height={height}
                    alt={duplicate ? "" : name}
                    data-fit={fit}
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
