import {Injectable, NotFoundException} from '@nestjs/common';
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
    const AllCvs = await this.cvRepository.find({ relations: ['user', 'skills'] });
    if (!AllCvs){
      throw new NotFoundException('No Cvs found');
    }
    return AllCvs;
  }

  async create(cv: Cv): Promise<Cv> {
    return await this.cvRepository.save(cv);
  }

  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({
      where: { id },
    });
    if (!cv ){
      throw new NotFoundException('This Cv is not found');
    }
    return cv;
  }

  async update(id: number, cv: Cv): Promise<void> {
    const cv1 = await this.cvRepository.findOne({
      where: { id }, });
    if (!cv1 ){
      throw new NotFoundException('This Cv is not found');
    }
    await this.cvRepository.update(id, cv);
  }

  async delete(id: number): Promise<void> {
    const cv = await this.cvRepository.findOne({
      where: { id }, });
    if (!cv ){
      throw new NotFoundException('This Cv is not found');
    }
    await this.cvRepository.delete(id);
  }
}