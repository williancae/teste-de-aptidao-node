import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeProfessionalDto {
    @ApiProperty({
        description: 'Cargo do profissional',
        type: String,
        example: 'Desenvolvedor Backend',
    })
    description: string;
}
