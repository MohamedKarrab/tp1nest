import { IsString, MinLength, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';
import { ValidationMessages } from '../validation-messages';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty({ message: ValidationMessages.nameRequired })
    @MinLength(3, { message: ValidationMessages.nameMinLength })
    @MaxLength(10, { message: ValidationMessages.nameMaxLength })
    name: string;

    @IsString()
    @IsNotEmpty({ message: ValidationMessages.descriptionRequired })
    @MinLength(10, { message: ValidationMessages.descriptionMinLength })
    description: string;

    @IsEnum(StatusEnum, { message: ValidationMessages.statusInvalid })
    status: StatusEnum;
}
