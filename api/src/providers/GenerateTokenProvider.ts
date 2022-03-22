import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN } from '../config';

class GenerateTokenProvider {
    
    public execute = (userId: number): string => {
        const newToken = jwt.sign({ user_id: userId }, process.env.SECRET_KEY, {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN
        });
        
        return newToken;
    }
}

export { GenerateTokenProvider };