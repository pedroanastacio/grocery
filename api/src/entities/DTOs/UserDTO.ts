import { Adress } from '../Adress'
import { User } from '../User';

export class UserDTO {

    private id: number;
    private name: string;
    private email: string;
    private created_at: Date;
    private updated_at: Date;
    private adresses?: Adress[];
    private roles: userRoles[];

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
        this.adresses = user.adresses;
        this.roles = user.roles.map(item => userRoles[item.name]);
    }
}

export enum userRoles {
    user = 'user',
    admin = 'admin'
} 