"use client";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import instance from "@/axios";
import { PathsProps } from "@/types/path";
import { GoUpload } from "react-icons/go";

import { useMutation } from "@tanstack/react-query";

interface PathFormProps {
  initialData?: PathsProps;
  isEdit?: boolean;
  pathId?: string;
}
const PathForm = ({ isEdit, initialData, pathId }: PathFormProps) => {
  const [image, setImage] = useState<File | string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      numOfModules: initialData?.numOfModules || 0,
      difficulty: initialData?.difficulty || "",
      description: initialData?.description || "",
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
    mutationFn: async (data: PathsProps) => {
      const formData = new FormData();
      formData.append("Title", data.title ?? "");
      formData.append("NumOfModules", data.numOfModules?.toString() ?? "");
      formData.append("Difficulty", data.difficulty ?? "");
      formData.append("Description", data.description ?? "");
      if (image instanceof File) formData.append("Attachment", image);
      if (isEdit && pathId) {
        await instance.put(`EducationalPath/${pathId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await instance.post("EducationalPath", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    },

    onSuccess: () => {
      toast.success(isEdit ? "Path Updated" : "Path Added");

      reset();
      setImage(undefined);
    },
    onError: () => {
      toast.error("Failed Please try again");
    },
  });

  const onSubmit = (data: PathsProps) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 max-w-full">
        {/* Name Field */}
        <div className="flex flex-col  text-white gap-1.5">
          <label htmlFor="title">Title</label>
          <input
            className="px-4 py-3 !bg-white rounded-2xl !text-black !text-xl"
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-800">{errors.title.message}</p>
          )}
        </div>

        {/* Value Field */}
        <div className="flex flex-col  text-white gap-1.5 ">
          <label htmlFor="NumOfModules">Num Of Modules</label>
          <input
            id="NumOfModules"
            type="number"
            min="1"
            className="px-4 py-3 !bg-white rounded-2xl !text-black !text-xl"
            {...register("numOfModules", {
              required: "Num Of Modules is required",
              valueAsNumber: true,
              min: { value: 1, message: "Value must be at least 1" },
            })}
          />
          {errors.numOfModules && (
            <p className="text-sm text-red-800">
              {errors.numOfModules.message}
            </p>
          )}
        </div>

        {/* Level Field */}
        <div className="flex flex-col  text-white gap-1.5">
          <label htmlFor="Difficulty">Difficulty</label>
          <select
            className="px-4 py-3 !bg-white rounded-2xl !text-black !text-xl"
            id="Difficulty"
            {...register("difficulty", {
              required: "Difficulty is required",
            })}
          >
            <option value="">Choose a Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-sm text-red-800">{errors.difficulty.message}</p>
          )}
        </div>
      </div>
      {/* Message Field */}
      <div className="flex flex-col  text-white gap-1.5 mt-4">
        <label htmlFor="Description">Description</label>
        <textarea
          id="Description"
          {...register("description")}
          className="px-4 py-3 !bg-white rounded-2xl !text-black !text-xl h-48"
        />
      </div>

      {/* File Upload */}
      <div>
        <label
          htmlFor="file"
          className="flex flex-col text-white gap-1.5 mt-6 rounded-2xl"
          style={{ border: !image ? "2px dashed var(--accent)" : "0" }}
        >
          <input
            id="file"
            type="file"
            onChange={handleImageChange}
            hidden
            
          />
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
      <div className="flex items-center justify-center mt-8 ">
        <button
          type="submit"
          className="!bg-[var(--accent)] rounded-2xl px-8 py-1.5 text-white text-xl"
        >
          {isEdit ? "Save" : "Create Path"}
        </button>
      </div>
    </form>
  );
};

export default PathForm;
