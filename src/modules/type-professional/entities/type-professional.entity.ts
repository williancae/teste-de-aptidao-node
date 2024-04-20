import { Column, Entity, OneToMany } from 'typeorm';
import { EntityHelper } from '../../../database/entity-helper';
import { Professional } from '../../professional/entities/professional.entity';

@Entity({
    name: 'type_professionals',
    orderBy: {
        createdAt: 'DESC',
    },
})
export class TypeProfessional extends EntityHelper {
    constructor(partial: Partial<TypeProfessional>) {
        super();
        Object.assign(this, partial);
    }

    @Column('varchar', { length: 100, name: 'description' })
    description: string;

    @Column(`boolean`, { name: 'status', default: true })
    status: boolean;

    @OneToMany(
        () => Professional,
        (professional) => professional.typeProfessional,
    )
    professionals: Professional[];
}
