import { getCustomRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { DuplicateResourceException } from '../exceptions/DuplicateResourceException';
import { NotFoundException } from '../exceptions/NotFoundException';
import { Category } from '../entities/Category';
import { IPaginationFilter } from './interfaces/IPaginationFilter';
import { IListResult } from './interfaces/IListResult';

class ProductService {
    constructor(private readonly productRepository: ProductRepository, private readonly categoryRepository: CategoryRepository) {}

    public createProduct = async (data: Partial<Product>): Promise<Product> => {
        const hasProduct = await this.productRepository.getProductByName(data.name) && true;
        if(hasProduct) throw new DuplicateResourceException(`O produto '${data.name}' já existe`);

        let categories: Category[] = [];
        for (const category of data.categories) {
            const currentCategory = await this.categoryRepository.getCategoryById(Number(category));
            if(!currentCategory) throw new NotFoundException(data.categories.length > 1 ? 'Uma das categorias não foi encontrada' : 'Categoria não encontrada');
            categories.push(currentCategory);    
        }

        data.categories = categories;

        return await this.productRepository.createProduct(data);
    }

    public updateProduct = async (id: number, data: Partial<Product>) => {
        const product: Product = await this.productRepository.getProductById(id);
        if(!product) throw new NotFoundException('Produto não encontrado');

        const productWithSameSame = await this.productRepository.getProductByName(data.name);
        if(productWithSameSame && productWithSameSame.id !== id) throw new DuplicateResourceException(`O produto '${productWithSameSame.name}' já existe`);

        let categories: Category[] = [];
        for (const category of data.categories) {
            const currentCategory = await this.categoryRepository.getCategoryById(Number(category));
            if(!currentCategory) throw new NotFoundException(data.categories.length > 1 ? 'Uma das categorias não foi encontrada' : 'Categoria não encontrada');
            categories.push(currentCategory);    
        }

        data.categories = categories;

        return await this.productRepository.updateProduct(data, product);
    }

    public deleteProduct = async (id: number): Promise<void> => {
        const hasProduct = await this.productRepository.getProductById(id) && true;

        if(!hasProduct) throw new NotFoundException('Produto não encontrado');

        await this.productRepository.deleteProduct(id);
    }

    public getProductBySlug = async (slug: string): Promise<Product> => {
        const product: Product = await this.productRepository.getProductBySlug(slug);

        if(!product) throw new NotFoundException('Produto não encontrado');

        return product;
    }

    public getProductsByCategory = async (categorySlug: string, filter: IPaginationFilter): Promise<IListResult<Product>> => {
        const hasCategory = await this.categoryRepository.getCategoryBySlug(categorySlug);

        if(!hasCategory) throw new NotFoundException('Categoria não encontrada');

        return await this.productRepository.getProductByCategory(categorySlug, filter);
    }

    public searchProductsFromCategory = async (categorySlug: string, name: string, filter: IPaginationFilter): Promise<IListResult<Product>> => {
        const hasCategory = await this.categoryRepository.getCategoryBySlug(categorySlug);

        if(!hasCategory) throw new NotFoundException('Categoria não encontrada');

        return await this.productRepository.searchProductsFromCategory(categorySlug, name, filter);
    }
}

export default new ProductService(getCustomRepository(ProductRepository), getCustomRepository(CategoryRepository));