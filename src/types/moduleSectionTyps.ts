
export interface ModuleSectionFilterProps {
    PageIndex?:number;
    PageSize?:number;
    ModuleId?:number;
    SearchName?: string;
}

export interface ModuleSectionPageProps {
    title?:string;
    body?:string;
    id?:number | undefined;
    attachment?:string | undefined;
    moduleId?: number | string;
    count?:number
}