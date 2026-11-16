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
  rooftopInstallation: {
    src: "/images/nephrohaven-images/rooftop-installation.webp",
    width: 1200,
    height: 800,
    alt: "An installation crew works on solar panels on the hospital roof",
  },
  solarDelivery: {
    src: "/images/nephrohaven-images/solar-delivery.webp",
    width: 1200,
    height: 900,
    alt: "Workers unload solar panels from a truck outside the hospital",
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
  conversation: {
    src: "/images/site-images/akomapa-conversation.webp",
    width: 950,
    height: 952,
    alt: "Two people speak across a table during an Akomapa Health outreach event",
    monochrome: true,
  },
  discussion: {
    src: "/images/site-images/akomapa-discussion.webp",
    width: 1200,
    height: 800,
    alt: "A speaker addresses a group seated around a table at an Akomapa gathering",
  },
} satisfies Record<string, Photo>;
