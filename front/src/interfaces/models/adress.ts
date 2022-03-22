export default interface IAdress {
    id?: number,
    description: string,
    zip: string,
    country: string,
    city: string,
    neighborhood: string,
    patio: string,
    number: string,
    complement?: string,
    created_at?: Date,
    updated_at?: Date
};