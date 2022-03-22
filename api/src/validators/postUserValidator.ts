import * as Yup from 'yup';

export const postUserValidator: Yup.AnyObjectSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres').max(250, 'O nome deve ter até 250 caracteres'),
    password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres').max(20, 'A senha deve ter até 20 caracteres'),
    email: Yup.string().required('O e-mail é obrigatório').max(250, 'O email deve ter até 250 caracteres').email('E-mail inválido'),
    roles: Yup.array().of(Yup.number())
    .min(1, 'Um tipo de usuário deve ser informado').required('Um tipo de usuário deve ser informado')
})