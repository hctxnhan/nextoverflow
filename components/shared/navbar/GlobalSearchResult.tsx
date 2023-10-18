import { cn } from "@/lib/utils";
import { GlobalSearchResult as IGlobalSearchResult } from "@/types";
import { FrownIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { parse } from "marked";
import Link from "next/link";
import { Tag } from "../tag/Tag";

export function GlobalSearchResult({
  result,
  open,
  searchTerm,
  isLoading,
}: {
  result: IGlobalSearchResult[];
  searchTerm: string;
  open: boolean;
  isLoading: boolean;
}) {
  const hasNoResult = result.length === 0 && !isLoading && searchTerm;
  const hasResult = result.length > 0 && !isLoading && searchTerm;
  const isIdle = !result.length && !searchTerm;
  const isLoadingWithSearchTerm = isLoading && searchTerm;

  const isLoadingUI = (
    <div className="flex-center flex-col gap-2 p-8">
      <Loader2Icon
        height={50}
        width={50}
        className="animate-spin text-foreground-light"
      />
      <p className="paragraph-regular">
        Searching for all questions, tags or users that match{" "}
        <span className="paragraph-medium">&quot;{searchTerm}&quot;</span>
      </p>
    </div>
  );

  const idleUI = (
    <div className="flex-center flex-col gap-2 p-8">
      <SearchIcon height={50} width={50} className="text-foreground-light" />
      <p className="paragraph-regular">
        Search for all questions, tags or users here!
      </p>
    </div>
  );

  const noResultUI = (
    <div className="flex-center flex-col gap-2 p-8">
      <FrownIcon height={50} width={50} className="text-foreground-light" />
      <p className="paragraph-regular">
        No result found for &quot;{searchTerm}&quot;
      </p>
    </div>
  );

  const getLink = (item: IGlobalSearchResult) => {
    switch (item.type) {
      case "question":
        return `/question/${item.id}`;
      case "tag":
        return `/tags/${item.id}`;
      case "user":
        return `/user/${item.id}`;
      default:
        return "/";
    }
  };

  const resultUI = result.map((item, index) => (
    <Link
      href={getLink(item)}
      key={item.id}
      className={cn(
        "group flex flex-col gap-1 p-4 text-left hover:bg-background-darker",
        index === 0 && "rounded-t-md",
        index === result.length - 1 && "rounded-b-md",
      )}
    >
      <Tag className="self-start group-hover:bg-background">{item.type}</Tag>
      <p
        className="paragraph-regular"
        dangerouslySetInnerHTML={{
          __html: parse(item.title ?? ""),
        }}
      ></p>
      <p
        key={item.id}
        className="line-clamp-3 text-foreground-light"
        dangerouslySetInnerHTML={{
          __html: parse(item.content ?? ""),
        }}
      ></p>
    </Link>
  ));

  return (
    open && (
      <div className="absolute inset-x-0 top-full mt-2 flex flex-col gap-2 rounded-md border bg-background-lighter shadow-2xl shadow-shadow">
        {isIdle && idleUI}
        {isLoadingWithSearchTerm && isLoadingUI}
        {hasNoResult && noResultUI}
        {hasResult && resultUI}
      </div>
    )
  );
}
