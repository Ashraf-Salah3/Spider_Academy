import { getPaths } from "@/api/pathsApi";
import ModuleForm from "../ModuleForm";
const AddModulePage = async() => {
    const pathsData = await getPaths({PageIndex:1, PageSize:30 , Difficulty:""})
  
  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
        <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">
          Add Module
        </h2>
      </div>

      <ModuleForm isEdit={false} pathsData={pathsData}/>
    </div>
  );
};

export default AddModulePage;
