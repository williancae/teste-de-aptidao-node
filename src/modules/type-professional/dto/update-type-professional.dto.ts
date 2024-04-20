import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTypeProfessionalDto } from './create-type-professional.dto';

export class UpdateTypeProfessionalDto extends PartialType(
    CreateTypeProfessionalDto,
) {
    @ApiPropertyOptional({
        description: 'Status. True para ativo e False para inativo',
        type: Boolean,
        example: true,
    })
    status?: boolean;
}
