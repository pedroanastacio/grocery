import { getCustomRepository } from "typeorm";
import { Adress } from "../entities/Adress";
import { NotAuthorizedException } from "../exceptions/NotAuthorizedException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { AdressRepository } from "../repositories/AdressRepository";
import { UserRepository } from "../repositories/UserRepository";

class AdressService {
    constructor(private readonly adressRepository: AdressRepository, private readonly userRepository: UserRepository) {}

    public createAdress = async (data: Partial<Adress>, userId: number): Promise<Adress> => {
        const user = await this.userRepository.getUserById(userId);
        if(!user) throw new NotFoundException('Usuário não encontrado');

        data.user = user;

        return await this.adressRepository.createAdress(data);
    }

    public updateAdress = async (id: number, userId: number, data: Partial<Adress>): Promise<Adress> => {
        const adress = await this.adressRepository.getAdress(id);
        if(!adress) throw new NotFoundException('Endereço não encontrado');

        if(userId !== adress.user.id) throw new NotAuthorizedException('Usuário não autorizado');

        return await this.adressRepository.updateAdress(data, adress);
    }

    public deleteAdress = async (id: number, userId: number): Promise<void> => {
        const adress = await this.adressRepository.getAdress(id);
        if(!adress) throw new NotFoundException('Endereço não encontrado');

        if(userId !== adress.user.id) throw new NotAuthorizedException('Usuário não autorizado');

        return await this.adressRepository.deleteAdress(id);
    } 

    public getAdressesByUser = async (id: number): Promise<Adress[]> => {
        const user = await this.userRepository.getUserById(id);
        if(!user) throw new NotFoundException('Usuário não encontrado');

        return await this.adressRepository.getAdressesByUser(user);
    }
}

export default new AdressService(getCustomRepository(AdressRepository), getCustomRepository(UserRepository));