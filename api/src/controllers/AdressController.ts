import { Request, Response, NextFunction } from 'express';
import AdressService from '../services/AdressService';

class AdressController {
    constructor(private readonly adressService: typeof AdressService){}

    public createAdress = async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const userId = Number(res.locals.user_id);

        try {
            const result = await this.adressService.createAdress(data, userId);

            return res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    public updateAdress = async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const { id } = req.params;
        const userId = Number(res.locals.user_id);

        try {
            const result = await this.adressService.updateAdress(Number(id), userId, data);

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }

    public deleteAdress = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const userId = Number(res.locals.user_id);

        try {
            await this.adressService.deleteAdress(Number(id), userId);

            return res.sendStatus(200);

        } catch (error) {
            next(error);
        }
    }

    public getAdressesByUser = async (req: Request, res: Response, next: NextFunction) => {
        const { 'id': userId } = req.params;

        try {
            const adresses = await this.adressService.getAdressesByUser(Number(userId));

            return res.json(adresses);

        } catch (error) {
            next(error);
        }
    }
}

export default new AdressController(AdressService);