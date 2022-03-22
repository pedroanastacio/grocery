import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { isAdminHandler } from '../middlewares/IsAdminHandler';
import { postProductValidator } from '../validators/postProductValidator';
import { validateRequest } from '../validators/validateRequest';
import { validateToken } from '../validators/validateToken';

const productRouter = Router();

productRouter.post('/product', [validateToken, isAdminHandler, validateRequest(postProductValidator)], ProductController.createProduct);
productRouter.put('/product/:id', [validateToken, isAdminHandler, validateRequest(postProductValidator)], ProductController.updateProduct);
productRouter.delete('/product/:id', validateToken, isAdminHandler, ProductController.deleteProduct);
productRouter.get('/category/:categorySlug/products', ProductController.getProductsByCategory);
productRouter.get('/product/:slug', ProductController.getProductBySlug);

export default productRouter;