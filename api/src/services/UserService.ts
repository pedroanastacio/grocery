import { getCustomRepository } from 'typeorm';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { DuplicateResourceException } from '../exceptions/DuplicateResourceException';
import { NotFoundException } from '../exceptions/NotFoundException';
import { RoleRepository } from '../repositories/RoleRepository';
import { UserRepository } from '../repositories/UserRepository';

class UserService {
    constructor(private readonly userRepository: UserRepository, private readonly roleRepository: RoleRepository) {}

    public createUser = async (data: Partial<User>): Promise<User> => {
        const hasUserWithSameEmail: boolean = await this.userRepository.getUserByEmail(data.email) && true;
        if(hasUserWithSameEmail) throw new DuplicateResourceException('E-mail já está sendo utilizado');
       
        let roles: Role[] = [];
        for (const role of data.roles) {
            const currentRole = await this.roleRepository.getRoleById(Number(role));
            if(!currentRole) throw new NotFoundException(data.roles.length > 1 ? 'Um dos tipos de usuário não foi encontrado' : 'Tipo de usuário não encontrado');
            roles.push(currentRole);    
        }

        data.roles = roles;

        return this.userRepository.createUser(data);
    }

    public updateUser = async (id: number, data: Partial<User>): Promise<User> => {
        const user = await this.userRepository.getUserById(id);
        if(!user) throw new NotFoundException('Usuário não encontrado');

        const userWithSameEmail = await this.userRepository.getUserByEmail(data.email);
        if(userWithSameEmail && userWithSameEmail.id !== id) throw new DuplicateResourceException(`Já existe um usuário com o email '${userWithSameEmail.email}'`);
    
        let roles: Role[] = [];
        for (const role of data.roles) {
            const currentRole = await this.roleRepository.getRoleById(Number(role));
            if(!currentRole) throw new NotFoundException(data.roles.length > 1 ? 'Um dos tipos de usuário não foi encontrado' : 'Tipo de usuário não encontrado');
            roles.push(currentRole);    
        }

        data.roles = roles;

        return await this.userRepository.updateUser(data, user);
    }

    public getUserById = async (id: number): Promise<User> => {
        const user = await this.userRepository.getUserById(id);

        if(!user) throw new NotFoundException('Usuário não encontrado');

        return user;
    }

}

export default new UserService(getCustomRepository(UserRepository), getCustomRepository(RoleRepository));