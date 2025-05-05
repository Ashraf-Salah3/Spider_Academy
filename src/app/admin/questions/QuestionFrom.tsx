"use client";

import instance from "@/axios";
import { ModuleSectionPageProps } from "@/types/moduleSectionTyps";
import { QuestionsPageProps } from "@/types/questionsType";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface QuestionsProps {
  isEdit?: boolean;
  initialData?: QuestionsPageProps;
  questionId?: string;
  sections:ModuleSectionPageProps[]
}
const QuestionFrom = ({ isEdit, initialData, questionId , sections}: QuestionsProps) => {
 
  console.log(initialData)
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<QuestionsPageProps>({
    defaultValues: {
      title: initialData?.title || "",
      answer: initialData?.answer || "",
      sectionId: initialData?.sectionId || "",
    },
  });
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const { mutate } = useMutation({
    mutationKey: ["question"],
    mutationFn: async (data: QuestionsPageProps) => {
      setLoading(true);
      if (isEdit && questionId) {
        await instance.put(`Quiz/${questionId}`, {
          title: data.title,
          answer: data.answer,
          sectionId: data.sectionId,
        });
      } else {
        await instance.post("Quiz", data);
      }
    },
    onSuccess: () => {
      toast.success(
        isEdit ? "Question Updated Sucssfully" : "Question Added Sucssfully"
      );

      

      setLoading(false);
      reset();
    },
    onError: () => {
      toast.error("Faild Please Try Again");
      setLoading(false);
    },
  });

  const onSubmit = (data: QuestionsPageProps) => {
    mutate(data);
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">
        {isEdit ? "Edit Question" : "Add Question"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-full bg-[var(--btn-color)] p-4 rounded-xl w-3/4 m-auto">
        <div className="flex flex-col gap-x-8 gap-y-2.5 ">
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
            <label htmlFor="answer">Answer</label>
            <input
              id="answer"
              type="text"
              className="px-4 py-3 bg-white rounded-2xl text-black text-xl"
              {...register("answer", { required: "Answer is required" })}
            />
            {errors.answer && (
              <p className="text-sm text-red-800">{errors.answer.message}</p>
            )}
          </div>

          <div className="flex flex-col text-white gap-1.5">
            <label htmlFor="Path">Choose Section</label>
            <select
              id="sectionId"
              className="px-4 py-3 bg-white rounded-2xl text-black text-xl"
              {...register("sectionId", { required: "SectionId is required" })}
            >
              <option value="">Choose Section</option>
              {sections?.map((section: ModuleSectionPageProps) => (
                
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="!bg-[var(--accent)] rounded-xl px-4 py-1.5 text-white text-sm"
          >
            {isEdit
              ? loading
                ? "Loading"
                : "Save"
              : loading
              ? "Loading"
              : "Create Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionFrom;
