import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTypeProfessionalDto } from './dto/create-type-professional.dto';
import { UpdateTypeProfessionalDto } from './dto/update-type-professional.dto';
import { TypeProfessionalService } from './type-professional.service';

@ApiTags('Type Professional')
@Controller('type-professional')
export class TypeProfessionalController {
    constructor(
        private readonly typeProfessionalService: TypeProfessionalService,
    ) {}

    @Post()
    create(@Body() createTypeProfessionalDto: CreateTypeProfessionalDto) {
        return this.typeProfessionalService.create(createTypeProfessionalDto);
    }

    @Get()
    findAll() {
        return this.typeProfessionalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.typeProfessionalService.findById(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTypeProfessionalDto: UpdateTypeProfessionalDto,
    ) {
        return this.typeProfessionalService.update(
            id,
            updateTypeProfessionalDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.typeProfessionalService.softDelete(id);
    }
}
