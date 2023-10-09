import { Button } from "@/components/ui/button";
import { HomeFilter } from "./components/HomeFilter";
import { PlusIcon } from "lucide-react";
import { QuestionCard } from "./components/QuestionCard";
import { NoResult } from "@/components/shared/no-result/NoResult";
import { NO_RESULT_PROPS } from "@/constants";

const fakeQuestions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      avatar: "john-doe.jpg",
    },
    upvotes: 1500000,
    views: 500552,
    answers: [],
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "3", name: "css" },
      { _id: "4", name: "html" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      avatar: "jane-smith.jpg",
    },
    upvotes: 5,
    views: 50,
    answers: [],
    createdAt: new Date("2021-09-02T10:30:00.000Z"),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h1 className="h1-bold max-sm:h2-bold">All questions</h1>
        <Button className="pr-2">
          Ask a Question
          <PlusIcon className="ml-2" width={20} height={20} />
        </Button>
      </div>
      <HomeFilter />

      <div className="flex flex-col gap-4">
        {fakeQuestions.map((question) => (
          <QuestionCard key={question._id} {...question} />
        ))}
      </div>

      {/* <NoResult className="mt-8" {...NO_RESULT_PROPS.home} /> */}
    </div>
  );
}
