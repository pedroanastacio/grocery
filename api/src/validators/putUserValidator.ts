import * as Yup from 'yup';

export const putUserValidator: Yup.AnyObjectSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres').max(250, 'O nome deve ter até 250 caracteres'),
    email: Yup.string().required('O e-mail é obrigatório').max(250, 'O email deve ter até 250 caracteres').email('E-mail inválido'),
    roles: Yup.array().of(Yup.number())
    .min(1, 'Um tipo de usuário deve ser informado').required('Um tipo de usuário deve ser informado')
})