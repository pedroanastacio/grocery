import { NextFunction, Request, Response } from 'express';
import CategoryService from '../services/CategoryService';

class CategoryController {

    constructor(private readonly categoryService: typeof CategoryService){}

    public createCategory = async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;

        try {
            const category = await this.categoryService.createCategory(data);
            
            return res.status(201).json(category);
        }
        catch (error) {
            next(error);
        }
    }   

    public getCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
        const { slug } = req.params;

        try{
            const category = await this.categoryService.getCategoryBySlug(slug);
            
            return res.json(category);
        }
        catch (error) {
            next(error);
        }
    }

    public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            await this.categoryService.deleteCategory(Number(id));
            
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const result = await this.categoryService.updateCategory(Number(id), data);

            return res.json(result);
            
        } catch (error) {
            next(error);
        }
    }

    public listCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryService.listCategories();

            return res.json(categories);

        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController(CategoryService);