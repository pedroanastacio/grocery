import { define } from 'typeorm-seeding';
import { Category } from '../../entities/Category';
import { generateSlug } from '../../utils/Slug';

define(Category, () => {
  const category = new Category();
  category.name = 'Frutas';
  category.slug = generateSlug('Frutas');

  return category;
});