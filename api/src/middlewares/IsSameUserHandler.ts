import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedException } from '../exceptions/NotAuthorizedException';

export const isSameUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = Number(res.locals.user_id);

    try {
        if(userId !== Number(id)) throw new NotAuthorizedException('Usuário não autorizado');
        next();

    } catch (error){
        next(error);
    }  
}