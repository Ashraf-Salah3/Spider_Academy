// app/admin/questions/page.tsx (Server Component)
import { fetchQuestions } from "@/api/qestionsApi";
import QuestionsTable from "@/components/QuestionsTable";


const QuestionsPage = async () => {
  const questions = await fetchQuestions({
    PageIndex:1,
    PageSize:20
  })

  return (
    <div className="w-full">
      <QuestionsTable questions={questions} />
    </div>
  );
};

export default QuestionsPage;
