
import PathForm from "../PathForm";

const AddPathPage = () => {
  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
      <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">
  
          Add Path
        </h2>
      </div>
      <PathForm />
    </div>
  );
};

export default AddPathPage;
