"use client";

import instance from "@/axios";
import { PathsPageProps, PathsProps } from "@/types/path";
import {useQuery } from "@tanstack/react-query";

const fetchPaths = async ({
  queryKey,
}: {
  queryKey: [string, PathsPageProps];
}) => {
  const [, pathsFilter] = queryKey;
  const response = await instance.get(`EducationalPath`, {
    params: pathsFilter,
  });
  return response.data.data;
};

const fetchPathId = async ({queryKey,}:{
    queryKey: [string,string]
}):Promise<PathsProps> =>{
  const [,pathId] = queryKey;
  const response = await instance.get(`EducationalPath/${pathId}`);
  return response.data.data;
}

export const useFetchPaths = (pathsFilter: PathsPageProps) => {
  return useQuery({
    queryKey: ["paths", pathsFilter],
    queryFn: fetchPaths,
  });
};
export const useFetchPathId = (pathId:string) =>{
  return useQuery({
    queryKey: ["path", pathId],
    queryFn: fetchPathId,
  });
}

