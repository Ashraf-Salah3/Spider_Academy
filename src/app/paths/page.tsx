import { getPaths } from "@/api/pathsApi";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

const PathsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  let curruntPage;
  if (params?.page) {
    curruntPage = parseInt((params.page as string) || "1");
  }

  const pageSize = 3;

  const paths = await getPaths({
    PageIndex: curruntPage || 1,
    PageSize: pageSize,
    Difficulty: "",
    SearchName: "",
  });

  const count = paths?.count || 0;

  return (
    <div className="container min-h-screen my-8 mt-5 flex flex-col">
      <h2 className="text-center text-white w-fit border-b-3 border-[var(--accent)] mx-auto my-4 font-bold text-2xl mb-8">
        Paths
      </h2>

      <div className="grid gap-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-8 ">
        {paths?.items?.map((path, index) => (
          <div
            key={index}
            className="box text-center border-[#ccc] border-2 rounded-lg text-white flex flex-col cursor-pointer overflow-hidden "
          >
            <div className="custom-image-effect relative overflow-hidden ">
              {path?.attachment && (
                <Image
                  className="w-full object-cover h-[25rem]"
                  src={path.attachment}
                  alt={path.title || ""}
                  height={500}
                  width={500}
                  priority
                />
              )}
            </div>

            <h2 className="text-3xl m-auto w-fit relative after:absolute after:w-[calc(100%-30px)] after:h-1 after:bottom-[-20px] after:left-4 after:bg-[var(--accent)]">
              {path.title}
            </h2>

            <p className="text-[#777] text-lg p-6 my-8 mt-12 break-all line-clamp-2">
              {path.description}
            </p>

            <div className="flex items-center justify-between p-5 mt-auto">
              <Link
                href={`/path/${path.id}`}
                className="py-1 px-4 block border-[var(--accent)] border-2 w-fit font-bold rounded-lg bg-[var(--accent)]"
              >
                Enroll
              </Link>
              <p className="bg-gray-600 w-fit font-semibold rounded-lg py-1 px-4">
                {path.numOfModules}{" "}
                {path.numOfModules && path.numOfModules > 1
                  ? "Modules"
                  : "Module"}
              </p>
            </div>
          </div>
        ))}
      </div>
  
        <div className="!text-white mt-auto ">
          <PaginationWithLinks
            page={curruntPage || 1}
            pageSize={pageSize}
            totalCount={count}
          />
        </div>

    </div>
  );
};

export default PathsPage;
