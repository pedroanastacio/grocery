import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Adress } from './Adress';
import { Role } from './Role';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ select: false })
    password: string;

    @Column()
    iv: string;

    @Column({ unique: true })
    email: string;

    @ManyToMany(() => Role, { cascade: true })
    @JoinTable()
    roles: Role[];

    @OneToMany(() => Adress, adress => adress.user)
    adresses: Adress[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
