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

export const LOCAL_SEARCH_FILTER_OPTIONS = {
  home: [
    { label: "Newest", value: "newest" },
    { label: "Recommended", value: "recommended" },
    { label: "Frequent", value: "frequent" },
    { label: "Unanswered", value: "unanswered" },
  ],
  community: [
    {
      label: "New Users",
      value: "new-users",
    },
    {
      label: "Old Users",
      value: "old-users",
    },
    {
      label: "Top Contributors",
      value: "top-contributors",
    },
  ],
  tags: [
    {
      label: "Popular",
      value: "popular",
    },
    {
      label: "Recent",
      value: "recent",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
  ],
  answers: [
    {
      label: "Most Upvotes",
      value: "most-upvotes",
    },
    {
      label: "Most Downvotes",
      value: "most-downvotes",
    },
    {
      label: "Most Recent",
      value: "most-recent",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
  ],
  collection: [
    {
      label: "Most Recent",
      value: "most-recent",
    },
    {
      label: "Most Voted",
      value: "most-voted",
    },
    {
      label: "Most Answered",
      value: "most-answered",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
    {
      label: "Most Viewed",
      value: "most-viewed",
    },
  ],
};

export const NO_RESULT_PROPS: Record<string, NoResultProps> = {
  home: {
    title: "There are no question to show",
    description:
      "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡",
    actionHref: "/ask-question",
    actionText: "Ask a question",
  },
  community: {
    actionHref: "/sign-up",
    actionText: "Become a member",
    title: "No users found",
    description:
      "Join the community and start asking questions, answering questions, and interacting with other developers.",
  },
  tags: {
    actionHref: "/ask-question",
    actionText: "Ask a question",
    title: "No tags found",
    description:
      "Start by asking a question and adding tags to it. This will help other developers find your question and answer it.",
  },
  questionDetail: {
    title: "You're lost",
    description:
      "The question you're looking for doesn't exist. Maybe the question was deleted or the URL is incorrect. Please check the URL again or contact us if you think this is a mistake.",
    actionText: "Go back home",
    actionHref: "/",
  },
  collection: {
    title: "You haven't saved any questions yet",
    description:
      "You can save questions by clicking on the bookmark icon on the question detail page.",
    actionText: "Explore questions",
    actionHref: "/",
  },
  tagDetail: {
    title: "You're lost",
    description:
      "The tag you're looking for doesn't exist. Maybe the tag was deleted or the URL is incorrect. Please check the URL again or contact us if you think this is a mistake.",
    actionText: "Go back home",
    actionHref: "/",
  },
};
