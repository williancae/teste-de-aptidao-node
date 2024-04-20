import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TypeProfessional } from '../../type-professional/entities/type-professional.entity';
import { EntityHelper } from './../../../database/entity-helper';
export enum StatusProfessionalEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}
@Entity({
    name: 'professionals',
    orderBy: {
        name: 'DESC',
    },
})
export class Professional extends EntityHelper {
    constructor(partial: Partial<Professional>) {
        super();
        Object.assign(this, partial);
    }

    @Column('varchar', { length: 100, name: 'name' })
    name: string;

    @Column('varchar', { length: 20, name: 'phone' })
    phone: string;

    @Column('varchar', { length: 100, name: 'email' })
    email: string;

    @Column({
        type: 'enum',
        enum: StatusProfessionalEnum,
        default: StatusProfessionalEnum.ACTIVE,
    })
    status: StatusProfessionalEnum = StatusProfessionalEnum.ACTIVE;

    @ManyToOne(
        () => TypeProfessional,
        (typeProfessional) => typeProfessional.professionals,
    )
    @JoinColumn({ name: 'type_professional_id' })
    typeProfessional: TypeProfessional;
}
