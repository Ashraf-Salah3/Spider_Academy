
import PathForm from "../../PathForm";
import { getPathById } from "@/api/pathsApi";

type Params = Promise<{ id: string }>

const EditPathPage = async ({ params }: { params: Params }) => {

const {id} = await params

const path = await getPathById(id)

  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
      <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">

        Edit Path
      </h2>
      </div>
      <PathForm initialData={path} isEdit pathId={id}/>
    </div>
  );
};

export default EditPathPage;
