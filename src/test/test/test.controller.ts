import { Controller, Get } from '@nestjs/common';
import {UuidService} from "../../common-module/uuid/uuid.service";

@Controller('test')
export class TestController {
    // constructor(private readonly uuidService: UuidService) {}
    uuidService = new UuidService();
    constructor() {}

    @Get('uuid')
    getUuid(): string {
        return this.uuidService.generateUuid();
    }
}
