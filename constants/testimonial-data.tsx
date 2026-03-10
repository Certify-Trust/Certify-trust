import { FaQuoteRight } from "react-icons/fa";
import chen from "@/public/chen.png";
import jamie from "@/public/jamie.png";
import holland from "@/public/holland.png";
import star from "@/public/star.svg";

export const TestimonialData = [
  {
    name: "Sofia Chen",
    role: "Head of Recruitment",
    image: chen,
    topic: "Jumie Teams",
    rate: star,
    icon: <FaQuoteRight />,
    description:
      "Love the simplicity of the flow in setting up job ads. Its become my go to tool since the beginning.",
  },
  {
    name: "Jarmie Garcia",
    role: "CEO, Nevada Arm",
    image: jamie,
    topic: "Microsoft",
    rate: star,
    icon: <FaQuoteRight />,
    description:
      "Getting talented and suitable hands was so easy because the ATS made it easy to narrow down candidates.",
  },
  {
    name: "Holland Moore",
    role: "HR Manager",
    image: holland,
    topic: "Dribble",
    rate: star,
    icon: <FaQuoteRight />,
    description:
      "Didn’t have to think up the job ad content. It was simply generated and tailored to fit my preferences.",
  },
];
