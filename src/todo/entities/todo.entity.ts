import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { StatusEnum } from '../enums/status.enum';
import { BaseEntity } from '../../common-module/entities/base.entity';

@Entity('todos')
export class TodoEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 10 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.PENDING,
    })

    @Column()
    userId: number;

    status: StatusEnum;
}
