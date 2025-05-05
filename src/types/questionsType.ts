export interface QuestionsPageProps {
    title?: string;
    answer?:string;
    id?:number ;
    sectionId?:string 

}
export interface QuestionsFiltersProps {
    PageIndex?:number,
    PageSize?:number,
    SectionId?:number | string,
    SearchName?:string
}