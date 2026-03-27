import DownIcon from "@/assets/icons/DownIcon";

export interface INavigationItem {
  id: number;
  title: string;
  href: string;
  subRoutes: INavigationItem[];
  activeRoutes: string[];
  icon?: React.ReactNode;
}

export type INavigation = (params?: INavigationParams) => INavigationItem[];

export interface INavigationParams {
  id?: string;
}
export const navigation: INavigation = (params?: INavigationParams) => [
  {
    id: 1,
    title: "About",
    href: "#",
    subRoutes: [],
    activeRoutes: ["/about"],
    // icon: <AboutIcon />,
  },
  {
    id: 2,
    title: "Contribute",
    href: "#",
    subRoutes: [],
    activeRoutes: ["/contribute"],
    icon: <DownIcon />,
  },
];

export const footerNavigation: INavigation = (params?: INavigationParams) => [
  {
    id: 1,
    title: "About",
    href: "#",
    subRoutes: [],
    activeRoutes: ["/about"],
    // icon: <AboutIcon />,
  },
  {
    id: 2,
    title: "Portfolio",
    href: "#",
    subRoutes: [],
    activeRoutes: ["/contribute"],
    icon: <DownIcon />,
  },
  {
    id: 3,
    title: "Team",
    href: "#",
    subRoutes: [],
    activeRoutes: ["/team"],
    icon: <DownIcon />,
  },
];
