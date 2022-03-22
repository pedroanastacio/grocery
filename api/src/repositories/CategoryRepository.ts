import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { generateSlug } from '../utils/Slug';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

    public createCategory = async (data: Partial<Category>): Promise<Category> => {
        const category = this.create();
        category.name = data.name;
        category.slug = generateSlug(data.name);

        return await this.save(category);
    }

    public getCategoryById = async (id: number): Promise<Category> => {
        return await this.findOne(id);
    }

    public deleteCategory = async (id: number): Promise<void> => {
        await this.delete(id);
    }

    public updateCategory = async (id: number, data: Partial<Category>): Promise<Category> => {
        await this.update({ id }, { name: data.name, slug: generateSlug(data.name) });
        
        return await this.findOne(id);
    }

    public listCategories = async (): Promise<Category[]> => {
        return await this.find({ order: { name: 'ASC' }});
    }

    public getCategoryBySlug = async (slug: string): Promise<Category> => {
        return await this.findOne({ where: { slug } });
    }

    public getCategoryByName = async (name: string): Promise<Category> => {
        return await this.findOne({ where: { name } });
    }
}
