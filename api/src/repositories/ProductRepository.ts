import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { IListResult } from '../services/interfaces/IListResult';
import { IPaginationFilter } from '../services/interfaces/IPaginationFilter';
import { generateSlug } from '../utils/Slug';


@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    public createProduct = async (data: Partial<Product>): Promise<Product> => {
        const product = this.create();
        product.name = data.name;
        product.slug = generateSlug(data.name);
        product.price = parseFloat(data.price.toFixed(2));
        product.image = data.image;
        product.categories = data.categories;

        return await this.save(product);
    }

    public getProductById = async (id: number): Promise<Product> => {
        return await this.findOne(id);
    }

    public updateProduct = async (data: Partial<Product>, oldProduct: Product): Promise<Product> => {
        const updatedProduct = {
            ...oldProduct,
            name: data.name,
            slug: generateSlug(data.name),
            price: data.price,
            image: data.image,
            categories: data.categories
        }

        return await this.save(updatedProduct);
    }

    public deleteProduct = async (id: number): Promise<void> => {
        await this.delete(id);
    }

    public getProductBySlug = async (slug: string): Promise<Product> => {
        return await this.findOne({ where: { slug } });
    }

    public getProductByName = async (name: string): Promise<Product> => {
        return await this.findOne({ where: { name } });
    }

    public getProductByCategory = async (categorySlug: string, filter: IPaginationFilter): Promise<IListResult<Product>> => {
        const field = filter.sort?.field || 'name';
        const direction = filter.sort?.direction || 'ASC';

        const [result, total] = await this.createQueryBuilder('product')
            .take(filter.perPage)
            .skip((filter.page-1)*filter.perPage)
            .leftJoin('product.categories', 'category')
            .where('category.slug = :categorySlug', { categorySlug })
            .orderBy(`product.${field}`, direction)
            .getManyAndCount();
        
        return { total, result };
    }

    public searchProductsFromCategory = async (categorySlug: string, name: string, filter: IPaginationFilter): Promise<IListResult<Product>> => {
        const field = filter.sort?.field || 'name';
        const direction = filter.sort?.direction || 'ASC';

        const [result, total] = await this.createQueryBuilder('product')
            .take(filter.perPage)
            .skip((filter.page - 1) * filter.perPage)
            .leftJoin('product.categories', 'category')
            .where('category.slug = :categorySlug', { categorySlug })
            .andWhere('product.name ilike :name', { name: `%${name}%` })
            .orderBy(`product.${field}`, direction)
            .getManyAndCount();
        
        return { total, result };
    }
}