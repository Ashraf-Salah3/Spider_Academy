import { getSectionById } from "@/api/modeuleSectionApi";
import ModuleSectionForm from "../../ModuleSectionForm";
import { getModules } from "@/api/modulesApi";

const EditModulePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const moduleSection = await getSectionById(id);
  const modules = await getModules({ PageIndex: 1, PageSize: 30 });

  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
        <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">
          Edit Module
        </h2>
      </div>
      <ModuleSectionForm
        isEdit={true}
        initialData={moduleSection}
        moduleSectionId={id as string}
        modules={modules}
      />
    </div>
  );
};

export default EditModulePage;
