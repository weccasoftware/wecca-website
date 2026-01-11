import louis from "./assets/headshots/2025-2026/Louis.png";
import daniel from "./assets/headshots/2025-2026/Daniel.png";
import annabelle from "./assets/headshots/2025-2026/Annabelle.png";
import siya from "./assets/headshots/2025-2026/Siya.png";
import elijah from "./assets/headshots/2025-2026/Elijah.png";
import evelyne from "./assets/headshots/2025-2026/Evelyne.png";
import brandon from "./assets/headshots/2025-2026/Brandon.png";
import mia from "./assets/headshots/2025-2026/Mia.png";
import rida from "./assets/headshots/2025-2026/Rida.png";
import hannah from "./assets/headshots/2025-2026/Hannah.png";
import dylan from "./assets/headshots/2025-2026/Dylan.png";
import danny from "./assets/headshots/2025-2026/Danny.png";
import jared from "./assets/headshots/2025-2026/Jared.png";
import devon from "./assets/headshots/2025-2026/Devon.png";
import adriana from "./assets/headshots/2025-2026/Adriana.png";
import myles from "./assets/headshots/2025-2026/Myles.png";
import abdel from "./assets/headshots/2025-2026/Abdel.png";
import serah from "./assets/headshots/2025-2026/Serah.png";
import cole from "./assets/headshots/2025-2026/Cole.png";
import aishat from "./assets/headshots/2025-2026/Aishat.png";
import placeholder from "./assets/headshots/2023-2024/bg-Placeholder.png"

export const BASE_URL = 'https://us-cent' +
    'ral1-wecca-website-c5892.cloudfunctions.net/app'
export const WINDOW_WIDTH_THRESHOLD_PX = 1050;
export const MOBILE_WIDTH_THRESHOLD_PX = 600;
export const TEAMS_LINK = "https://teams.microsoft.com/l/team/19%3AvfRfR6E2XpvnDjj6zwB2EWBLmWGiIgudXlPWWi-kVo81%40thread.tacv2/conversations?groupId=9637f304-676d-48fb-88eb-56b19f4f0e11&tenantId=ad93a64d-ad0d-4ecd-b2fd-e53ce15965be";
export const INSTAGRAM_LINK = "https://www.instagram.com/wecca.uwo/";
export const LINKEDIN_LINK = "https://www.linkedin.com/company/western-engineering-concrete-canoe-association/";

export const FINANCE_CAPTAIN_NAME = "Annabelle Kobzar";
export const LOGISTICS_CAPTAIN_NAME = "Louis Struzik";
export const CONSTRUCTION_CAPTAIN_NAME = "Daniel Hanna";
export const CONCRETE_CAPTAIN_NAME = "Siya Dalal";

export const FINANCE_CAPTAIN_EMAIL = "lreeves8@uwo.ca";
export const LOGISTICS_CAPTAIN_EMAIL = "sgoertz3@uwo.ca";
export const CONSTRUCTION_CAPTAIN_EMAIL = "aderango@uwo.ca";
export const CONCRETE_CAPTAIN_EMAIL = "dhanna23@uwo.ca";
export const WECCA_SOFTWARE_EMAIL = "wecca.software@gmail.com";

export const SPONSORSHIP_FORM_TYPE = "sponsorship";
export const CONTACT_FORM_TYPE = "contact";

export const TEAM_KEY = "team";
export const NAME_KEY = "name";
export const EMAIL_KEY = "email";
export const CAPTAIN_ROLE = "Captain"

const ROLES = {
  LOGISTICS_CAPTAIN: "Logistics Captain",
  CONSTRUCTION_CAPTAIN: "Construction Captain",
  FINANCE_CAPTAIN: "Finance Captain",
  CONCRETE_CAPTAIN: "Concrete Captain",
  MOULD_EXEC: "Co-Head of Mould",
  MATERIALS_EXEC: "Co-Head of Materials",
  TECH_COMMS_PRES_EXEC: "Co-Head of Technical Communications",
  SOFTWARE_EXEC: "Co-Head of Software Development",
  GRAPHIC_DESIGN_EXEC: "Head of Theme",
  DESIGN_AND_ANALYSIS_EXEC: "Co-Head of Design and Analysis",
  TRAINING_EXEC: "Co-Head of Training",
  SPONSORSHIPS_EXEC: "Head of Sponsorships",
  CONSTRUCTION_EXEC: "Construction Executive",
};

export const SIGNUP_ROLES = [
  "Captain",
  "Mould",
  "Materials",
  "Technical Communications",
  "Software",
  "Graphic Design",
  "Design and Analysis",
  "Training",
]

export const FILTER_TEAMS = [
  "Mould",
  "Materials",
  "Technical Communications",
  "Software",
  "Graphic Design",
  "Design and Analysis",
  "Training",
  "General"
]

export const EXECUTIVES_LIST = [
  {
    title: ROLES.LOGISTICS_CAPTAIN,
    name: LOGISTICS_CAPTAIN_NAME,
    image: louis,
  },
  {
    title: ROLES.CONSTRUCTION_CAPTAIN,
    name: CONSTRUCTION_CAPTAIN_NAME,
    image: daniel,
  },
  {
    title: ROLES.FINANCE_CAPTAIN,
    name: FINANCE_CAPTAIN_NAME,
    image: annabelle,
  },
  {
    title: ROLES.CONCRETE_CAPTAIN,
    name: CONCRETE_CAPTAIN_NAME,
    image: siya,
  },
  {
    title: ROLES.MOULD_EXEC,
    name: "Elijah Moffett",
    image: elijah,
  },
  {
    title: ROLES.MOULD_EXEC,
    name: "Evelyne Champagne",
    image: evelyne,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Brandon Clowes",
    image: brandon,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Mia Koto",
    image: mia,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Rida Mahmood",
    image: rida,
  },
  {
    title: ROLES.CONSTRUCTION_EXEC,
    name: "Hannah VanderPloeg",
    image: hannah,
  },
  {
    title: ROLES.TECH_COMMS_PRES_EXEC,
    name: "Dylan MacPhail",
    image: dylan,
  },
  {
    title: ROLES.TECH_COMMS_PRES_EXEC,
    name: "Danny Lee",
    image: danny,
  },
  {
    title: ROLES.SOFTWARE_EXEC,
    name: "Jared Segal",
    image: jared,
  },
  {
    title: ROLES.SOFTWARE_EXEC,
    name: "Devon Rayner",
    image: devon,
  },
  {
    title: ROLES.SPONSORSHIPS_EXEC,
    name: "Adriana Mazzocco",
    image: adriana,
  },
  {
    title: ROLES.DESIGN_AND_ANALYSIS_EXEC,
    name: "Myles Seward",
    image: myles,
  },
  {
    title: ROLES.DESIGN_AND_ANALYSIS_EXEC,
    name: "Abdelrahman Amin",
    image: abdel,
  },
  {
    title: ROLES.GRAPHIC_DESIGN_EXEC,
    name: "Serah Quinn",
    image: serah,
  },
  {
    title: ROLES.TRAINING_EXEC,
    name: "Cole Polewski",
    image: cole,
  },
  {
    title: ROLES.TRAINING_EXEC,
    name: "Aishat Raifu",
    image: aishat,
  },
];
