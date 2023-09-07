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

export const WINDOW_SIZE_THRESHOLD_PX = 768;

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

const roles = {
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

export const EXECUTIVES_LIST = [
  {
    title: roles.LOGISTICS_CAPTAIN,
    name: LOGISTICS_CAPTAIN_NAME,
    image: sam,
  },
  {
    title: roles.CONSTRUCTION_CAPTAIN,
    name: CONSTRUCTION_CAPTAIN_NAME,
    image: anthony,
  },
  {
    title: roles.FINANCE_CAPTAIN,
    name: FINANCE_CAPTAIN_NAME,
    image: liam,
  },
  {
    title: roles.CONCRETE_CAPTAIN,
    name: CONCRETE_CAPTAIN_NAME,
    image: daniel,
  },
  {
    title: roles.MOULD_EXEC,
    name: "Keston Anderson",
    image: placeholder,
  },
  {
    title: roles.MOULD_EXEC,
    name: "Louis Struzik",
    image: louie,
  },
  {
    title: roles.MATERIALS_EXEC,
    name: "Hirad Tahmaseb Pour",
    image: placeholder,
  },
  {
    title: roles.MATERIALS_EXEC,
    name: "Gaby Guisandes Bueno",
    image: placeholder,
  },
  {
    title: roles.MATERIALS_EXEC,
    name: "Michael Prtenjaca",
    image: michael,
  },
  {
    title: roles.TECH_COMMS_PRES_EXEC,
    name: "Tyler Liquornik",
    image: placeholder,
  },
  {
    title: roles.TECH_COMMS_PRES_EXEC,
    name: "Cole Polewski",
    image: cole,
  },
  {
    title: roles.SOFTWARE_EXEC,
    name: "Ethan Bodnar",
    image: ethan,
  },
  {
    title: roles.SOFTWARE_EXEC,
    name: "Dylan MacPhail",
    image: dylan,
  },
  {
    title: roles.DESIGN_AND_ANALYSIS_EXEC,
    name: "Lama Abdulal",
    image: lama,
  },
  {
    title: roles.GRAPHIC_DESIGN_EXEC,
    name: "Sarah Johnston",
    image: placeholder,
  },
  {
    title: roles.TRAINING_EXEC,
    name: "David Gibb",
    image: placeholder,
  },
];
