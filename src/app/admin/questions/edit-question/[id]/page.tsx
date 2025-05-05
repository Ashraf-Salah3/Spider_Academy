import { getModulesSection } from "@/api/modeuleSectionApi";
import QuestionForm from "../../QuestionFrom";
import { fetchQuestionsById } from "@/api/qestionsApi";

const EditQuestion = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {

  const { id } = await params;
  const question = await fetchQuestionsById(id);
 
  const sections = await getModulesSection({ PageIndex: 1, PageSize: 30 });

  return (
    <QuestionForm
      initialData={question}
      isEdit={true}
      questionId={id}
      sections={sections}
    />
  );
};

export default EditQuestion;
