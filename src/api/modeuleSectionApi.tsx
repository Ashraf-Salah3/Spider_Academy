import instance from "@/axios";
import { ModuleSectionFilterProps } from "@/types/moduleSectionTyps";
import { useQuery } from "@tanstack/react-query";

const fetchModuleSection = async ({
  queryKey,
}: {
  queryKey: [string, Partial<ModuleSectionFilterProps>];
}) => {
  const [, moduleSectionFilter] = queryKey;
  const response = await instance.get("ModuleSection", {
    params: moduleSectionFilter,
  });
  return response.data.data;
};



const fetchSingleModuleSection = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, moduleSectionId] = queryKey;
  const response = await instance.get(`ModuleSection/${moduleSectionId}`);
  return response.data.data;
};



export const useFetchModuleSection = (
  moduleSectionFilter?: Partial<ModuleSectionFilterProps>
) => {
  return useQuery({
    queryKey: ["moduleSection", moduleSectionFilter || {}],
    queryFn: fetchModuleSection,
  });
};

export const useFetchSingleModuleSection = (moduleSectionId: string) => {
  return useQuery({
    queryKey: ["singleModule", moduleSectionId],
    queryFn: fetchSingleModuleSection,
  });
};
