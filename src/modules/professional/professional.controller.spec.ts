import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import {
    Professional,
    StatusProfessionalEnum,
} from './entities/professional.entity';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

describe('ProfessionalController', () => {
    let controller: ProfessionalController;
    let service: ProfessionalService;
    let repository: Repository<Professional>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfessionalController],
            providers: [
                ProfessionalService,
                {
                    provide: getRepositoryToken(Professional),
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<ProfessionalController>(ProfessionalController);
        service = module.get<ProfessionalService>(ProfessionalService);
        repository = module.get<Repository<Professional>>(
            getRepositoryToken(Professional),
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a professional', async () => {
            const createProfessionalDto: CreateProfessionalDto = {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                status: StatusProfessionalEnum.ACTIVE,
                typeProfessionalId: uuidv4(),
            };

            const createdProfessional = new Professional(createProfessionalDto);

            jest.spyOn(service, 'create').mockResolvedValueOnce(
                createdProfessional,
            );

            expect(await controller.create(createProfessionalDto)).toBe(
                createdProfessional,
            );
            expect(service.create).toHaveBeenCalledWith(createProfessionalDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of professionals', async () => {
            const professionals = [new Professional({}), new Professional({})];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(professionals);

            expect(await controller.findAll()).toBe(professionals);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    it('should return the found professional', async () => {
        const professionalId = 'e059dfdf-55e4-45fc-8d71-a667d59110ef';
        const foundProfessional = new Professional({});

        jest.spyOn(service, 'findById').mockResolvedValueOnce(
            foundProfessional,
        );

        const result = await controller.findOne(professionalId);

        expect(result).toBe(foundProfessional);
        expect(service.findById).toHaveBeenCalledWith(professionalId);
    });

    it('should throw NotFoundException if professional is not found', async () => {
        const professionalId = 'e059dfdf-55e4-45fc-8d71-a667d59110ef';
        jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

        await expect(controller.findOne(professionalId)).resolves.toBeNull();
        expect(service.findById).toHaveBeenCalledWith(professionalId);
    });

    describe('update', () => {
        it('should update a professional', async () => {
            const professionalId = uuidv4();
            const updateProfessionalDto: UpdateProfessionalDto = {
                name: 'Updated Name',
            };

            const updatedProfessional = new Professional(updateProfessionalDto);

            jest.spyOn(service, 'update').mockResolvedValueOnce(
                updatedProfessional,
            );

            expect(
                await controller.update(professionalId, updateProfessionalDto),
            ).toBe(updatedProfessional);
            expect(service.update).toHaveBeenCalledWith(
                professionalId,
                updateProfessionalDto,
            );
        });
    });

    describe('remove', () => {
        it('should soft delete a professional', async () => {
            const professionalId = uuidv4();

            jest.spyOn(service, 'softDelete').mockResolvedValueOnce();

            expect(await controller.remove(professionalId)).toBeUndefined();
            expect(service.softDelete).toHaveBeenCalledWith(professionalId);
        });
    });
});
