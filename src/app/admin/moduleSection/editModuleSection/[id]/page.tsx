"use client"
import { useParams } from "next/navigation";
import ModuleSectionForm from "../../ModuleSectionForm";
import { useFetchSingleModuleSection } from "@/api/modeuleSectionApi";

const EditModulePage = () => {
  const params = useParams<{ id: string }>();
  const moduleSectionId = params?.id;

  const { data: moduleSection } = useFetchSingleModuleSection(moduleSectionId);

  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
        <h1 className="text-white font-semibold text-2xl mb-6 bg-[var(--accent)] px-8 py-3 rounded-2xl w-fit">
          Edit Module
        </h1>
      </div>
      <ModuleSectionForm isEdit={true} initialData={moduleSection} moduleSectionId={moduleSectionId as string} />
    </div>
  );
};

export default EditModulePage;