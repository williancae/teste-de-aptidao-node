import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './entities/professional.entity';

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectRepository(Professional)
        private repository: Repository<Professional>,
    ) {}

    async create(payload: CreateProfessionalDto): Promise<Professional> {
        // ? as validações de payload, sao realizadas no DTO

        const professional = await this.repository.create({
            ...payload,
            typeProfessional: { id: payload.typeProfessionalId },
        });
        return this.repository.save(professional);
    }

    async findAll(): Promise<Professional[]> {
        return this.repository.find({ relations: ['typeProfessional'] });
    }

    async findById(id: string): Promise<Professional> {
        const response = await this.repository.findOne({
            where: { id },
            relations: ['typeProfessional'],
        });
        if (!response) {
            throw new NotFoundException('Profissional não encontrado');
        }
        return response;
    }

    async update(
        id: string,
        updateProfessionalDto: UpdateProfessionalDto,
    ): Promise<Professional> {
        const professional = await this.findById(id);

        if (!professional) {
            throw new NotFoundException('Profissional não encontrado');
        }

        return this.repository.save({
            ...professional,
            ...updateProfessionalDto,
        });
    }

    async softDelete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }
}
