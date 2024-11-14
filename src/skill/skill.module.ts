import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import {Cv} from "../cv/entities/cv.entity";
import {User} from "../user/entities/user.entity";
import {Skill} from "./entities/skill.entity"
import {TypeOrmModule} from "@nestjs/typeorm";
@Module({
  imports: [TypeOrmModule.forFeature([Cv, User, Skill])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
