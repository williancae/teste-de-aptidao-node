import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeProfessionalDto } from './dto/create-type-professional.dto';
import { UpdateTypeProfessionalDto } from './dto/update-type-professional.dto';
import { TypeProfessional } from './entities/type-professional.entity';

@Injectable()
export class TypeProfessionalService {
    constructor(
        @InjectRepository(TypeProfessional)
        private repository: Repository<TypeProfessional>,
    ) {}

    async create(
        createTypeProfessionalDto: CreateTypeProfessionalDto,
    ): Promise<TypeProfessional> {
        const typeProfessional = await this.repository.create(
            createTypeProfessionalDto,
        );
        return this.repository.save(typeProfessional);
    }

    async findAll(): Promise<TypeProfessional[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<TypeProfessional> {
        return this.repository.findOneBy({ id });
    }

    async update(
        id: string,
        updateTypeProfessionalDto: UpdateTypeProfessionalDto,
    ): Promise<TypeProfessional> {
        const typeProfessional = await this.findById(id);

        if (!typeProfessional) {
            throw new NotFoundException('Tipo de profissional não encontrado');
        }

        return this.repository.save({
            ...typeProfessional,
            ...updateTypeProfessionalDto,
        });
    }

    async softDelete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }
}
