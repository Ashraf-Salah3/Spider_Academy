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
import { useFetchModuleSection } from "@/api/modeuleSectionApi";
import {
  ModuleSectionFilterProps,
  ModuleSectionPageProps,
} from "@/types/moduleSectionTyps";
import Loading from "@/app/loading";

const ModuleSectionPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  const [moduleSectionFilter, setModuleSectionFilter] =
    useState<ModuleSectionFilterProps>({
      PageIndex: 1,
      PageSize: 16,
    });

  const { data: moduleSection, isLoading, isError } =
    useFetchModuleSection(moduleSectionFilter);

  const totalPage = Math.ceil(
    moduleSection?.count / (moduleSectionFilter?.PageSize || 1)
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setModuleSectionFilter((prev) => ({ ...prev, PageIndex: page }));
  };

  const { mutate } = useMutation({
    mutationFn: async (id?: number) => {
      if (confirm("you want to delete this Module, Are you sure?")) {
        await instance.delete(`ModuleSection/${id}`);
      }
    },
    onSuccess: () => {
      toast.success("Module deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["moduleSection"] });
    },
    onError: () => {
      toast.error("Failed to delete Module");
    },
  });

  const handelDeleteSection = (id: number | null) => {
    setSelectedSectionId(id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSectionId(null);
  };
  const handleConfirmDialog = async () => {
    if (selectedSectionId) {
      await mutate(selectedSectionId);
    }
    handleCloseDialog();
  };
  if (isLoading) {
    return <Loading />;
  }
  if(isError) return <p className="loading">Faild Please Try Again</p>
  return (
    <div className="w-full ">
      <div className="flex items-center justify-between text-white my-6">
        <h1 className="font-semibold text-2xl">Module Section</h1>
        <button
          className="!bg-[var(--accent)] py-2 px-4 rounded-xl flex items-center gap-1"
          onClick={() => router.push("/admin/moduleSection/addModuleSection")}
        >
          <FaPlus />
          Add New
        </button>
      </div>
      <TableContainer
        component={Paper}
        className="!bg-transparent !text-white !shadow-none "
      >
        <Table className="table table-striped table-hover">
          <TableHead className="!text-white">
            <TableRow>
              {["Id", "Title", "Description", "Action"].map((header) => (
                <TableCell key={header}>
                  <div className="text-white text-center font-light text-xl">
                    {header}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {moduleSection?.map(
              (module: ModuleSectionPageProps, index: number) => (
                <TableRow key={index} className="">
                  <TableCell className="!text-white !text-center break-words ">
                    {module.id}
                  </TableCell>
                  <TableCell className="!text-white !text-center break-words ">
                    {module.title}
                  </TableCell>
                  <TableCell className="!text-white !text-center break-words break-all ">
                    {module.body}
                  </TableCell>

                  <TableCell>
                    <div className="!flex items-center justify-center gap-4">
                      <button
                        className="--btn"
                        onClick={() =>
                          router.replace(
                            `/admin/moduleSection/editModuleSection/${module.id}`
                          )
                        }
                      >
                        <RiEdit2Fill size={18} color="var(--accent)" />
                      </button>
                      <button
                        className="--btn"
                        onClick={() =>
                          handelDeleteSection(module.id ? module.id : null)
                        }
                      >
                        <RiDeleteBin2Fill size={18} color="red" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className="!text-[var(--accent)] !font-bold  text-center">
          Delete Section
        </DialogTitle>
        <DialogContent>
          <p>Are You Sure To Delete This Section</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            className="!bg-red-800 !text-white  !font-bold "
          >
            Cancle
          </Button>
          <Button
            onClick={handleConfirmDialog}
            className="!bg-[var(--accent)] !text-white  !font-bold "
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {totalPage > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <Stack spacing={2}>
            <Pagination
              count={totalPage}
              page={moduleSectionFilter?.PageIndex || 1}
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

export default ModuleSectionPage;
