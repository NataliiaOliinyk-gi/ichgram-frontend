import type { SVGProps } from "react";
import { nanoid } from "nanoid";

import HomeIcon from "../components/Icons/HomeIcon";
import HomeIconActive from "../components/Icons/HomeIconActive";
import SearchIcon from "../components/Icons/SearchIcon";
import SearchIconActive from "../components/Icons/SearchIconActive";
import ExploreIcon from "../components/Icons/ExploreIcon";
import ExploreIconActive from "../components/Icons/ExploreIconActive";
import MessagesIcon from "../components/Icons/MessagesIcon";
import MessagesIconActive from "../components/Icons/MessagesIconActive";
import NotificationsIcon from "../components/Icons/NotificationsIcon";
import NotificationsIconActive from "../components/Icons/NotificationsIconActive";
import CreateIcon from "../components/Icons/CreateIcon";
import CreateIconActive from "../components/Icons/CreateIconActive";

export interface IMenuItems {
  id: string;
  href: string;
  text: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
  iconActive: React.FC<SVGProps<SVGSVGElement>>;
}

const menuItems: IMenuItems[] = [
  {
    id: nanoid(),
    href: "/",
    text: "Home",
    icon: HomeIcon,
    iconActive: HomeIconActive,
  },
  {
    id: nanoid(),
    href: "/search",
    text: "Search",
    icon: SearchIcon,
    iconActive: SearchIconActive,
  },
  {
    id: nanoid(),
    href: "/explore",
    text: "Explore",
    icon: ExploreIcon,
    iconActive: ExploreIconActive,
  },
  {
    id: nanoid(),
    href: "/messages",
    text: "Messages",
    icon: MessagesIcon,
    iconActive: MessagesIconActive,
  },
  {
    id: nanoid(),
    href: "/notifications",
    text: "Notificaitons",
    icon: NotificationsIcon,
    iconActive: NotificationsIconActive,
  },
  {
    id: nanoid(),
    href: "/api/users/me/create-post",
    text: "Create",
    icon: CreateIcon,
    iconActive: CreateIconActive,
  },
];

export default menuItems;
