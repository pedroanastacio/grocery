import * as Yup from 'yup';

export const postProductValidator: Yup.AnyObjectSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório'),
    price: Yup.number().required('O preço é obrigatório'),
    image: Yup.string().required('A imagem é obrigatória'),
    categories: Yup.array().of(Yup.number())
        .min(1, 'O produto deve pertencer a pelo menos uma categoria').required('O produto deve pertencer a pelo menos uma categoria')
})