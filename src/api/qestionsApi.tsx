import instance from "@/axios";
import { QuestionsFiltersProps } from "@/types/questionsType";
import { useQuery } from "@tanstack/react-query";

// Fetching function
const fetchQuestions = async ({
  queryKey,
}: {
  queryKey: [string, QuestionsFiltersProps | undefined];
}) => {
  const [, questionFilters] = queryKey;
  
  // Check if questionFilters is undefined and pass an empty object instead
  const response = await instance.get("Quiz", {
    params: questionFilters || {},
  });

  return response.data.data;
};

// Custom hook for fetching questions
export const useFetchQuestions = (questionFilters: QuestionsFiltersProps | undefined) => {
  return useQuery({
    queryKey: ["question", questionFilters],
    queryFn: fetchQuestions,
  });
};

