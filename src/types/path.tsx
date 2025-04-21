export interface PathsPageProps {
    Title?: string;
    Description?:string,
    Difficulty?:string;
    NumOfModules?:number;
    Attachment?:string;
    CreatedAt?:string;
    file?: undefined;
}
export interface PathFilterProps {
    PageIndex?:number;
    PageSize?:number;
    InstructorId?:number | undefined;
    SearchName?: string | undefined;
    Difficulty:string | undefined;
}


export interface PathsProps {
    id?: number | undefined;
    title?: string;
    description?: string;
    numOfModules?: number;
    attachment?: string;
    createdAt?: string;
    difficulty?:string
  }

 