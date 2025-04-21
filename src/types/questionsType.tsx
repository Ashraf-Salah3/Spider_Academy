export interface QuestionsPageProps {
    title?: string;
    answer?:string;
    id?:number ;
    sectionId?:number 

}
export interface QuestionsFiltersProps {
    PageIndex?:number,
    PageSize?:number,
    SectionId?:number | string,
    SearchName?:string
}