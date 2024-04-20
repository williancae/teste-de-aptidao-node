import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { StatusProfessionalEnum } from '../entities/professional.entity';

export class CreateProfessionalDto {
    @ApiProperty({
        description: 'Nome do profissional',
        type: String,
        example: 'Willian Caetano',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Telefone do profissional',
        type: String,
        example: '5561983244927',
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'Email do profissional',
        type: String,
        example: 'williancaecam@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Status do profissional',
        type: `enum`,
        enum: StatusProfessionalEnum,
        example: StatusProfessionalEnum.ACTIVE,
    })
    @IsNotEmpty()
    status: StatusProfessionalEnum;

    @ApiProperty({
        description: 'Id do tipo de profissional',
        type: String,
        example: uuidv4(),
    })
    @IsNotEmpty()
    @IsUUID()
    typeProfessionalId: string;
}
