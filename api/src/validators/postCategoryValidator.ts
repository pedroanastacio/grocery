import * as Yup from 'yup';

export const postCategoryValidator: Yup.AnyObjectSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório')
})