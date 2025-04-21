"use client"
import { useFetchSingleModule } from "@/api/modulesApi";
import { useParams } from "next/navigation";
import ModuleForm from "../../ModuleForm";

const EditModulePage = () => {
  const params = useParams();
  const pathId = params?.id as string;
  const { data: module } = useFetchSingleModule(pathId);

  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
        <h1 className="text-white font-semibold text-2xl mb-6 bg-[var(--accent)] px-8 py-3 rounded-2xl w-fit">
          Edit Module
        </h1>
      </div>
      <ModuleForm isEdit={true} initialData={module} pathId={pathId as string} />
    </div>
  );
};

export default EditModulePage;
