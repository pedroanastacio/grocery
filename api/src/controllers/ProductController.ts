import { NextFunction, Request, Response } from 'express';
import { Product } from '../entities/Product';
import { IListResult } from '../services/interfaces/IListResult';
import { IPaginationFilter } from '../services/interfaces/IPaginationFilter';
import ProductService from '../services/ProductService';

class ProductController {

    constructor(private readonly productService: typeof ProductService) { }

    private sanitizeFilter = (req: Request): IPaginationFilter => {
        const { page, perPage, sort } = req.query;
        let filter: IPaginationFilter;

        if(typeof sort !== 'undefined') {
            const { field, direction } = JSON.parse(sort.toString());
            filter = {
                page: Number(page),
                perPage: Number(perPage),
                sort: {
                    field,
                    direction: direction.toUpperCase()
                }
            };
        }
        else {
            filter = {
                page: Number(page),
                perPage: Number(perPage),
            };
        }
        
        return filter;
    }

    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;

        try {
            const newProduct = await this.productService.createProduct(data);

            return res.status(201).json(newProduct);

        } catch (error) {
            next(error);
        }
    }

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const result = await this.productService.updateProduct(Number(id), data);

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }

    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            await this.productService.deleteProduct(Number(id));

            return res.sendStatus(200);

        } catch (error) {
            next(error);
        };
    }

    public getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { categorySlug } = req.params;
        const { name } = req.query;
        let products: IListResult<Product>;

        try {
            const filter: IPaginationFilter = this.sanitizeFilter(req);

            if (name)
                products = await this.productService.searchProductsFromCategory(categorySlug, name.toString(), filter);
            else
                products = await this.productService.getProductsByCategory(categorySlug, filter);

            return res.json(products);

        } catch (error) {
            next(error);
        }
    }

    public getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
        const { slug } = req.params;

        try {
            const product = await this.productService.getProductBySlug(slug);

            return res.json(product);

        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController(ProductService);