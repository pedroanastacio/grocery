import { Entity, BaseEntity, PrimaryGeneratedColumn, Column,OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class RefreshToken extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    expires_in: number;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    user: User;
}
