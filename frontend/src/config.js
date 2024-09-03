import sam from "./assets/headshots/bg-Sam.png";
import anthony from "./assets/headshots/bg-Anthony.png";
import liam from "./assets/headshots/bg-Liam.png";
import daniel from "./assets/headshots/bg-Daniel.png";
import louie from "./assets/headshots/bg-Louie.png";
import michael from "./assets/headshots/bg-Michael.png";
import gaby from './assets/headshots/bg-Gaby.png'
import hirad from './assets/headshots/bg-Hirad.png'
import cole from "./assets/headshots/bg-Cole.png";
import ethan from "./assets/headshots/bg-Ethan.png";
import dylan from "./assets/headshots/bg-Dylan.png"
import lama from "./assets/headshots/bg-Lama.png";
import david from "./assets/headshots/bg-David.png";
import sarah from "./assets/headshots/bg-Sarah.png";
import keston from "./assets/headshots/bg-Keston.png";
import tyler from "./assets/headshots/bg-Tyler.png";
import placeholder from "./assets/headshots/bg-Placeholder.png"

export const BASE_URL = 'https://us-central1-wecca-website-c5892.cloudfunctions.net/app'
export const WINDOW_WIDTH_THRESHOLD_PX = 1050;
export const MOBILE_WIDTH_THRESHOLD_PX = 600;
export const TEAMS_LINK = "https://teams.microsoft.com/l/team/19%3AvfRfR6E2XpvnDjj6zwB2EWBLmWGiIgudXlPWWi-kVo81%40thread.tacv2/conversations?groupId=9637f304-676d-48fb-88eb-56b19f4f0e11&tenantId=ad93a64d-ad0d-4ecd-b2fd-e53ce15965be";
export const INSTAGRAM_LINK = "https://www.instagram.com/wecca.uwo/";
export const LINKEDIN_LINK = "https://www.linkedin.com/company/western-engineering-concrete-canoe-association/";

export const FINANCE_CAPTAIN_NAME = "Liam Reeves";
export const LOGISTICS_CAPTAIN_NAME = "Samantha Goertz";
export const CONSTRUCTION_CAPTAIN_NAME = "Anthony De Rango";
export const CONCRETE_CAPTAIN_NAME = "Daniel Hanna";

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
  GRAPHIC_DESIGN_EXEC: "Head of Graphic Design",
  DESIGN_AND_ANALYSIS_EXEC: "Head of Design and Analysis",
  TRAINING_EXEC: "Head of Training",
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
    image: sam,
  },
  {
    title: ROLES.CONSTRUCTION_CAPTAIN,
    name: CONSTRUCTION_CAPTAIN_NAME,
    image: anthony,
  },
  {
    title: ROLES.FINANCE_CAPTAIN,
    name: FINANCE_CAPTAIN_NAME,
    image: liam,
  },
  {
    title: ROLES.CONCRETE_CAPTAIN,
    name: CONCRETE_CAPTAIN_NAME,
    image: daniel,
  },
  {
    title: ROLES.MOULD_EXEC,
    name: "Keston Anderson",
    image: keston,
  },
  {
    title: ROLES.MOULD_EXEC,
    name: "Louis Struzik",
    image: louie,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Hirad Tahmaseb Pour",
    image: hirad,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Gaby Guisandes Bueno",
    image: gaby,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Michael Prtenjaca",
    image: michael,
  },
  {
    title: ROLES.TECH_COMMS_PRES_EXEC,
    name: "Tyler Liquornik",
    image: tyler,
  },
  {
    title: ROLES.TECH_COMMS_PRES_EXEC,
    name: "Cole Polewski",
    image: cole,
  },
  {
    title: ROLES.SOFTWARE_EXEC,
    name: "Ethan Bodnar",
    image: ethan,
  },
  {
    title: ROLES.SOFTWARE_EXEC,
    name: "Dylan MacPhail",
    image: dylan,
  },
  {
    title: ROLES.DESIGN_AND_ANALYSIS_EXEC,
    name: "Lama Abdulal",
    image: lama,
  },
  {
    title: ROLES.GRAPHIC_DESIGN_EXEC,
    name: "Sarah Johnston",
    image: sarah,
  },
  {
    title: ROLES.TRAINING_EXEC,
    name: "David Gibb",
    image: david,
  },
];
