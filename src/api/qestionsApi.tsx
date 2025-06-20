import {
  QuestionsFiltersProps,
  QuestionsPageProps,
} from "@/types/questionsType";
import { toast } from "sonner";

// Fetching function
export const fetchQuestions = async (
  filters: QuestionsFiltersProps
): Promise<QuestionsPageProps[]> => {
  const query = new URLSearchParams(
    filters as Record<string, string>
  ).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Quiz?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    toast.error("faild Please Try Again");
    return [];
  }

  const data = await res.json();
  return data.data;
};

export const fetchQuestionsById = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Quiz/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
};

export const fetchSingleQuestion = async (sectionId: string):Promise<QuestionsPageProps> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Quiz/${sectionId}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return  data.data;
};
// Custom hook for fetching questions
