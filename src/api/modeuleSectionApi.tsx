import {
  ModuleSectionFilterProps,
  ModuleSectionPageProps,
} from "@/types/moduleSectionTyps";

export const getModulesSection = async (
  filters: ModuleSectionFilterProps
): Promise<ModuleSectionPageProps[]> => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${process.env.API_URL}/ModuleSection?${queryParams}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.errors?.[0] || "Failed to fetch Sections .");
  }

  const data = await response.json();
  return data.data;
};

export const getSectionById = async (
  id: string
): Promise<ModuleSectionPageProps> => {
  const response = await fetch(`${process.env.API_URL}/ModuleSection/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.errors?.[0] || "Failed to fetch Section .");
  }

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data.data;
};
