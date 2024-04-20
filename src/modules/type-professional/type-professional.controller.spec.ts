import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTypeProfessionalDto } from './dto/create-type-professional.dto';
import { UpdateTypeProfessionalDto } from './dto/update-type-professional.dto';
import { TypeProfessional } from './entities/type-professional.entity';
import { TypeProfessionalController } from './type-professional.controller';
import { TypeProfessionalService } from './type-professional.service';

describe('TypeProfessionalController', () => {
    let controller: TypeProfessionalController;
    let service: TypeProfessionalService;
    let repository: Repository<TypeProfessional>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TypeProfessionalController],
            providers: [
                TypeProfessionalService,
                {
                    provide: getRepositoryToken(TypeProfessional),
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<TypeProfessionalController>(
            TypeProfessionalController,
        );
        service = module.get<TypeProfessionalService>(TypeProfessionalService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a type professional', async () => {
            const createTypeProfessionalDto: CreateTypeProfessionalDto = {
                description: 'Desenvolvedor Backend',
            };

            jest.spyOn(service, 'create').mockResolvedValueOnce(
                new TypeProfessional({}),
            );

            expect(
                await controller.create(createTypeProfessionalDto),
            ).toBeDefined();
            expect(service.create).toHaveBeenCalledWith(
                createTypeProfessionalDto,
            );
        });
    });

    describe('findAll', () => {
        it('should return an array of type professionals', async () => {
            const typeProfessionals = [
                new TypeProfessional({}),
                new TypeProfessional({}),
            ];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(
                typeProfessionals,
            );

            expect(await controller.findAll()).toEqual(typeProfessionals);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a type professional by ID', async () => {
            const typeId = uuidv4();

            const foundTypeProfessional = new TypeProfessional({});
            jest.spyOn(service, 'findById').mockResolvedValueOnce(
                foundTypeProfessional,
            );

            expect(await controller.findOne(typeId)).toBe(
                foundTypeProfessional,
            );
            expect(service.findById).toHaveBeenCalledWith(typeId);
        });

        it('should throw NotFoundException if type professional is not found', async () => {
            const typeId = 'e059dfdf-55e4-45fc-8d71-a667d59110ef';
            jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

            await expect(controller.findOne(typeId)).resolves.toBeNull();
            expect(service.findById).toHaveBeenCalledWith(typeId);
        });
    });

    describe('update', () => {
        it('should update a type professional', async () => {
            const typeId = '1';
            const updateTypeProfessionalDto: UpdateTypeProfessionalDto = {
                status: true,
            };

            const updatedTypeProfessional = new TypeProfessional({});
            jest.spyOn(service, 'update').mockResolvedValueOnce(
                updatedTypeProfessional,
            );

            expect(
                await controller.update(typeId, updateTypeProfessionalDto),
            ).toBe(updatedTypeProfessional);
            expect(service.update).toHaveBeenCalledWith(
                typeId,
                updateTypeProfessionalDto,
            );
        });
    });

    describe('remove', () => {
        it('should remove a type professional', async () => {
            const typeId = '1';

            jest.spyOn(service, 'softDelete').mockResolvedValueOnce();

            expect(await controller.remove(typeId)).toBeUndefined();
            expect(service.softDelete).toHaveBeenCalledWith(typeId);
        });
    });
});
