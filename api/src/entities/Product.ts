import { Entity, BaseEntity, ManyToMany, PrimaryGeneratedColumn, Column, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    slug: string

    @Column({ type: 'float' })
    price: number;

    @Column()
    image: string;

    @ManyToMany(() => Category, { cascade: true })
    @JoinTable()
    categories: Category[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
