export type Illustration = {
  src: string;
  width: number;
  height: number;
  position?: string;
};

export const illustrations = {
  solarInstallation: { src: "/images/solar-study.webp", width: 1672, height: 941, position: "66% center" },
  solarRooftop: { src: "/images/solar-care.webp", width: 1672, height: 941, position: "63% center" },
  dialysisCare: { src: "/images/whole-person-care.webp", width: 1250, height: 704, position: "76% center" },
  communityCare: { src: "/images/community-care.webp", width: 1250, height: 834 },
  careDiscussion: { src: "/images/care-training.webp", width: 724, height: 724 },
  accra: { src: "/images/accra-neighborhood.webp", width: 1440, height: 811 },
  dialysisRoom: { src: "/images/dialysis-room.webp", width: 1440, height: 960 },
  partnership: { src: "/images/partnership-table.webp", width: 1440, height: 811 },
  training: { src: "/images/nursing-workshop.webp", width: 1440, height: 960 },
} satisfies Record<string, Illustration>;
