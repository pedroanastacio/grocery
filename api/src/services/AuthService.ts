import { getCustomRepository } from 'typeorm';
import { NotFoundException } from '../exceptions/NotFoundException';
import { UserRepository } from '../repositories/UserRepository';
import { encryptWithUserIv } from '../utils/Encryption';
import { GenerateTokenProvider } from '../providers/GenerateTokenProvider';
import { IAuthResult } from './interfaces/IAuthResult';
import { AuthRepository } from '../repositories/AuthRepository';
import dayjs from 'dayjs';
import validator from 'validator';
import { RefreshToken } from '../entities/RefreshToken';
import { ForbiddenException } from '../exceptions/ForbiddenException';

class AuthService {

    constructor(private readonly userRepository: UserRepository, private readonly authRepository: AuthRepository ){}  

    public login = async (email: string, password: string): Promise<IAuthResult> => {
        //Recupera usuário pelo e-mail
        const user = await this.userRepository.getUserByEmail(email);
        if(!user) throw new NotFoundException('Email ou senha inválidos');

        //Verifica se existe usuário com e-mail e senha recebidos
        const encryptedPassword = encryptWithUserIv(password, user.iv);
        const hasUser: boolean = await this.userRepository.getUserByCredentials(email, encryptedPassword) && true;
        if(!hasUser) throw new NotFoundException('Email ou senha inválidos');

        //Verifica se há um refresh-token para o usuário
        const persistedRefreshToken = await this.authRepository.getRefreshTokenByUser(user);

        let refreshToken: RefreshToken;

        if(persistedRefreshToken) {
            //Verifica se o refresh-token expirou
            const refreshTokenExpired = dayjs().isAfter(dayjs.unix(persistedRefreshToken.expires_in));

            if(!refreshTokenExpired) {
                //Retorna o refresh-token persistido se ele não tiver expirado
                refreshToken = persistedRefreshToken;
            }
            else {
                //Remove o refresh-token persistido se ele tiver expirado e gera um novo refresh-token
                await this.authRepository.deleteRefreshToken(persistedRefreshToken.id);
                refreshToken = await this.authRepository.createRefreshToken(user);
            }
        }
        else {
            //Gera um novo refresh-token
            refreshToken = await this.authRepository.createRefreshToken(user);
        }

        //Gera access-token
        const generateAccessToken = new GenerateTokenProvider();
        const accessToken = generateAccessToken.execute(user.id);     
        
        return { access_token: accessToken, refresh_token: refreshToken.id };
    }

    public authenticateWithRefreshToken = async (refreshToken: string): Promise<IAuthResult> => {
        //Verifica se o refresth token recebido é uma string
        if(typeof refreshToken !== 'string') throw new ForbiddenException('Refresh token inválido');

        //Verifica se o refresh-token recebido é um UUID
        const validRefreshToken = validator.isUUID(refreshToken);
        if(!validRefreshToken) throw new ForbiddenException('Refresh token inválido');

        //Verifica se o refresh-token é valido
        const persistedRefreshToken = await this.authRepository.getRefreshTokenById(refreshToken);
        if(!persistedRefreshToken) throw new ForbiddenException('Refresh token inválido');

        //Remove o refresh-token
        await this.authRepository.deleteRefreshToken(persistedRefreshToken.id);

        //Verifica se o refresh-token expirou
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(persistedRefreshToken.expires_in));
        if(refreshTokenExpired) throw new ForbiddenException('Refresh token expirou');

        //Gera um novo access-token
        const generateAccessToken = new GenerateTokenProvider();
        const newAccessToken = generateAccessToken.execute(persistedRefreshToken.user.id);

        //Gera um novo refresh-token
        const newRefreshToken = await this.authRepository.createRefreshToken(persistedRefreshToken.user);
        
        return { access_token: newAccessToken, refresh_token: newRefreshToken.id };
    }
}

export default new AuthService(getCustomRepository(UserRepository), getCustomRepository(AuthRepository));