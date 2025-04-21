"use client";

import { useFetchPaths } from "@/api/pathsApi";
import { PathFilterProps, PathsProps } from "@/types/path";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import React, { useState } from "react";
import Loading from "../loading";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import Link from "next/link";

const PathsPage = () => {
  const [pathFilter, setPathFilter] = useState<PathFilterProps>({
    PageIndex: 1,
    PageSize: 3,
    Difficulty: "",
    SearchName: "",
  });
  const { data: paths, isLoading, isError } = useFetchPaths(pathFilter);

  const totalPage = Math.ceil(paths?.count / paths?.pageSize || 1);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPathFilter((prev) => ({ ...prev, PageIndex: page }));
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="loading">Faild Please Try Again</p>;
  return (
    <div className="container min-h-[80vh] my-8">
      <h2 className="text-4xl font-semibold text-white text-center  mb-8">
        Paths
      </h2>
      <div className="grid gap-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {paths?.items?.map((path: PathsProps, index: number) => (
          <div
            key={index}
            className="box text-center border-[#ccc] border-2 rounded-lg text-white "
          >
            <div className="custom-image-effect relative overflow-hidden ">
              {path?.attachment && (
                <Image
                  className="h-[300px] w-full object-cover"
                  src={path.attachment}
                  alt={path.title || ""}
                  height={300}
                  width={500}
                />
              )}
            </div>
            <h2 className="text-3xl m-auto  w-fit relative after:absolute after:w-[calc(100%-30px)] after:h-1 after:bottom-[-20px] after:left-4 after:bg-[var(--accent)]">
              {path.title}
            </h2>
            <p className="text-[#777] text-lg p-6 mt-5 overflow-ellipsis line-clamp-1  border-b-1 border-white ">
              {path.description}
            </p>

            <div className="flex items-center justify-between p-3">
              <Link
                href={`/modules/${path.id}`}
                className="py-1 px-4 block border-[var(--accent)] border-2 w-fit  font-bold rounded-lg  bg-[var(--accent)]"
              >
                Enroll
              </Link>
         
            <p className="bg-gray-600 w-fit  font-semibold rounded-lg py-1 px-4">
              {path.numOfModules}{" "}
              {path.numOfModules && path.numOfModules > 1
                ? "Modules"
                : "Module"}
            </p>
            </div>
          </div>
        ))}
      </div>
      {totalPage > 1 && (
        <div className="mt-6 flex items-center justify-center">
          <Stack spacing={2}>
            <Pagination
              count={totalPage}
              page={pathFilter?.PageIndex || 1}
              color="primary"
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  className="!text-white"
                />
              )}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default PathsPage;
