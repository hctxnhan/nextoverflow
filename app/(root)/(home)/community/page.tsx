import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearchbar } from "@/components/shared/local-searchbar/LocalSearchbar";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { LOCAL_SEARCH_FILTER_OPTIONS } from "@/constants";
import { getAllUsers } from "@/lib/actions/user.actions";
import { SortOrder } from "@/types";
import { UserCard } from "./components/UserCard";

export default async function Page() {
  const users = await getAllUsers({
    limit: 10,
    page: 1,
    sortBy: "joinedAt",
    sortOrder: SortOrder.DESC,
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="h1-bold max-sm:h2-bold">All users</h1>

      <div className="flex gap-2">
        <LocalSearchbar className="flex-1" />
        <Filter
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
          <NoResult
            className="mt-8"
            actionHref="/sign-up"
            actionText="Become a member"
            title="No users found"
            description="Join the community and start asking questions, answering questions, and interacting with other developers."
          />
        )}
      </section>
    </div>
  );
}
