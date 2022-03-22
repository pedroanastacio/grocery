import { define } from 'typeorm-seeding';
import { Role } from '../../entities/Role';

define(Role, () => {
  const role = new Role();
  role.name = 'admin';

  return role;
});