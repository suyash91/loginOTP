import { Injectable } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {createUser} from './user.entity'
import { createUSERdto } from './dtos/create_user.dto';
import { generateOTP } from  '../Generate_OTP'
import { userDTO } from './dtos/update_user.dto';
import { networkInterfaces } from 'os';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(createUser) private readonly userRepoistory : Repository<createUser> ){}

       
        createuser(userEmail:createUSERdto){
            const user = this.userRepoistory.create(userEmail)
            //return this.userRepoistory.insert(userDETAILS)
//console.log(user)

            return   this.userRepoistory.save(user)
            
        }
     async   findUser(userEmail:createUSERdto){

            const user= await this.userRepoistory.findOne(userEmail)
            if(user==undefined){
                console.log('user not found')
                return 

            }else{
                console.log('user found')
                return user
            }
        }

        async LOGIN(userEmail:createUSERdto){
            const user=await this.userRepoistory.findOne({email:userEmail.email})
          let  temp1=new Date()
         let   currentTime= new Date(temp1.getTime()).toLocaleTimeString()

            if (user!=undefined){
                console.log('user found')
               console.log(user.wait_until.toLocaleTimeString(), '  ' , (currentTime) , '    ', (user.wait_until.toLocaleTimeString()<currentTime))
                if(user.wait_until.toLocaleTimeString()<currentTime){
                    console.log(user.wait_until.toLocaleTimeString()<currentTime,'user can re requestotp')
                    const time=new Date()
                    user.wait_until=new Date(time.getTime() +  1*60000)
                    user.Otp=new generateOTP().getRandomInt(100000,999999)
                    user.expiry=new Date(time.getTime() + 10*60000)

                   return this.userRepoistory.save(user)
                }
                else
                {   console.log(new Date(user.wait_until))
                    return 'user can not request otp'
                }

            }
            else if(user== undefined)
              return  this.createuser(userEmail)

            }
        
            
            
        async signin(email:userDTO){
             console.log('signin attemmpted with email and otp',email.email,email.Otp)
             let  temp1=new Date()
         let   currentTime= new Date(temp1.getTime())
            const user= await this.userRepoistory.findOne({email:email.email});
           // console.log(user)
           if(user.wait_until>currentTime){
               return ('user can not  request otp because 5 times attempted wrong')
           }else{
            if(user!=undefined){
                if(user.Otp ==email.Otp){
                    user.verified=true
                    user.Otp=0
                    user.expiry=currentTime
                    return this.userRepoistory.save(user)
                }   
                else{   
                    console.log(user.wrongOTP)

                    user.wrongOTP+=1
                    if(user.wrongOTP==5){
                        user.wait_until=new Date(temp1.getTime() + 60*60000)
                        user.wrongOTP=0
                        console.log('wrong otp')
                        user.Otp=0
                        this.userRepoistory.save(user) 
                    }
                    this.userRepoistory.save(user) 
                    return 'wrong otp'
                }
            }
            else{
                return 'user not found '
            }
           }
                    }
        }