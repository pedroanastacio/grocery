import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthTokens from '../../interfaces/authTokens';
import storageService from '../../services/storage';

export const authTokensSlice = createSlice({
	name: 'auth-tokens',
	initialState: { value: storageService.get<IAuthTokens | null>('auth-tokens') },
	reducers: {
		set: (state, { payload: newAuthTokens }: PayloadAction<IAuthTokens>) => {
			storageService.set('auth-tokens', newAuthTokens);
			state.value = newAuthTokens;
		},
		clear: state => {
			storageService.remove('auth-tokens');
			state.value = null;
		}
	}
});


