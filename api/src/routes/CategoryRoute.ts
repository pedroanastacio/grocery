import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import { isAdminHandler } from '../middlewares/IsAdminHandler';
import { postCategoryValidator } from '../validators/postCategoryValidator';
import { validateRequest } from '../validators/validateRequest';
import { validateToken } from '../validators/validateToken';

const categoryRouter = Router();

categoryRouter.get('/category/:slug', CategoryController.getCategoryBySlug);
categoryRouter.delete('/category/:id', validateToken, isAdminHandler, CategoryController.deleteCategory);
categoryRouter.put('/category/:id', [validateToken, isAdminHandler, validateRequest(postCategoryValidator)], CategoryController.updateCategory);
categoryRouter.post('/category', [validateToken, isAdminHandler, validateRequest(postCategoryValidator)], CategoryController.createCategory);
categoryRouter.get('/categories', CategoryController.listCategories);

export default categoryRouter;