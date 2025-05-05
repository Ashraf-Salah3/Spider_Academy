import { getModuleById } from "@/api/modulesApi";
import ModuleForm from "../../ModuleForm";
import { getPaths } from "@/api/pathsApi";

const EditModulePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const moduleData = await getModuleById(id);


  
  const pathsData = await getPaths({PageIndex:1, PageSize:30 , Difficulty:""})

  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
        <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">
          Edit Module
        </h2>
      </div>
      <ModuleForm
        isEdit={true}
        initialData={moduleData}
        moduleId={id as string}
        pathsData={pathsData}
      />
    </div>
  );
};

export default EditModulePage;
