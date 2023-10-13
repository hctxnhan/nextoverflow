import { NoResult } from "@/components/shared/no-result/NoResult";
import { NO_RESULT_PROPS } from "@/constants";

export const NoQuestionFound = () => (
  <NoResult {...NO_RESULT_PROPS.questionDetail} />
);
