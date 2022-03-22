import * as Yup from 'yup';

export const postAdressValidator: Yup.AnyObjectSchema = Yup.object({
    description: Yup.string().required('A descrição é obrigatória').max(250, 'O nome deve ter até 250 caracteres'),
    zip: Yup.string().required('O CEP é obrigatório').matches(/^[0-9]{8}$/, 'CEP inválido'), 
    country: Yup.string().required('A UF é obrigatória').min(2, 'A UF deve ter 2 caracteres').max(2, 'A UF deve ter 2 caracteres'),
    city: Yup.string().required('A cidade é obrigatória').max(250, 'A cidade deve ter até 250 caracteres'),
    neighborhood: Yup.string().required('O bairro é obrigatório').max(250, 'O bairro deve ter até 250 caracteres'),
    patio: Yup.string().required('O logradouro é obrigatória').max(250, 'O logradouro deve ter até 250 caracteres'),
    number: Yup.string().required('O número é obrigatória').max(10, 'O número deve ter até 10 caracteres'),
    complement: Yup.string().max(250, 'O complemento deve ter até 250 caracteres')
})