import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeProfessional } from './entities/type-professional.entity';
import { TypeProfessionalController } from './type-professional.controller';
import { TypeProfessionalService } from './type-professional.service';

@Module({
    imports: [TypeOrmModule.forFeature([TypeProfessional])],
    controllers: [TypeProfessionalController],
    providers: [TypeProfessionalService],
})
export class TypeProfessionalModule {}
