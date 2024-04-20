import { NestFactory } from '@nestjs/core';
import { ProfessionalSeedService } from './professional/professional-seed.service';
import { SeedModule } from './seed.module';

const runSeed = async () => {
    const app = await NestFactory.create(SeedModule);

    await app.get(ProfessionalSeedService).run();

    await app.close();
};

void runSeed();
