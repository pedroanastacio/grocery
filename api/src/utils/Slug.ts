import slugify from 'slugify';

export const generateSlug = (str: string): string => {
    return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g});
}