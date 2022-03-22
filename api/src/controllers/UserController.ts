import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../entities/DTOs/UserDTO';
import UserService from '../services/UserService';
import { encrypt } from '../utils/Encryption';

class UserController {

    constructor(private readonly userService: typeof UserService){}

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const { iv, password } = encrypt(data.password);
        data.iv = iv;
        data.password = password;        

        try {
            const user = await this.userService.createUser(data);
            const userDTO = new UserDTO(user);
            
            return res.status(201).json(userDTO);

        } catch (error) {
            next(error);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const user = await this.userService.updateUser(Number(id), data);
            const userDTO = new UserDTO(user);

            return res.json(userDTO);

        } catch (error) {
            next(error);
        }
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const user = await this.userService.getUserById(Number(id));
            const userDTO = new UserDTO(user);

            return res.json(userDTO);

        } catch (error) {
            next(error);
        }
    }
}

export default new UserController(UserService);