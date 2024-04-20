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
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalService } from './professional.service';

@ApiTags('Professional')
@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    @Post()
    create(@Body() createProfessionalDto: CreateProfessionalDto) {
        return this.professionalService.create(createProfessionalDto);
    }

    @Get()
    findAll() {
        return this.professionalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.professionalService.findById(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProfessionalDto: UpdateProfessionalDto,
    ) {
        return this.professionalService.update(id, updateProfessionalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.professionalService.softDelete(id);
    }
}
