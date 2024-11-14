import { IsString, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';
import { ValidationMessages } from '../validation-messages';

export class UpdateTodoDto {
    @IsString()
    @IsOptional()
    @MinLength(3, { message: ValidationMessages.nameMinLength })
    @MaxLength(10, { message: ValidationMessages.nameMaxLength })
    name?: string;

    @IsString()
    @IsOptional()
    @MinLength(10, { message: ValidationMessages.descriptionMinLength })
    description?: string;

    @IsEnum(StatusEnum, { message: ValidationMessages.statusInvalid })
    @IsOptional()
    status?: StatusEnum;
}
