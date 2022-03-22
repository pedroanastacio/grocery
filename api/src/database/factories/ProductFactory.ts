import { define } from 'typeorm-seeding';
import { Product } from '../../entities/Product';
import { generateSlug } from '../../utils/Slug';

define(Product, () => {
  const product = new Product();
  product.name = 'Abacaxi';
  product.slug = generateSlug('Abacaxi');
  product.price = 5.40;
  product.image = 'https://cd.shoppub.com.br/cenourao/media/cache/7d/dc/7ddcf04db9666b50ce4a4d43c23177eb.png';
  
  return product;
});