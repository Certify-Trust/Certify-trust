import FeatureIcon from "@/assets/icons/FeatureIcon";
import LinkedinIcon from "@/assets/icons/LinkednIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import XIcon from "@/assets/icons/XIcon";

export const reportData = [
  {
    label: "Issued all time",
    value: 0,
  },
  {
    label: "Recipients all time",
    value: 0,
  },
  {
    label: "Opened all time",
    value: 0,
  },
  {
    label: "Shared all time",
    value: 0,
  },
];

export const recipientData = [
  {
    label: (
      <div className="flex gap-1">
        <LinkedinIcon /> <span>LinkedIn Shares</span>
      </div>
    ),
    value: 0,
    percentage: "0%",
  },
  {
    label: (
      <div className="flex gap-1">
        <XIcon /> <span>X Shares</span>
      </div>
    ),
    value: 0,
    percentage: "0%",
  },
];

export const setupCards = [
  {
    icon: <LinkedinIcon width={44} height={44} />,
    title: "Single click enable your LinkedIn profile",
    description:
      "Add your LinkedIn organisation ID to allow your recipients to easily add their badges and certificates to LinkedIn",
    linkText: "Update Social Media Settings",
    href: "#",
  },
  {
    icon: <MessageIcon width={44} height={44} />,
    title: "Create an email campaign",
    description:
      "Boost engagement, send an email campaign that motivates recipients to share their badges and certificates.",
    linkText: "Email Campaign Settings",
    href: "#",
  },
  {
    icon: <FeatureIcon />,
    title: "Feature Request",
    description:
      "Help us improve. Submit a feature request and our team will review your feedback.",
    linkText: "Submit Feature Request",
    href: "#",
  },
];
