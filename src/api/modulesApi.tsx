import { ModuleFilterProps, ModulesPageProps } from "@/types/moduleType";

export const getModules = async (
  filters: ModuleFilterProps
): Promise<ModulesPageProps> => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/Module?${queryParams.toString()}`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.errors?.[0] || "Failed to fetch modules.");
  }

  const data = await response.json();
  return data.data;
};

export const getModuleById = async (id: string): Promise<ModulesPageProps> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/Module/${id}`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.errors?.[0] || "Failed to fetch module by ID.");
  }

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data.data;
};
