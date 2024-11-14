import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {Cv} from "../cv/entities/cv.entity";
import {User} from "./entities/user.entity";
import {Skill} from "../skill/entities/skill.entity"
import {TypeOrmModule} from "@nestjs/typeorm";
@Module({
  imports: [TypeOrmModule.forFeature([Cv, User, Skill])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
