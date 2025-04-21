"use client";

import instance from "@/axios";
import { ModulesPageProps } from "@/types/moduleType";
import { useQuery } from "@tanstack/react-query";

const fetchModules = async ({
  queryKey,
}: {
  queryKey: [string, ModulesPageProps];
}) => {
  const [, moduleFilter] = queryKey;
  const response = await instance.get("Module", { params: moduleFilter });
  return response.data.data;
};

const fetchSingleModule = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, moduleId] = queryKey;
  const response = await instance.get(`Module/${moduleId}`);
  return response.data.data;
};
export const useFetcModules = (moduleFilter: ModulesPageProps) => {
  return useQuery({
    queryKey: ["module", moduleFilter],
    queryFn: fetchModules,
  });
};
export const useFetchSingleModule = (moduleId: string) => {
  return useQuery({
    queryKey: ["singleModule", moduleId],
    queryFn: fetchSingleModule,
  });
};
