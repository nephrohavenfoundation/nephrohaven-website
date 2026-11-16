import type { HeroVideoSource } from "./hero-media";

// Add a public media path when the final background loop is ready.
export const heroVideo: HeroVideoSource | undefined = undefined;

// Homepage copy adapted from NephroHaven Website Content.pdf.
export const links = {
  award: "https://nursing.jnj.com/notes-on-nursing/nursehack4health-pitch-a-thon-2025-winners",
  dialysisStudy: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10612280/",
  founder:
    "https://nursing.yale.edu/news/ysn-student-innovates-expand-access-to-lifesaving-kidney-care-ghana",
  linkedIn: "https://gh.linkedin.com/company/nephrohaven-foundation",
};

// Owner review: confirm the Instagram and Facebook profile URLs before linking them.
export const footerSocialLinks: Partial<Record<"LinkedIn" | "Instagram" | "Facebook", string>> = {
  LinkedIn: links.linkedIn,
};

export const pilotLink = { href: "/#pilot", label: "The pilot" };

export const workLinks = [
  { href: "/model", label: "Our model" },
  { href: "/programs", label: "Our programs" },
  pilotLink,
];
export const foundationLinks = [
  { href: "/about", label: "About us" },
  { href: "/news", label: "News & progress" },
];
export const navigation = [...workLinks, ...foundationLinks];
export const partnershipLink = { href: "/partners", label: "Partner with us" };
export const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const accessFigures = [
  { value: "7 of 16", label: "regions had no dialysis services" },
  { value: "1,195", label: "people received haemodialysis nationwide" },
  { value: "US$54", label: "average cost of one dialysis session" },
];

export const pilotSteps = [
  {
    title: "Solar installation",
    status: "Complete",
    copy: "Solar panels are installed at Trust Premium Hospital in Osu, Accra.",
  },
  {
    title: "Commissioning",
    status: "Next",
    copy: "Bring the solar and grid system into operation and prepare to collect data.",
  },
  {
    title: "Feasibility study",
    status: "Planned",
    copy: "Evaluate electricity costs, power-related treatment interruptions, and what patients pay after energy savings are applied as subsidies.",
  },
];

export const model = [
  {
    title: "Solar energy",
    copy: "Combine solar and grid electricity to test lower energy costs and more reliable treatment.",
  },
  {
    title: "Patient affordability",
    copy: "Apply energy savings as subsidies and assess the effect on patient costs.",
  },
  {
    title: "Community access",
    copy: "Support screening, referral, National Health Insurance Scheme registration, and follow-up care.",
  },
  {
    title: "Mental health integration",
    copy: "Prepare to bring patient screening, support, and referral into dialysis care.",
  },
  {
    title: "Workforce development",
    copy: "Prepare nurses and health professional students for compassionate kidney care, including mental health skills.",
  },
];

export const programs = [
  {
    shortTitle: "Solar and grid power",
    title: "Solar and grid feasibility study",
    status: "Panels installed",
    copy: "We are preparing to evaluate a hybrid energy model at Trust Premium Hospital in Osu, Accra.",
    activities: [
      "Assess the cost of electricity used to deliver dialysis",
      "Track power-related treatment interruptions",
      "Evaluate patient costs after subsidies",
    ],
  },
  {
    shortTitle: "Community care",
    title: "Community screening and referrals",
    status: "Underway with Akomapa Health",
    copy: "Community outreach helps people identify health concerns earlier and take the next steps in their care.",
    activities: [
      "Screening and health education",
      "Referrals and insurance registration support",
      "Follow-up care",
    ],
  },
  {
    shortTitle: "Mental health",
    title: "Mental health in dialysis care",
    status: "Preparing to launch",
    copy: "The program will address emotional well-being alongside the demands of dialysis treatment.",
    activities: [
      "Mental health screening in dialysis care",
      "Training for nurses to recognize distress",
      "Referrals for further assessment and support",
    ],
  },
  {
    shortTitle: "Professional training",
    title: "Training for kidney care",
    status: "Preparing to launch",
    copy: "We are developing learning opportunities for nurses and health professional students.",
    activities: [
      "Patient communication and affordability",
      "Community referrals and follow-up",
      "Mental health support in kidney care",
    ],
  },
];

export const questions = [
  {
    title: "What is NephroHaven Foundation?",
    answer:
      "NephroHaven is a nonprofit working to expand access to sustainable kidney care through prevention, early detection, and solar-powered dialysis solutions.",
  },
  {
    title: "What does solar-powered dialysis mean?",
    answer:
      "Our initial model combines solar energy with grid electricity. The feasibility study will assess electricity costs, power-related treatment interruptions, and patient affordability.",
  },
  {
    title: "Have you demonstrated cost savings yet?",
    answer:
      "Solar panels are installed, and commissioning and data collection are the next steps. We will share results when they are available.",
  },
  {
    title: "Does NephroHaven operate its own dialysis center?",
    answer:
      "Our first solar installation is at Trust Premium Hospital in Osu, Accra. A dedicated NephroHaven center is a future concept.",
  },
  {
    title: "Can organizations outside Ghana partner with you?",
    answer:
      "Yes. We welcome local and international partners whose expertise or resources can advance the work in Ghana and help us develop the model for wider use.",
  },
];
