import { Router } from 'express';
import UserController from '../controllers/UserController';
import { isAdminOrSameUserHandler } from '../middlewares/IsAdminOrSameUser';
import { isSameUserHandler } from '../middlewares/IsSameUserHandler';
import { postUserValidator } from '../validators/postUserValidator';
import { putUserValidator } from '../validators/putUserValidator';
import { validateRequest } from '../validators/validateRequest';
import { validateToken } from '../validators/validateToken';

const userRouter = Router();

userRouter.post('/user', validateRequest(postUserValidator), UserController.createUser);
userRouter.put('/user/:id', [validateToken, isSameUserHandler, validateRequest(putUserValidator)], UserController.updateUser);
userRouter.get('/user/:id', [validateToken, isAdminOrSameUserHandler] ,UserController.getUserById);

export default userRouter;