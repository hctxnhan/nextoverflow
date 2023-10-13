import { Button } from "@/components/ui/button";
import { getTopQuestions, getTopTags } from "@/lib/actions/question.actions";
import Link from "next/link";
import { Tag } from "../tag/Tag";

export async function RightSidebar() {
  const [questions, tags] = await Promise.all([
    getTopQuestions(),
    getTopTags(),
  ]);

  return (
    <section className="sticky right-0 top-0 h-screen w-[300px] p-4 pt-24 max-lg:hidden">
      <h1 className="h3-bold mb-3">Top Questions</h1>
      <ol className="mb-10 flex flex-col gap-2">
        {questions.map((question) => (
          <li key={question.id} className="flex gap-4">
            <Link
              className="paragraph-medium"
              href={`/question/${question.id}`}
            >
              <Button
                variant={"link"}
                className="text-left text-foreground-light hover:text-accent"
              >
                {question.title}
              </Button>
            </Link>
          </li>
        ))}
      </ol>
      <h1 className="h3-bold mb-3">Popular Tags</h1>
      <ol className="mb-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.name} className="flex gap-4">
            <Link className="paragraph-medium" href={`/tags/${tag.name}`}>
              <Tag className="px-4 py-1.5 hover:bg-accent hover:text-accent-foreground">
                <p className="body-regular">{tag.name}</p>
              </Tag>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
