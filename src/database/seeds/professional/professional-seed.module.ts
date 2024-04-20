import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfessionalSeedService } from './professional-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    providers: [ProfessionalSeedService],
    exports: [ProfessionalSeedService],
})
export class ProfessionalSeedModule {}
