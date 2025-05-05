"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { PathsProps } from "@/types/path";
import { useMutation } from "@tanstack/react-query";
import instance from "@/axios";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";
import { useState } from "react";

const PathsTable = ({ paths }: { paths: PathsProps }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState<number | null>(null);

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

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`EducationalPath/${id}`);
    },
    onSuccess: () => {
      toast.success("path deleted successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete path");
    },
  });

  const handelDeletPath = (id: number | null) => {
    setSelectedPathId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPathId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedPathId) {
      await mutate(selectedPathId);
    }

    handleCloseDialog();
  };

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between text-white my-6">
        <h1 className="font-semibold text-2xl">Paths</h1>
        <button
          className="!bg-[var(--accent)] py-2 px-4 rounded-xl flex items-center gap-1"
          onClick={() => router.push("/admin/paths/addpath")}
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
                "Num Of Modules",
                "CreatedAt",
                "Action",
              ].map((header) => (
                <TableCell key={header}>
                  <div className="text-white text-center font-light text-xl">
                    {header}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paths?.items?.map((path: PathsProps, index: number) => (
              <TableRow key={index} className="">
                <TableCell className="!text-white !text-center break-words ">
                  {path.id}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
                  {path.title}
                </TableCell>
                <TableCell className="!text-white !text-center break-all break-words ">
                  {path.description}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
                  {path.difficulty}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
                  {path.numOfModules}
                </TableCell>
                <TableCell className="!text-white !text-center break-words ">
                  {formData(path.createdAt!).formattedDate}
                </TableCell>
                <TableCell>
                  <div className="!flex items-center justify-center gap-4">
                    <button
                      className="--btn"
                      onClick={() =>
                        router.push(`/admin/paths/editPath/${path.id}`)
                      }
                    >
                      <RiEdit2Fill size={18} color="var(--accent)" />
                    </button>
                    <button
                      className="--btn"
                      onClick={() => handelDeletPath(path.id ? path.id : null)}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className="!text-[var(--accent)] !font-bold  text-center">
          Delete Path
        </DialogTitle>
        <DialogContent>
          <p>Are You Sure To Delete This Path</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            className="!bg-red-800 !text-white  !font-bold "
          >
            Cancle
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="!bg-[var(--accent)] !text-white  !font-bold "
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PathsTable;
