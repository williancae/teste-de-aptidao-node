import { instanceToPlain } from 'class-transformer';
import {
    AfterLoad,
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class EntityHelper extends BaseEntity {
    @PrimaryColumn('varchar', { length: 36, name: 'id' })
    readonly id: string = uuidv4();

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp',
    })
    deletedAt: Date;

    __entity?: string;

    @AfterLoad()
    setEntityName() {
        this.__entity = this.constructor.name;
    }

    toJSON() {
        return instanceToPlain(this);
    }
}
