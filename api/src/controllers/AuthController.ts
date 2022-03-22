import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {

    constructor(private readonly authService: typeof AuthService){}

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        try {
            const tokens = await this.authService.login(email, password);

            return res.json(tokens);

        } catch (error) {
            next(error);
        }
    }

    public authenticateWithRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
        const { 'refresh_token': refreshToken } = req.body;

        try {
            const newTokens = await this.authService.authenticateWithRefreshToken(refreshToken);

            return res.status(201).json(newTokens);

        } catch (error) {
            next(error);
        }
    }
}    

export default new AuthController(AuthService);