import { IsEmail,IsNumber } from "class-validator"
export class userDTO{


    @IsEmail()
    email:string

    @IsNumber( )
    Otp:number

}