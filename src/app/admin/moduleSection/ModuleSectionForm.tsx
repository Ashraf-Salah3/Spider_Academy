"use client";

import instance from "@/axios";
import { ModuleSectionPageProps } from "@/types/moduleSectionTyps";
import { ModulesPageProps } from "@/types/moduleType";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoUpload } from "react-icons/go";
import { toast } from "sonner";

interface ModuleFormProps {
  initialData?: ModuleSectionPageProps;
  moduleSectionId?: number | string;
  isEdit?: boolean;
  modules: ModulesPageProps;
}

const ModuleSectionForm = ({
  initialData,
  moduleSectionId,
  isEdit,
  modules,
}: ModuleFormProps) => {
  const [image, setImage] = useState<File | string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
      moduleId: initialData?.moduleId || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setImage(initialData?.attachment);
    }
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (data: ModuleSectionPageProps) => {
      const formData = new FormData();
      formData.append("Title", data.title ?? "");
      formData.append("Body", data.body ?? "");
      formData.append("ModuleId", data.moduleId?.toString() ?? "");

      if (image instanceof File) formData.append("Attachment", image);

      if (isEdit) {
        await instance.put(`ModuleSection/${moduleSectionId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await instance.post(`ModuleSection`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    onSuccess: () => {
      toast.success(isEdit ? "Module Section Updated" : "Module Section Added");

      reset(initialData);
      setImage(undefined);
    },
    onError: () => {
      toast.error("faild please try again");
    },
  });

  const onSubmit = (data: ModuleSectionPageProps) => {
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
          <label htmlFor="Path">Select Module</label>
          <select
            id="moduleId"
            className="px-4 py-3 bg-white rounded-2xl text-black text-xl"
            {...register("moduleId", { required: "Module is required" })}
          >
            <option value="">Choose a Module</option>
            {modules?.items?.map((module: ModulesPageProps) => (
              <option key={module.id} value={module.id}>
                {module.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col text-white gap-1.5 mt-4">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          {...register("body", { required: "Body is required" })}
          className="px-4 py-3 bg-white rounded-2xl text-black text-xl h-48"
        />
        {errors.body && (
          <p className="text-sm text-red-800">{errors.body.message}</p>
        )}
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
        >
          {isEdit ? "Save" : "Create Module"}
        </button>
      </div>
    </form>
  );
};

export default ModuleSectionForm;
