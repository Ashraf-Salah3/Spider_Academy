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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import instance from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { QuestionsPageProps } from "@/types/questionsType";

interface Props {
  questions: QuestionsPageProps[];
}

const QuestionsTable = ({ questions }: Props) => {
  const router = useRouter();


  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`Quiz/${id}`);
    },
    onSuccess: () => {
      toast.success("Question deleted successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete question");
    },
  });

  const handleDeleteQuestion = (id: number | null) => {
    setSelectedQuestionId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedQuestionId(null);
  };

  const handleConfirmDialog = async () => {
    if (selectedQuestionId) {
      await mutate(selectedQuestionId);
    }
    handleCloseDialog();
  };

  return (
    <>
      <div className="flex items-center justify-between text-white my-6">
        <h1 className="font-semibold text-2xl">Questions</h1>
        <button
          className="!bg-[var(--accent)] py-2 px-4 rounded-xl flex items-center gap-1"
          onClick={() => router.push("/admin/questions/add-question")}
        >
          <FaPlus />
          Add New
        </button>
      </div>

      <TableContainer
        component={Paper}
        className="!bg-transparent !text-white !shadow-none"
      >
        <Table>
          <TableHead className="!text-white">
            <TableRow>
              {["Id", "Title", "Answer", "Action"].map((header) => (
                <TableCell key={header}>
                  <div className="text-white text-center font-light break-words text-xl">
                    {header}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions?.map((question) => (
              <TableRow key={question.id} className="break-words max-w-full">
                <TableCell className="!text-white !text-center break-words">
                  {question.id}
                </TableCell>
                <TableCell className="!text-white !text-center break-words">
                  {question.title}
                </TableCell>
                <TableCell className="!text-white !text-center break-words">
                  {question.answer}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-4">
                    <button
                      className="--btn"
                      onClick={() =>
                        router.replace(
                          `/admin/questions/edit-question/${question.id}`
                        )
                      }
                    >
                      <RiEdit2Fill size={18} color="var(--accent)" />
                    </button>
                    <button
                      className="--btn"
                      onClick={() =>
                        handleDeleteQuestion(question.id ?? null)
                      }
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
        <DialogTitle className="!text-[var(--accent)] text-center font-bold">
          Delete Question
        </DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this question?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            className="!bg-red-800 !text-white font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDialog}
            className="!bg-[var(--accent)] !text-white font-bold"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionsTable;
