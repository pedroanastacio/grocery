import { define } from 'typeorm-seeding';
import { User } from '../../entities/User';
import { encrypt } from '../../utils/Encryption';

define(User, () => {

    const { iv, password } = encrypt('admin123');
    const user = new User();
    user.name = 'Admin';
    user.email = 'admin@grocery.com',
    user.password = password,
    user.iv = iv;
    
    return user;
});