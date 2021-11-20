import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import { createUSERdto } from './dtos/create_user.dto';

import { UserService } from './user.service';


import { Controller } from '@nestjs/common';
import { userDTO } from './dtos/update_user.dto';

@Controller('user')
export class UserController {

    constructor( private userService:UserService){}

    @Post('login')
    login(@Body() body :createUSERdto){
        console.log('email is-', body.email)
        return this.userService.LOGIN(body)
    }

    @Post('signin')
    signin(@Body() email:userDTO ){

          return  this.userService.signin(email)

    }
}
