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
    path?:string;
    PageIndex?:number;
    PageSize?:number;
    SearchName?:string;
}

export interface ModuleFilterProps {
    PageIndex?:number;
    PageSize?:number;
    PathId?:string | undefined;
    SearchName?: string;
}
