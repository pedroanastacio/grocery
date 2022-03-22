import { Router } from 'express';
import AdressController from '../controllers/AdressController';
import { isAdminOrSameUserHandler } from '../middlewares/IsAdminOrSameUser';
import { postAdressValidator } from '../validators/postAdressValidator';
import { validateRequest } from '../validators/validateRequest';
import { validateToken } from '../validators/validateToken';

const adressRouter = Router();

adressRouter.post('/user-adress', [validateToken, validateRequest(postAdressValidator)], AdressController.createAdress);
adressRouter.put('/user-adress/:id', [validateToken, validateRequest(postAdressValidator)], AdressController.updateAdress)
adressRouter.delete('/user-adress/:id', validateToken, AdressController.deleteAdress);
adressRouter.get('/user-adresses/:id', [validateToken, isAdminOrSameUserHandler], AdressController.getAdressesByUser);

export default adressRouter;