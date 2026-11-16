export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  monochrome?: boolean;
};

export const photos = {
  solarRoof: {
    src: "/images/nephrohaven-images/solar-roof.webp",
    width: 1620,
    height: 1080,
    alt: "An aerial view of solar panels on the roof at Trust Premium Hospital",
  },
  solarInstallation: {
    src: "/images/nephrohaven-images/solar-installation.webp",
    width: 1200,
    height: 800,
    alt: "Rows of solar panels installed at Trust Premium Hospital",
  },
  hospital: {
    src: "/images/nephrohaven-images/trust-premium-hospital.webp",
    width: 1200,
    height: 800,
    alt: "The entrance to Trust Hospital Premium Centre",
  },
  outreach: {
    src: "/images/site-images/akomapa-outreach.webp",
    width: 1200,
    height: 763,
    alt: "People seated at a table during an Akomapa Health outreach event",
    monochrome: true,
  },
  screening: {
    src: "/images/site-images/akomapa-screening.webp",
    width: 1200,
    height: 800,
    alt: "A clinician examines a seated participant at an Akomapa Health outreach event",
    monochrome: true,
  },
  gathering: {
    src: "/images/site-images/akomapa-gathering.webp",
    width: 1200,
    height: 800,
    alt: "People seated together at an outdoor Akomapa gathering",
  },
} satisfies Record<string, Photo>;
