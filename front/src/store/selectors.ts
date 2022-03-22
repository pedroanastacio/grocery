import { createSelector } from 'reselect';
import decodeJWTToken from '../helpers/jwt';
import IUserAccessToken from '../interfaces/userAccessToken';
import { RootState } from './index';

export const selectorIsAuthenticated = createSelector(
	(state: RootState) => state.authTokens.value,
	token => !!token
);

export const selectorCurrentUser = createSelector(
	(state: RootState) => state.authTokens.value,
	token => (token ? decodeJWTToken<IUserAccessToken>(token.access_token) : null)
);

export const selectorUsername = createSelector(
	(state: RootState) => state.user.value.name,
	username => username
);

