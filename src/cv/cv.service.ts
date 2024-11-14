import { Injectable } from '@nestjs/common';
import {Cv} from "./entities/cv.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CvService {
  constructor(
      @InjectRepository(Cv)
      private cvRepository: Repository<Cv>,
  ) {}

  async findAll(): Promise<Cv[]> {
    return await this.cvRepository.find({ relations: ['user', 'skills'] });
  }

  async create(cv: Cv): Promise<Cv> {
    return await this.cvRepository.save(cv);
  }

  async findOne(id: number): Promise<Cv> {
    return await this.cvRepository.findOne({
      where: { id },
      relations: ['user', 'skills'],
    });
  }

  async update(id: number, cv: Cv): Promise<void> {
    await this.cvRepository.update(id, cv);
  }

  async delete(id: number): Promise<void> {
    await this.cvRepository.delete(id);
  }
}