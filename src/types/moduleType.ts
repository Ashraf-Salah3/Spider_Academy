import { ModuleSectionPageProps } from "./moduleSectionTyps";

export interface ModulesPageProps{
    id?: number;
    title?:string;
    difficulty?:string;
    description?:string;
    numOfSections?:number;
    attachment?: string | "";
    expectedTimeToComplete?:string;
    isAccepted?:boolean;
    acceptedAt?:string;
    pathId?:string;
    PageIndex?:number;
    PageSize?:number;
    sections?:ModuleSectionPageProps[]
    items?:[],
    pathName?:string
    count?:number
}

export interface ModuleFilterProps {
    PageIndex?:number;
    PageSize?:number;
    PathId?:string | undefined;
    SearchName?: string;
}
