import { ModulesPageProps } from "@/types/moduleType";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getModules } from "@/api/modulesApi";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
interface SearchParams {
  [key: string]: string | string[] | undefined;
}
const ModulesPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;
  let curruntPage;
  if (params?.page) {
    curruntPage = parseInt((params.page as string) || "1");
  }

  const pageSize = 6;

  const modules = await getModules({
    PageIndex: curruntPage,
    PageSize: pageSize,
  });
  const count = modules?.count || 1;

  return (
    <div className="container min-h-[80vh] my-8 mt-4">
      <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-semibold text-2xl mb-8 ">
        Modules
      </h2>
      <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] !mb-8">
        {modules?.items?.map((module: ModulesPageProps) => (
          <div
            key={module.id}
            className="shadow-sm rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-10px] flex flex-col"
          >
            <Image
              src={module?.attachment ? module?.attachment : ""}
              alt={module?.title || ""}
              width={300}
              height={300}
              className="rounded-xl h-[17rem] w-[30rem] object-cover"
            />
            <div className="p-5 text-white">
              <h3 className="text-center  border-b-2 border-[var(--accent)] w-fit m-auto text-xl font-semibold ">
                {module.title}
              </h3>
              <p className="text-[#777] text-lg mt-3 break-all line-clamp-3 ">
                {module.description}
              </p>
            </div>

            <div className="mt-auto p-5 flex items-center justify-between gap-3 text-white  border-t-1 border-t-[var(--accent)]">
              <p className="block bg-[var(--secondary-color)] font-bold rounded-lg !px-2">
                {module?.numOfSections} Sections
              </p>
              <Link
                href={`/module/${module.id}`}
                className="bg-[var(--accent)] px-6 py-0.5 rounded-sm"
              >
                Start
              </Link>
            </div>
          </div>
        ))}
      </div>

        <div className="!text-white mt-auto">
          <PaginationWithLinks
            page={curruntPage || 1}
            pageSize={pageSize}
            totalCount={count}
          />
        </div>
    </div>
  );
};

export default ModulesPage;
