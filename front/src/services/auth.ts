import api from './api';
import { store } from '../store';
import { authTokensSlice } from '../store/slices/auth-tokens';
import { userSlice } from '../store/slices/user';

class AuthService {

	public login = async (email: string , password: string): Promise<void> => {
		const { data: authTokens } = await api.post('/login', { email, password });
		store.dispatch(authTokensSlice.actions.set(authTokens));
	};

	public authenticateWithRefreshToken = async (refreshToken: string):Promise<void> => {
		const { data: authTokens } = await api.post('/refresh-token', { refresh_token: refreshToken });
		store.dispatch(authTokensSlice.actions.set(authTokens));
	};

	public logout = async (): Promise<void> => {
		store.dispatch(authTokensSlice.actions.clear());
		store.dispatch(userSlice.actions.clear());
	};
}

const authService = new AuthService();
export default authService;