
import ModuleForm from "../ModuleForm";
const AddModulePage = () => {
  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
        <h1 className="text-white font-semibold text-2xl mb-6 bg-[var(--accent)] px-8 py-3 rounded-2xl w-fit">
          Add Module
        </h1>
      </div>
      
     <ModuleForm isEdit={false} />
    </div>
  );
};

export default AddModulePage;
