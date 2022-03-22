import { getCustomRepository } from 'typeorm';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { DuplicateResourceException } from '../exceptions/DuplicateResourceException';
import { NotFoundException } from '../exceptions/NotFoundException';

class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    public createCategory = async (data: Partial<Category>): Promise<Category> => {
        const hasCategory = await this.categoryRepository.getCategoryByName(data.name) && true;

        if(hasCategory) throw new DuplicateResourceException(`A categoria '${data.name}' já existe`);

        return await this.categoryRepository.createCategory(data);
    }

    public getCategoryBySlug = async (slug: string): Promise<Category> => {
        const category: Category = await this.categoryRepository.getCategoryBySlug(slug);

        if(!category) throw new NotFoundException('Categoria não encontrada');

        return category;
    }

    public deleteCategory = async (id: number): Promise<void> => {
        const hasCategory = await this.categoryRepository.getCategoryById(id) && true;

        if(!hasCategory) throw new NotFoundException('Categoria não encontrada');

        await this.categoryRepository.deleteCategory(id);
    }

    public updateCategory = async (id: number, data: Partial<Category>): Promise<Category> => {
        const category = await this.categoryRepository.getCategoryById(id);
        if(!category) throw new NotFoundException('Categoria não encontrada');

        const categoryWithSameName = await this.categoryRepository.getCategoryByName(data.name);
        if(categoryWithSameName && categoryWithSameName.id !== id) throw new DuplicateResourceException(`A categoria '${data.name}' já existe`);

        return await this.categoryRepository.updateCategory(id, data);
    }

    public listCategories = async (): Promise<Category[]> => {
        return await this.categoryRepository.listCategories();
    }
}

export default new CategoryService(getCustomRepository(CategoryRepository));