import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {Cv} from "./entities/cv.entity";
import {CvService} from "./cv.service";

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  findAll(): Promise<Cv[]> {
    return this.cvService.findAll();
  }

  @Post()
  create(@Body() cv: Cv): Promise<Cv> {
    return this.cvService.create(cv);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cv> {
    return this.cvService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() cv: Cv): Promise<void> {
    return this.cvService.update(+id, cv);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.cvService.delete(+id);
  }
}