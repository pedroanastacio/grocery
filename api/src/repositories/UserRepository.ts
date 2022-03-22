import { EntityRepository, Repository } from 'typeorm';
import { UserDTO } from '../entities/DTOs/UserDTO';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public createUser = async (data: Partial<User>): Promise<User> => {
        const user = this.create();
        user.name = data.name;
        user.iv = data.iv;
        user.password = data.password;
        user.email = data.email;
        user.roles = data.roles;

        return await this.save(user);
    }

    public updateUser = async (data: Partial<User>, oldUser: User): Promise<User> => {
        const updatedUser = {
            ...oldUser,
            name: data.name,
            email: data.email,
            roles: data.roles
        }

        return await this.save(updatedUser);
    }

    public getUserById = async (id: number): Promise<User> => {
        return await this.findOne({ where: { id }, relations: ['roles', 'adresses'] });
    }

    public getUserByEmail = async (email: string): Promise<User> => {
        return await this.findOne({ email });
    }

    public getUserByCredentials = async (email: string, password: string): Promise<User> => {
        return await this.findOne({ email, password });
    }
}
