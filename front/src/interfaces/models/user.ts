import IAdress from './adress';

/* eslint-disable semi */
export default interface IUser {
    id?: number,
    name: string,
    email: string,
    password?: string,
    adresses?: IAdress[],
    roles: userRoles[],
    created_at?: Date,
    updated_at?: Date
}


export enum userRoles {
    user = 'user',
    admin = 'admin'
} 
