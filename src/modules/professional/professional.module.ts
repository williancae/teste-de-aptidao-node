import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

@Module({
    imports: [TypeOrmModule.forFeature([Professional])],
    controllers: [ProfessionalController],
    providers: [ProfessionalService],
})
export class ProfessionalModule {}
