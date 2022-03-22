import dayjs from 'dayjs';
import { EntityRepository, Repository } from 'typeorm';
import { REFRESH_TOKEN_EXPIRES_IN } from '../config';
import { RefreshToken } from '../entities/RefreshToken';
import { User } from '../entities/User';

@EntityRepository(RefreshToken)
export class AuthRepository extends Repository<RefreshToken> {

    public createRefreshToken = async (user: User): Promise<RefreshToken> => {
        const refreshToken = this.create();
        refreshToken.expires_in = dayjs().add(REFRESH_TOKEN_EXPIRES_IN, 'day').unix();
        refreshToken.user = user;

        return await this.save(refreshToken);
    }

    public getRefreshTokenById = async (uuid: string): Promise<RefreshToken> => {
        return await this.findOne({ where: { id: uuid }, relations: ['user'] });
    }

    public getRefreshTokenByUser = async (user: User): Promise<RefreshToken> => {
        return await this.findOne({ where: { user }});
    }

    public deleteRefreshToken = async (uuid: string): Promise<void> => {
        await this.delete({ id: uuid });
    }

}
