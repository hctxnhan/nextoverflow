import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { LOCAL_SEARCH_FILTER_OPTIONS, NO_RESULT_PROPS } from "@/constants";
import { getAllUsers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { UserCard } from "./components/UserCard";

export default async function Page({ searchParams }: SearchParamsProps) {
  const users = await getAllUsers({
    limit: 10,
    page: 1,
    filter: searchParams.filter,
    search: searchParams.search,
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">All users</h1>

      <div className="flex gap-2">
        <LocalSearchbar className="flex-1" />
        <Filter
          defaultFilter="new-users"
          className="w-[200px]"
          options={LOCAL_SEARCH_FILTER_OPTIONS.community}
        />
      </div>

      <section>
        {users.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {users.map((user) => (
              <UserCard
                imageUrl={user.picture}
                username={user.username}
                name={user.name}
                key={user.username}
              />
            ))}
          </div>
        ) : (
          <NoResult className="mt-8" {...NO_RESULT_PROPS.community} />
        )}
      </section>
    </div>
  );
}
