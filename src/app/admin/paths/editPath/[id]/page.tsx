"use client";

import { useFetchPathId } from "@/api/pathsApi";
import { useParams } from "next/navigation";

import PathForm from "../../PathForm";

const EditPathPage = () => {
  const params = useParams();
  const pathId = params?.id as string;
  const { data: path } = useFetchPathId(pathId ?? "");


  return (
    <div className="w-3/4 m-auto mt-6 ">
      <div className="flex justify-center">
      <h1 className="text-white font-semibold text-2xl mb-6 bg-[var(--accent)] px-8 py-3 rounded-2xl w-fit">
        Edit Path
      </h1>
      </div>
      <PathForm initialData={path} isEdit pathId={pathId}/>
    </div>
  );
};

export default EditPathPage;
