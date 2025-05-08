import { getModulesSection } from "@/api/modeuleSectionApi";
import SectionsTable from "@/components/SectionsTable";

const ModuleSectionPage = async () => {
  const moduleSection = await getModulesSection({ PageIndex: 1, PageSize: 10 });
  console.log(moduleSection)
  return (<SectionsTable moduleSection={moduleSection} />);
};

export default ModuleSectionPage;
