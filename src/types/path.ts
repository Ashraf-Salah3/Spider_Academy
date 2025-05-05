import { ModulesPageProps } from "./moduleType";


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
    difficulty?:string;
    modules?:ModulesPageProps[]
    pageSize?:number,
    pageIndex?:number;
    count?:number
   items?:PathsProps[]
  }
