import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn,JoinColumn ,OneToOne, BeforeUpdate} from "typeorm";
import { IsEmail } from "class-validator";
import { generateOTP } from "src/Generate_OTP";
import { time } from "console";

@Entity('user')
export class createUser{
@PrimaryGeneratedColumn()
 id:number

 @IsEmail()
 @Column({unique:true})
 email:string

 @Column({default:false})
 verified:boolean


@Column()
Otp:number ;

@Column({default:0})
wrongOTP:number


@Column()
wait_until:Date



@Column()
expiry:Date


@BeforeInsert()
updateDates() {
    const temp = new Date();

    this.wait_until = new Date(temp.getTime() + 1*60000);
    this.expiry= new Date(temp.getTime() + 10*60000)
}
    

@BeforeInsert()
updateOTP(){
    this.Otp=new generateOTP().getRandomInt(100000,999999)
}

}
