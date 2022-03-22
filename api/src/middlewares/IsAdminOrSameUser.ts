import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedException } from '../exceptions/NotAuthorizedException';
import { UserRepository } from '../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

export const isAdminOrSameUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getCustomRepository(UserRepository);
    const { id } = req.params;
    const userId = Number(res.locals.user_id);

    try {
        const user = await userRepository.getUserById(userId);
        if(!user) throw new NotAuthorizedException('Token de autenticação inválido');

        const isAdmin = user.roles.some(role => role.name === 'admin');
        const isSameUser = userId === Number(id);

        if(!isAdmin && !isSameUser) throw new NotAuthorizedException('Usuário não autorizado');

        next();

    } catch (error) {
        next(error);
    }
}