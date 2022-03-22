import { configureStore } from '@reduxjs/toolkit';
import { authTokensSlice } from './slices/auth-tokens';
import { userSlice } from './slices/user';

export const store = configureStore({
	reducer: {
		authTokens: authTokensSlice.reducer,
		user: userSlice.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;