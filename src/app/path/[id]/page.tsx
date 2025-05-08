

import { getPathById } from "@/api/pathsApi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const PathPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await (params);

  const path = await getPathById(id);

  if (!path) {
    notFound();
  }

  return (
    <div className="container my-8 rounded-xl min-h-[80vh]">
      <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-semibold text-2xl mb-8 !p-b-3">
        {path.title?.toUpperCase()} PATH
      </h2>
      <div className=" rounded-xl bg-[var(--btn-color)] p-4 mb-4">
        <div className="flex flex-col md:flex-row  items-center gap-8 ">
          {path?.attachment && (
            <Image
              src={path?.attachment}
              alt={path?.title || "Image"}
              width={300}
              height={300}
              priority
              className="rounded-xl h-[17rem] w-[30rem] object-cover"

            />
          )}
          <p className="text-white">{path?.description}</p>
        </div>
      </div>

      <div>
        <h2 className="text-center text-white w-fit  border-b-3 border-[var(--accent)] mx-auto my-4 font-semibold text-2xl  !p-b-3">
          Modules
        </h2>
        <TableContainer
          component={Paper}
          className="!bg-transparent !text-white !shadow-none max-w-full"
        >
          <Table className="table table-striped table-hover">
            <TableHead className="!text-white">
              <TableRow>
                {["Name", "Difficulty", "Num Of Sections"].map((header) => (
                  <TableCell key={header} className="!border-0">
                    <div className="text-white text-center font-light break-words text-xl">
                      {header}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {path?.modules?.map((module, index: number) => (
                <TableRow
                  key={index}
                  className={`break-words max-w-full ${
                    index % 2 === 0
                      ? "!bg-[var(--btn-color)]"
                      : "!bg-transparent"
                  }`}
                >
                  <TableCell className="!text-white !text-center break-words !border-0 ">
                    <Link
                      href={`/module/${module.id}`}
                      className="cursor-pointer hover:!border-b-[var(--accent)] hover:!border-b-1 hover:!text-[var(--accent)]"
                    >
                      {module.title}
                    </Link>
                  </TableCell>

                  <TableCell className="!text-white !text-center break-words !border-0">
                    {module.difficulty}
                  </TableCell>
                  <TableCell className="!text-white !text-center  !break-words !border-0">
                    {module.numOfSections}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PathPage;
