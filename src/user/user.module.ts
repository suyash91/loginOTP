import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createUser } from './user.entity';
import { generateOTP } from 'src/Generate_OTP';
import { UserController } from './user.controller';
@Module({
  imports:[TypeOrmModule.forFeature([ createUser]),generateOTP],
  providers: [UserService],
  controllers:[UserController]
})
export class UserModule {}
