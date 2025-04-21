"use client";
import { useFetcModules } from "@/api/modulesApi";
import { ModuleFilterProps, ModulesPageProps } from "@/types/moduleType";
import React, { useState } from "react";
import Loading from "../loading";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ModulesPage = () => {
  const [moduleFilter] = useState<ModuleFilterProps>({
    PageIndex: 1,
    PageSize: 10,
  });

  const router = useRouter();
  const { data: modules, isError, isLoading } = useFetcModules(moduleFilter);

  if (isLoading) return <Loading />;
  if (isError) return <p className="loading">Faild Please Try Again</p>;
  return (
    <div className="container">
      <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {modules?.items?.map((module: ModulesPageProps) => (
          <div
            key={module.id}
            className="shadow-sm rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-10px] "
          >
            <Image
              src={module?.attachment ? module?.attachment : ""}
              alt={module?.title || ""}
              width={300}
              height={300}
              className="h-60 w-full object-cover"
            />
            <div className="p-5 border-b-1 border-b-[var(--accent)] text-white">
              <h3>{module.title}</h3>
              <p className="mt-2.5 overflow-hidden line-clamp-3 ">{module.description}</p>
            </div>
            <div className="">
              <Link href={`/module/${module.id}`}>Read More</Link>
              <FaLongArrowAltRight
                onClick={() => {
                  router.push(`/course/${module.id}`);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;
