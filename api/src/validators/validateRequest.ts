import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: yup.AnyObjectSchema): yup.Asserts<yup.AnyObjectSchema> => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        } catch (err: any) {
            const errors: [] = err.errors;
            const statusCode = 400;

            return res.status(statusCode).send({
                'name': 'Error',
                'code': statusCode,
                'field': err.path,
                'messages': errors.join(',')
            })
        }
    }
}