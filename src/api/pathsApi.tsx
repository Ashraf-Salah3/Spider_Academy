import { PathFilterProps, PathsProps } from "@/types/path";


export const getPaths = async (
  filters: PathFilterProps
): Promise<PathsProps> => {

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });
  const response = await fetch(
    `https://spideracademy.runasp.net/api/EducationalPath?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch paths");
  }
  const data = await response.json();

  return data.data;
};

// Fetch a specific path by ID using fetch instead of axios
export const getPathById = async (id: string): Promise<PathsProps> => {
  const response = await fetch(`https://spideracademy.runasp.net/api/EducationalPath/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch path by ID");
  }

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data.data;
};
