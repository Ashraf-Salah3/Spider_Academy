import React from "react";
import QuestionFrom from "../QuestionFrom";
import { getModulesSection } from "@/api/modeuleSectionApi";

const AddQuestionPage = async () => {
  const sections = await getModulesSection({ PageIndex: 1, PageSize: 30 });

  return (
    <div>
      <QuestionFrom sections={sections} />
    </div>
  );
};

export default AddQuestionPage;
