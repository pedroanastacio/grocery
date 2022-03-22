import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedException } from '../exceptions/NotAuthorizedException';

export const checkTokenIsValid = (token: string): any => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) throw new NotAuthorizedException('Token de autenticação inválido');
            resolve(decoded);
        });
    });
}

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bearerToken: string = req.headers.authorization;
        if (!bearerToken) {
            throw new NotAuthorizedException('Token de autenticação é obrigatório');
        }

        const token: string = bearerToken.split(' ')[1];
        const decodedToken = await checkTokenIsValid(token);
        
        res.locals.user_id = decodedToken.user_id;
        next();
        
    } catch (error) {
        next(error);
    }
}