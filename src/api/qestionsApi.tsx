import {
  QuestionsFiltersProps,
  QuestionsPageProps,
} from "@/types/questionsType";
import { toast } from "sonner";
import API_URL from "../../configapi";

// Fetching function
export const fetchQuestions = async (
  filters: QuestionsFiltersProps
): Promise<QuestionsPageProps[]> => {
  const query = new URLSearchParams(
    filters as Record<string, string>
  ).toString();

  const res = await fetch(`${API_URL}/Quiz?${query}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    toast.error("faild Please Try Again");
    return [];
  }

  const data = await res.json();
  return data.data;
};

export const fetchQuestionsById = async (id: string) => {
  const response = await fetch(`${API_URL}/Quiz/${id}`);

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
};
// Custom hook for fetching questions
