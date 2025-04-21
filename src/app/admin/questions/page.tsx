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
import { useFetchQuestions } from '@/api/qestionsApi'
import { QuestionsFiltersProps, QuestionsPageProps } from '@/types/questionsType'
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/axios";
import { toast } from "sonner";

const QuestionsPage = () => {
  const [questionsFilter, setQuestionsFilter] = useState<QuestionsFiltersProps> ({
    PageIndex:1,
    PageSize:10,
  })
  const router = useRouter();
  const queryClient = useQueryClient()
  const [selectedQuestionId , setSelectedQuestionId] = useState <number | null>(null)
  const [openDialog, setOpenDialog] =useState(false)

  const {data: questions , isError,isLoading} = useFetchQuestions(questionsFilter)

  // const totalPage = Math.ceil(questions.count || 0 / questions.pageSize || 1)
  const totalPage = 1


const {mutate} = useMutation({
  mutationFn : async (id:number)=>{
    await instance.delete(`Quiz/${id}`)
  },
  onSuccess:()=>{
    toast.success("Question Deleted Successful")
    queryClient.invalidateQueries({queryKey:["question"]})
  },onError : ()=>{
    toast.error ("Faild To Delete Question")
  }
})

  const handelDeleteQuestion = (id : number | null) =>{
    setSelectedQuestionId(id)
    setOpenDialog(true)
  }

  const handleCloseDialog = ()=>{
    setOpenDialog(false)
    setSelectedQuestionId(null)
  }

  const handleConfirmDialog = async()=>{
    if (selectedQuestionId) {
      await mutate(selectedQuestionId)
    }
    handleCloseDialog()
  }

  const handlePageChange = (_event : React.ChangeEvent<unknown>, page:number) =>{
    setQuestionsFilter((prev) => ({...prev , PageIndex:page}))
  }
  if(isLoading) return <Loading/>
  if(isError) return <p className="loading">Faild Please Try Again</p>
  return (
 <div className="w-full ">
      <div className="flex items-center justify-between text-white my-6">
        <h1 className="font-semibold text-2xl">Questions</h1>
        <button
          className="!bg-[var(--accent)] py-2 px-4 rounded-xl flex items-center gap-1"
          onClick={() => router.push("/admin/questions/addQuestion")}
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
              {["Id", "Title", "Answer", "Action"].map((header) => (
                <TableCell key={header}>
                  <div className="text-white text-center font-light text-xl">
                    {header}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions?.map(
              (question:QuestionsPageProps , index: number) => (
                <TableRow key={index} className="">
                  <TableCell className="!text-white !text-center break-words ">
                    {question.id}
                  </TableCell>
                  <TableCell className="!text-white !text-center break-words ">
                    {question.title}
                  </TableCell>
                  <TableCell className="!text-white !text-center break-words break-all ">
                    {question.answer}
                  </TableCell>

                  <TableCell>
                    <div className="!flex items-center justify-center gap-4">
                      <button
                        className="--btn"
                        onClick={() =>
                          router.replace(
                            `/admin/questions/editQuestion${question.id}`
                          )
                        }
                      >
                        <RiEdit2Fill size={18} color="var(--accent)" />
                      </button>
                      <button
                        className="--btn"
                        onClick={() =>
                          handelDeleteQuestion(question.id ? question.id : null)
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
          Delete Question
        </DialogTitle>
        <DialogContent>
          <p>Are You Sure To Delete This Question</p>
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
      {totalPage > 1 && (
        <div className="mt-6 flex items-center justify-center">
          <Stack spacing={2}>
            <Pagination
              count={totalPage}
              page={questionsFilter?.PageIndex || 1}
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
  )
}

export default QuestionsPage