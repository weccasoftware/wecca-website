import sam from "./assets/headshots/bg-Sam.png";
import anthony from "./assets/headshots/bg-Anthony.png";
import liam from "./assets/headshots/bg-Liam.png";
import daniel from "./assets/headshots/bg-Daniel.png";
import louie from "./assets/headshots/bg-Louie.png";
import michael from "./assets/headshots/bg-Michael.png";
import cole from "./assets/headshots/bg-Cole.png";
import ethan from "./assets/headshots/bg-Ethan.png";
import dylan from "./assets/headshots/bg-Dylan.png"
import lama from "./assets/headshots/bg-Lama.png";
import placeholder from "./assets/headshots/bg-Placeholder.png"

export const BASE_URL = "https://wecca.org"

export const WINDOW_SIZE_THRESHOLD_PX = 768;
export const SLACK_LINK = "https://join.slack.com/t/wecca2023-24/shared_invite/zt-21o0f5jn9-al9lZLzSOjTrxhflOeR3eQ";
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
  TECH_COMMS_PRES_EXEC: "Co-Head of Technical Communications and Presentation",
  SOFTWARE_EXEC: "Co-Head of Software Development",
  GRAPHIC_DESIGN_EXEC: "Head of Graphic Design",
  DESIGN_AND_ANALYSIS_EXEC: "Head of Design and Analysis",
  TRAINING_EXEC: "Head of Training",
};

export const SIGNUP_ROLES = [
  "Captain",
  "Mould",
  "Materials",
  "Technical Communications and Presentation",
  "Software",
  "Graphic Design",
  "Design and Analysis",
  "Training",
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
    image: placeholder,
  },
  {
    title: ROLES.MOULD_EXEC,
    name: "Louis Struzik",
    image: louie,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Hirad Tahmaseb Pour",
    image: placeholder,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Gaby Guisandes Bueno",
    image: placeholder,
  },
  {
    title: ROLES.MATERIALS_EXEC,
    name: "Michael Prtenjaca",
    image: michael,
  },
  {
    title: ROLES.TECH_COMMS_PRES_EXEC,
    name: "Tyler Liquornik",
    image: placeholder,
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
    image: placeholder,
  },
  {
    title: ROLES.TRAINING_EXEC,
    name: "David Gibb",
    image: placeholder,
  },
];
