import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { postLoginValidator } from '../validators/postLoginValidator';
import { validateRequest } from '../validators/validateRequest';

const authRouter = Router();

authRouter.post('/login', validateRequest(postLoginValidator), AuthController.login);
authRouter.post('/refresh-token', AuthController.authenticateWithRefreshToken);

export default authRouter;