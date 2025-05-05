import PathsTable from "@/components/PathsTable";
import { getPaths } from "@/api/pathsApi";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

const PathsPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const params = await searchParams;

  let curruntPage;
  if (params?.page) {
    curruntPage = parseInt((params.page as string) || "1");
  }


  const pageSize = 10;

  const paths = await getPaths({
    PageIndex: curruntPage || 1,
    PageSize: pageSize,
    InstructorId: undefined,
    SearchName: "",
    Difficulty: "",
  });

  const count = paths?.count || 0;

  return (
    <>
      <PathsTable paths={paths} />

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

export default PathsPage;
