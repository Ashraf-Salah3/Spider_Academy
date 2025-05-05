export interface RegisterProps{
    firstName:string,
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string;
    country:string;
    file:string

}
export interface LoginProps{
    email?:string;
    password?:string;
}
export interface ResetPasswordProps{
    email?:string;
    password?:string;
    confirmPassword:string;

}