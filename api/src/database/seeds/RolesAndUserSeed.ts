import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../entities/Role';
import { User } from '../../entities/User';

export default class CreateRolesAndUser implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
      
      const admin = await factory(Role)().create();
      await factory(Role)().create({ name: 'user' });

      await factory(User)().create({ roles: [admin] });
    }
}