"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import instance from "@/axios";
import { GoUpload } from "react-icons/go";
import { useMutation } from "@tanstack/react-query";
import { ModulesPageProps } from "@/types/moduleType";
import { PathsProps } from "@/types/path";

interface ModuleFormProps {
  initialData?: ModulesPageProps;
  moduleId?: string;
  isEdit?: boolean;
  pathsData: PathsProps;
}

const ModuleForm = ({
  initialData,
  moduleId,
  isEdit,
  pathsData,
}: ModuleFormProps) => {
  const [image, setImage] = useState<File | string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      numOfSections: initialData?.numOfSections || 0,
      expectedTimeToComplete: initialData?.expectedTimeToComplete || "",
      difficulty: initialData?.difficulty || "",
      description: initialData?.description || "",
      pathId: initialData?.pathId || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      const transformedData = {
        ...initialData,
        expectedTimeToComplete: initialData.expectedTimeToComplete
          ? new Date(initialData.expectedTimeToComplete)
              .toISOString()
              .slice(0, 16)
          : "",
      };

      reset(transformedData);
      setImage(initialData.attachment);
    }
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (data: ModulesPageProps) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("Title", data.title ?? "");
      formData.append("NumOfSections", data.numOfSections?.toString() ?? "");
      formData.append("Difficulty", data.difficulty ?? "");
      formData.append("Description", data.description ?? "");
      formData.append("PathId", data.pathId ?? "");

      if (image instanceof File) formData.append("Attachment", image);

      if (isEdit && moduleId) {
        await instance.put(`Module/${moduleId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await instance.post("Module", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: () => {
      toast.success(isEdit ? "Module Updated" : "Module Added");
      reset();
      setImage(undefined);
    },
    onError: () => {
      toast.error("Failed to process Module");
      
    },
  });
  const onSubmit = (data: ModulesPageProps) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 max-w-full">
        <div className="flex flex-col text-white gap-1.5">
          <label htmlFor="Title">Title</label>
          <input
            id="Title"
            type="text"
            className="px-4 py-3 bg-white rounded-2xl text-black text-xl"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-800">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col text-white gap-1.5">
          <label htmlFor="NumOfSections">Num Of Sections</label>
          <input
            id="NumOfSections"
            type="number"
            className="px-4 py-3 bg-white rounded-2xl text-black text-xl"
            {...register("numOfSections", {
              required: "Num Of Modules is required",
            })}
          />
          {errors.numOfSections && (
            <p className="text-sm text-red-800">
              {errors.numOfSections.message}
            </p>
          )}
        </div>

        <div className="flex flex-col text-white gap-1.5">
          <label htmlFor="Difficulty">Difficulty</label>
          <select
            id="Difficulty"
            className="px-4 py-3 bg-white rounded-2xl text-black text-xl"
            {...register("difficulty", {
              required: "Difficulty is required",
            })}
          >
            <option value="">Choose a Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex flex-col text-white gap-1.5">
          <label htmlFor="Path">Path</label>
          <select
            id="Path"
            className="px-4 py-3 bg-white rounded-2xl text-black text-xl"
            {...register("pathId", { required: "Path is required" })}
          >
            <option value="">Choose a Path</option>
            {pathsData?.items?.map((path: PathsProps) => (
              <option key={path.id} value={path.id}>
                {path.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col text-white gap-1.5 mt-4">
        <label htmlFor="Description">Description</label>
        <textarea
          id="Description"
          {...register("description")}
          className="px-4 py-3 bg-white rounded-2xl text-black text-xl h-48"
        />
      </div>
      {/* File Upload */}
      <div>
        <label
          htmlFor="file"
          className="flex flex-col text-white gap-1.5 mt-6 rounded-2xl"
          style={{ border: !image ? "2px dashed var(--accent)" : "0" }}
        >
          <input id="file" type="file" onChange={handleImageChange} hidden />
          <div
            className="flex flex-col rounded-2xl"
            style={{
              backgroundImage: image
                ? image instanceof File
                  ? `url(${URL.createObjectURL(image)})`
                  : `url(${image})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "6rem",
            }}
          >
            {!image && (
              <div className="flex items-center flex-col gap-3">
                <GoUpload size={30} color="var(--accent)" />
                <h4 className="text-sm">
                  Drag & Drop or <span>Choose file</span> to upload Image Cover
                </h4>
              </div>
            )}
          </div>
        </label>
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="!bg-[var(--accent)] rounded-2xl px-8 py-1.5 text-white text-xl"
          disabled={loading}
        >
          {loading ? "loading.." : isEdit ? "Save" : "Create Module"}
        </button>
      </div>
    </form>
  );
};

export default ModuleForm;
