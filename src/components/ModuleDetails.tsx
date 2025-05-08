"use client";

import { ModulesPageProps } from "@/types/moduleType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { RiSoundModuleFill } from "react-icons/ri";

const ModuleDetails = ({ module }: { module: ModulesPageProps }) => {
  const [section, setSection] = useState(0);
  const [selectedSection, setSelectedSection] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    if (module?.sections?.[section]?.id !== undefined) {
      setSelectedSection(module.sections[section].id);
    }
  }, [module, section]);
  return (
    <section className="p-4 md:px-20">
      <h2 className="text-center text-white w-fit border-b-4 border-[var(--accent)] mx-auto font-semibold text-2xl mb-8">
        {module.title?.toUpperCase()} MODULE
      </h2>
      <div className="rounded-xl bg-[var(--btn-color)] p-4 mb-4">
        <div className="flex items-center gap-8 max-md:flex-col">
          {module.attachment && (
            <Image
              src={module.attachment}
              alt={module.title || "Image"}
              width={300}
              height={300}
              className="rounded-xl !h-[15rem] !w-[28rem] object-cover"
            />
          )}
          <p className="text-white break-words">{module.description}</p>
        </div>
      </div>

      <div className="flex gap-12 max-md:flex-col max-md:gap-4">
        <div className="w-full lg:w-3/4 my-8">
          <h1 className="text-white m-auto font-bold mb-6 text-3xl tracking-widest border-b-3 w-fit pb-2 border-[var(--accent)]">
            {module?.sections?.[section]?.title}
          </h1>
          {module?.sections?.[section]?.attachment && (
            <Image
              src={module?.sections?.[section]?.attachment ?? ""}
              alt=""
              width={500}
              height={500}
              className="w-full object-cover mb-8 md:h-[30rem] rounded-xl"
            />
          )}

          {(module?.sections?.[section]?.body ?? "No content available")
            .split(".")
            .filter((paragraph) => paragraph.trim() !== "")
            .map((paragraph, idx) => (
              <p
                key={idx}
                className="text-gray-200 break-words tracking-widest leading-7 text-xl mb-4"
              >
                {paragraph.trim()}.
              </p>
            ))}
          {module.sections && module?.sections?.length > 1 && (
            <div className="flex gap-4 mt-4 bg-[#111927] p-4 rounded-xl text-white">
              <button
                onClick={() =>
                  setSection((prev: number) => Math.max(prev - 1, 0))
                }
                disabled={section === 0}
                className="flex items-center gap-1 !border-1 !border-[#1a2332] bg-[#1a2332] px-3 py-2 rounded-lg  hover:!bg-[#0d1119] hover:!border-[#090c10]"
              >
                <FaLongArrowAltLeft />
                Prev
              </button>
              <button
                onClick={() =>
                  setSection((prev: number) =>
                    module?.sections && prev < module.sections.length - 1
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  !module?.sections || section >= module.sections.length - 1
                }
                className="flex items-center gap-1 !border-1 !border-[#1a2332] bg-[#1a2332] px-3 py-2 rounded-lg  hover:!bg-[#0d1119] hover:!border-[#090c10]"
              >
                Next
                <FaLongArrowAltRight />
              </button>
            </div>
          )}
        </div>
        {module?.sections && (
          <div className="card   h-full w-full lg:w-1/4 p-4 lg:mt-[10rem] rounded-lg  bg-[var(--btn-color)] text-white ">
            <div className="card-body bg-color-blue-nav">
              <h1 className="mb-2 font-bold text-xl">Module Sections</h1>
              {module?.sections?.map((section, index: number) => (
                <ul key={section.id} className="px-4">
                  <li
                    onClick={() => {
                      setSection(index);
                    }}
                    className={`flex items-center gap-1 font-semibold text-lg cursor-pointer rounded-md p-2 bg-[#1a2332] mb-3  hover:!bg-[#141d2b]
                          ${
                            selectedSection === section.id
                              ? " text-[var(--accent)]"
                              : ""
                          }
                          `}
                  >
                    <RiSoundModuleFill color="var(--accent)" />
                    {section.title}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModuleDetails;
