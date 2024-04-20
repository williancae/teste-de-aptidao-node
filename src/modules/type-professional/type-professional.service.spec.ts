import { CreateTypeProfessionalDto } from './dto/create-type-professional.dto';
import { UpdateTypeProfessionalDto } from './dto/update-type-professional.dto';

describe('CreateTypeProfessionalDto', () => {
    it('should create a valid instance', () => {
        const dto = new CreateTypeProfessionalDto();
        dto.description = 'Desenvolvedor Backend';

        expect(dto).toBeDefined();
        expect(dto.description).toBe('Desenvolvedor Backend');
    });

    it('should initialize with default values', () => {
        const dto = new CreateTypeProfessionalDto();

        expect(dto).toBeDefined();
        expect(dto.description).toBeUndefined();
    });
});

describe('UpdateTypeProfessionalDto', () => {
    it('should create a valid instance', () => {
        const dto = new UpdateTypeProfessionalDto();
        dto.status = true;

        expect(dto).toBeDefined();
        expect(dto.status).toBe(true);
    });

    it('should initialize with default values', () => {
        const dto = new UpdateTypeProfessionalDto();

        expect(dto).toBeDefined();
        expect(dto.status).toBeUndefined();
    });
});
