import React from "react";
import ModuleSectionForm from "../ModuleSectionForm";
import { getModules } from "@/api/modulesApi";

const AddModuleSectionPage = async () => {
  const modules = await getModules({ PageIndex: 1, PageSize: 30 });
  console.log(modules)
  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
        <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">
          Add Module Section
        </h2>
      </div>

      <ModuleSectionForm isEdit={false} modules={modules || []} />
    </div>
  );
};

export default AddModuleSectionPage;
