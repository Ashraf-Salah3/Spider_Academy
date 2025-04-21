"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  PaginationItem,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/axios";
import { toast } from "sonner";
import { ModuleFilterProps, ModulesPageProps } from "@/types/moduleType";
import { useFetcModules } from "@/api/modulesApi";
import Loading from "@/app/loading";
import { formatDistanceToNow, format } from "date-fns";

const ModulesPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const [moduleFilter, setModuleFilter] = useState<ModuleFilterProps>({
    PageIndex: 1,
    PageSize: 16,
  });
  const { data: modules, isLoading,isError } = useFetcModules(moduleFilter);

  const totalPage = Math.ceil(modules?.count / (moduleFilter?.PageSize || 1));

  const formData = (
    dateStr: string | undefined
  ): { formattedDate: string; timeLeft: string } => {
    if (!dateStr) {
      return { formattedDate: "N/A", timeLeft: "N/A" };
    }
  
    const utcDate = new Date(dateStr);
  
    if (isNaN(utcDate.getTime())) {
      return { formattedDate: "Invalid Date", timeLeft: "Invalid Date" };
    }
  
    const localDate = new Date(
      utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
    );
  
    const formattedDate = format(localDate, "MMM dd, yyyy");
    const timeLeft = formatDistanceToNow(localDate, { addSuffix: true });
  
    return { formattedDate, timeLeft };
  };


  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setModuleFilter((prev) => ({ ...prev, PageIndex: page }));
  };

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
   
        await instance.delete(`Module/${id}`);
    
    },
    onSuccess: () => {
      toast.success("Module deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["module"] });
    },
    onError: () => {
      toast.error("Failed to delete Module");
    },
  });

  const handleDeleteModule = (id: number | null) => {
    setSelectedModuleId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedModuleId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedModuleId) {
      await mutate(selectedModuleId);
    }
    handleCloseDialog();
  };

  if (isLoading) {
    return <Loading />;
  }
  if(isError) return <p className="loading">Faild Please Try Again</p>

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between text-white my-6 ">
        <h1 className="font-semibold text-2xl">Modules</h1>
        <button
          className="!bg-[var(--accent)] py-2 px-4 rounded-xl flex items-center gap-1"
          onClick={() => router.push("/admin/modules/addModule")}
        >
          <FaPlus />
          Add New
        </button>
      </div>
      <TableContainer
        component={Paper}
        className="!bg-transparent !text-white !shadow-none max-w-full"
      >
        <Table className="table table-striped table-hover">
          <TableHead className="!text-white">
            <TableRow>
              {[
                "Id",
                "title",
                "Description",
                "Difficulty",
                "Num Of Sections",
                "Expected Time To Complete",
                "Path",
                "Action",
              ].map((header) => (
                <TableCell key={header}>
                  <div className="text-white text-center font-light break-words text-xl">
                    {header}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {modules?.items?.map((module: ModulesPageProps, index: number) => (
              <TableRow key={index} className="break-words max-w-full">
                <TableCell className="!text-white !text-center break-words ">
                  {module.id}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
                  {module.title}
                </TableCell>
                <TableCell className="!text-white !text-center break-all !break-words ">
                  {module.description}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
                  {module.difficulty}
                </TableCell>
                <TableCell className="!text-white !text-center  !break-words ">
                  {module.numOfSections}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
       {formData(module.expectedTimeToComplete).formattedDate}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
                  {module.path}
                </TableCell>
                <TableCell >
                  <div className="!flex items-center justify-center gap-4">
                  <button
                    className="--btn"
                    onClick={() =>
                      router.replace(`/admin/modules/editModule/${module.id}`)
                    }
                  >
                    <RiEdit2Fill size={18} color="var(--accent)" />
                  </button>
                  <button
                    className="--btn"
                    onClick={() => handleDeleteModule(module.id ? module.id : null)}
                  >
                    <RiDeleteBin2Fill size={18} color="red" />
                  </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle className="!text-[var(--accent)] !font-bold  text-center">Delete Module</DialogTitle>
        <DialogContent>
          <p>Are You Sure To Delete This Module</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className="!bg-red-800 !text-white  !font-bold " >
           Cancle
          </Button>
          <Button onClick={handleConfirmDelete} className="!bg-[var(--accent)] !text-white  !font-bold " >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {totalPage > 1 && (
        <div className="mt-6 flex items-center justify-center">
          <Stack spacing={2}>
            <Pagination
              count={totalPage}
              page={moduleFilter?.PageIndex || 1}
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

export default ModulesPage;
