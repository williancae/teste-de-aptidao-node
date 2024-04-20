import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import {
    Professional,
    StatusProfessionalEnum,
} from './entities/professional.entity';
import { ProfessionalService } from './professional.service';

describe('ProfessionalService', () => {
    let service: ProfessionalService;
    let repository: Repository<Professional>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProfessionalService,
                {
                    provide: 'ProfessionalRepository',
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<ProfessionalService>(ProfessionalService);
        repository = module.get<Repository<Professional>>(
            'ProfessionalRepository',
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a professional', async () => {
        const payload: CreateProfessionalDto = {
            name: 'Murilo Caetano',
            email: 'murilo.caetano@gmail.com',
            phone: '21999999999',
            status: StatusProfessionalEnum.ACTIVE,
            typeProfessionalId: uuidv4(),
        };

        const createdProfessional = new Professional(payload);

        jest.spyOn(repository, 'create').mockReturnValueOnce(
            createdProfessional,
        );
        jest.spyOn(repository, 'save').mockResolvedValueOnce(
            createdProfessional,
        );

        const result = await service.create(payload);

        expect(result).toEqual(createdProfessional);
        expect(repository.create).toHaveBeenCalledWith(
            expect.objectContaining(payload),
        );

        expect(repository.save).toHaveBeenCalledWith(createdProfessional);
    });

    it('should find a professional by ID', async () => {
        const professionalId = uuidv4();
        const professional = new Professional({
            id: professionalId,
            name: 'Test Professional',
            email: 'test@example.com',
            phone: '1234567890',
            status: StatusProfessionalEnum.ACTIVE,
            typeProfessional: uuidv4(),
        });

        jest.spyOn(repository, 'findOne').mockResolvedValueOnce(professional);

        const result = await service.findById(professionalId);

        expect(result).toEqual(professional);
        expect(repository.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: professionalId },
            }),
        );
    });

    it('should update a professional', async () => {
        const professionalId = uuidv4();
        const updatePayload: Partial<CreateProfessionalDto> = {
            name: 'Updated Name',
        };
        const updatedProfessional = new Professional({
            id: professionalId,
            name: 'Updated Name',
            email: 'test@example.com',
            phone: '1234567890',
            status: StatusProfessionalEnum.ACTIVE,
            typeProfessional: uuidv4(),
        });

        jest.spyOn(repository, 'findOne').mockResolvedValueOnce(
            updatedProfessional,
        );
        jest.spyOn(repository, 'save').mockResolvedValueOnce(
            updatedProfessional,
        );

        const result = await service.update(professionalId, updatePayload);

        expect(result).toEqual(updatedProfessional);
        expect(repository.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: professionalId },
            }),
        );

        expect(repository.save).toHaveBeenCalledWith(updatedProfessional);
    });
    it('should delete a professional', async () => {
        const professionalId = uuidv4();

        jest.spyOn(repository, 'softDelete').mockResolvedValueOnce(undefined);

        await expect(
            service.softDelete(professionalId),
        ).resolves.toBeUndefined();
        expect(repository.softDelete).toHaveBeenCalledWith(professionalId);
    });
});
