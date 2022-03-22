import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Adress extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.adresses)
    user: User;

    @Column()
    description: string;

    @Column()
    zip: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    neighborhood: string;

    @Column()
    patio: string;

    @Column()
    number: string;

    @Column()
    complement?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
