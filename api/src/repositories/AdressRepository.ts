import { EntityRepository, Repository } from 'typeorm';
import { Adress } from '../entities/Adress';
import { User } from '../entities/User';

@EntityRepository(Adress)
export class AdressRepository extends Repository<Adress> {

    public createAdress = async (data: Partial<Adress>): Promise<Adress> => {
        const adress = this.create();
        adress.description = data.description;
        adress.zip = data.zip;
        adress.country = data.country;
        adress.city = data.city;
        adress.neighborhood = data.neighborhood;
        adress.patio = data.patio;
        adress.number = data.number;
        adress.complement = data.complement || '';
        adress.user = data.user;

        return await this.save(adress);
    }

    public updateAdress = async (data: Partial<Adress>, oldAdress: Adress): Promise<Adress> => {
        const updatedAdress = {
            ...oldAdress,
            description: data.description,
            zip: data.zip,
            country: data.country,
            city: data.city,
            neighborhood: data.neighborhood,
            patio: data.patio,
            number: data.number,
            complement: data.complement || ''
        }

        return await this.save(updatedAdress);
    }

    public deleteAdress = async (id: number): Promise<void> => {
        await this.delete(id);
    }

    public getAdress = async (id: number): Promise<Adress> => {
        return await this.findOne({ where: { id }, relations: ['user'] });
    }

    public getAdressesByUser = async(user: User): Promise<Adress[]> => {
        return await this.find({ where: { user: user }})
    }
}