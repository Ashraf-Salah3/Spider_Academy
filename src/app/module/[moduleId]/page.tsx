import { getModuleById } from "@/api/modulesApi";
import ModuleDetails from "@/components/ModuleDetails";
import { notFound } from "next/navigation";
import React from "react";

const SectionsPage = async ({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) => {
  const { moduleId } = await params;
  const moduleData = await getModuleById(moduleId);
  if (!moduleData) notFound();
  return (
    <>
      <ModuleDetails module={moduleData} />
    </>
  );
};

export default SectionsPage;
