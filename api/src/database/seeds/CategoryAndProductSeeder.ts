import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from '../../entities/Category';
import { Product } from '../../entities/Product';
import slugify from 'slugify';

export default class CreateCategoriesAndProducts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    
    const frutas = await factory(Category)().create();
    const verduras = await factory(Category)().create({ 
      name: 'Verduras', 
      slug: slugify('Verduras', { lower: true, remove: /[*+~.()'"!:@]/g }) 
    });
    
    await factory(Product)().create({ categories: [frutas] });
    await factory(Product)().create({ 
      name: 'Espinafre',
      slug: slugify('Espinafre', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 1.50,
      image: 'https://cd.shoppub.com.br/cenourao/media/cache/ca/ad/caad7623639e488f1f81be9d35ab7625.jpg',
      categories: [verduras]
    });
    await factory(Product)().create({ 
      name: 'Maçã',
      slug: slugify('Maçã', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 2.50,
      image: 'https://hiperideal.vteximg.com.br/arquivos/ids/167706-1000-1000/56383.jpg?v=636615816296530000',
      categories: [frutas]
    });
    await factory(Product)().create({ 
      name: 'Laranja',
      slug: slugify('Laranja', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 1.00,
      image: 'https://thumbs.dreamstime.com/b/uma-laranja-inteira-com-folha-isolada-no-branco-108987118.jpg',
      categories: [frutas]
    });
    await factory(Product)().create({ 
      name: 'Limão',
      slug: slugify('Limão', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 0.50,
      image: 'https://a-static.mlcdn.com.br/618x463/limao-taiti/fruitexpress/7d56f96ccb0311ebb1524201ac18500e/a3c3b0771bbaea7fc6a9b7a011fabdc3.jpg',
      categories: [frutas]
    });
    await factory(Product)().create({ 
      name: 'Uva',
      slug: slugify('Uva', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 4.90,
      image: 'https://hortadobairro.pt/wp-content/uploads/2020/07/uva-cardinal.jpg',
      categories: [frutas]
    });
    await factory(Product)().create({ 
      name: 'Alface',
      slug: slugify('Alface', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 2.20,
      image: 'https://cdn.awsli.com.br/600x700/1578/1578261/produto/60428322/fe0c239205.jpg',
      categories: [verduras]
    });
    await factory(Product)().create({ 
      name: 'Brócolis',
      slug: slugify('Brócolis', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 3.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4VjOJbEnYiwNoIWzeCUIdMM52-gcin3Oud1XbLcEXzCNJaPWQTMXEXjQGFNtQNEglMc&usqp=CAU',
      categories: [verduras]
    });
    await factory(Product)().create({ 
      name: 'Couve-flor',
      slug: slugify('Couve-flor', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 5.00,
      image: 'https://hiperideal.vteximg.com.br/arquivos/ids/167871-1000-1000/227137.jpg?v=636615816845330000',
      categories: [verduras]
    });
    await factory(Product)().create({ 
      name: 'Alcachofra',
      slug: slugify('Alcachofra', { lower: true, remove: /[*+~.()'"!:@]/g }),
      price: 8.20,
      image: 'https://www.exotic-seeds.store/10525-large_default/sementes-de-alcachofra-verde.jpg',
      categories: [verduras]
    });
  }
}