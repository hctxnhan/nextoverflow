import { SidebarLink } from "@/types";
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react";
import HomeSvg from "@/public/assets/icons/home.svg";
import CommunitySvg from "@/public/assets/icons/users.svg";
import StarSvg from "@/public/assets/icons/star.svg";
import SuitcaseSvg from "@/public/assets/icons/suitcase.svg";
import TagSvg from "@/public/assets/icons/tag.svg";
import UserSvg from "@/public/assets/icons/user.svg";
import QuestionSvg from "@/public/assets/icons/question.svg";
import { NoResultProps } from "@/components/shared/no-result/NoResult";

export const THEMES = [
  {
    value: "light",
    label: "Light",
    icon: <SunIcon width={20} height={20} />,
    alt: "Switch to light mode",
  },
  {
    value: "dark",
    label: "Dark",
    icon: <MoonIcon width={20} height={20} />,
    alt: "Switch to dark mode",
  },
  {
    value: "system",
    label: "System",
    icon: <ComputerIcon width={20} height={20} />,
    alt: "Switch to system mode",
  },
];

export const SIDE_NAV_ITEMS: SidebarLink[] = [
  {
    Icon: HomeSvg,
    route: "/",
    label: "Home",
  },
  {
    Icon: CommunitySvg,
    route: "/community",
    label: "Community",
  },
  {
    Icon: StarSvg,
    route: "/collection",
    label: "Collections",
  },
  {
    Icon: SuitcaseSvg,
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    Icon: TagSvg,
    route: "/tags",
    label: "Tags",
  },
  {
    Icon: UserSvg,
    route: "/profile",
    label: "Profile",
  },
  {
    Icon: QuestionSvg,
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const HOME_FILTER_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Recommended", value: "recommended" },
  { label: "Frequent", value: "frequent" },
  { label: "Unanswered", value: "unanswered" },
];

export const NO_RESULT_PROPS: Record<string, NoResultProps> = {
  home: {
    title: "There are no question to show",
    description: "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡",
    actionHref: "/ask-question",
    actionText: "Ask a question",
  }
}