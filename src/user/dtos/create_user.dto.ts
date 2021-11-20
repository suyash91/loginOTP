import { IsEmail,IsString } from "class-validator"
export class createUSERdto{


    
@IsEmail()
@IsString()
email:string
}