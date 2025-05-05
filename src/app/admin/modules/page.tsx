import { getModules } from "@/api/modulesApi";

import ModuleTable from "@/components/ModuleTable";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}
const ModulesPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  let curruntPage;
  if (params?.page) {
    curruntPage = parseInt((params.page as string) || "1");
  }

  const pageSize = 10;

  const modules = await getModules({
    PageIndex: curruntPage,
    PageSize: pageSize,
  });

  const count = modules?.count || 0;
  return (
    <>
      <ModuleTable modules={modules} />

        <div className="!text-white mt-8">
          <PaginationWithLinks
            page={curruntPage || 1}
            pageSize={pageSize}
            totalCount={count}
          />
        </div>

    </>
  );
};

export default ModulesPage;
