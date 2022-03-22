import axios from 'axios';
import { API_ENDPOINT } from '../settings';
import { store } from '../store';
import authService from './auth';

const api = axios.create({
	baseURL: API_ENDPOINT
});

api.interceptors.request.use((config) => {
	const accessToken = store.getState().authTokens.value?.access_token;
	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
}, (error) => {
	return Promise.reject(error);
});


api.interceptors.response.use((response) => {
	return response;
}, async (error) => {
	const config = error.config;

	//Verifica se o status da response é Unauthorized
	if (error.response?.status === 401) {
		//Recupera o refresh-token
		const refreshToken = store.getState().authTokens.value?.refresh_token;

		//Caso encontre o refresh-token tenta autenticar com ele. Caso contrário redireciona o usuário para página de login
		if (refreshToken) {
			try {
				//Tenta autenticar com o refresh-token
				await authService.authenticateWithRefreshToken(refreshToken);

				//Recupera o novo access-token caso dê certo a autenticação com o refrsh-token
				const access_token = store.getState().authTokens.value?.access_token;

				//Define o novo access-token como o padrão das requests
				api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

				return api(config);

			} catch (err) {
				return Promise.reject(err);
			}
		}
		else {
			//Remove os auth-tokens do redux storage e da local storage
			authService.logout();
		}
	}

	if(error.response?.status === 403) {
		//Remove os auth-tokens do redux storage e da local storage
		authService.logout();
	}

	if (typeof error.response?.data?.message !== 'undefined')
		return Promise.reject(error.response.data.message);

	return Promise.reject('Algo deu errado!');
});

export default api;


