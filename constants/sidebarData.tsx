import {
  Overview,
  Groups,
  Designs,
  Credentials,
  Emails,
  Integration,
} from "@/assets/dashboard/sidebarIcons";

export const sidebarData = [
  {
    title: "Dashboard",
    className: "",
    icon: <Overview />,
    link: "/dashboard/overview",
  },

  {
    title: "Groups",
    className: "",
    icon: <Groups />,
    link: "/dashboard/groups",
  },
  {
    title: "Designs",
    className: "",
    icon: <Designs />,
    link: "/dashboard/designs",
  },
  {
    title: "Credentials",
    className: "",
    icon: <Credentials />,
    link: "/dashboard/credentials",
  },
  {
    title: "Emails",
    className: "",
    icon: <Emails />,
    link: "/dashboard/emails",
  },
  {
    title: "Integration",
    className: "",
    icon: <Integration />,
    link: "/dashboard/integration",
  },
];
