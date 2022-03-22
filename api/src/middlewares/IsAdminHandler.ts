import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedException } from '../exceptions/NotAuthorizedException';
import { UserRepository } from '../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

export const isAdminHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getCustomRepository(UserRepository);
    const userId = Number(res.locals.user_id);

    try {
        const user = await userRepository.getUserById(userId);
        if(!user) throw new NotAuthorizedException('Token de autenticação inválido');

        const isAdmin = user.roles.some(role => role.name === 'admin');
        if(!isAdmin) throw new NotAuthorizedException('Usuário não autorizado');

        next();

    } catch (error) {
        next(error);
    }
}