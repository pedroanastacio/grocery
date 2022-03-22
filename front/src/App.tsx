/* eslint-disable linebreak-style */
import React, { memo, useLayoutEffect } from 'react';
import { Layout } from './components';
import Routes from './routes/routes';
import { store } from './store';
import { useSelector } from 'react-redux';
import { selectorCurrentUser } from './store/selectors';
import userService from './services/user';
import { userSlice } from './store/slices/user';
import authService from './services/auth';

const App: React.FC = () => {

	const currentUser = useSelector(selectorCurrentUser);

	const getCurrentUser = async () => {
		if(currentUser) {
			try {
				const user = await userService.getUser(currentUser.user_id);
				store.dispatch(userSlice.actions.set(user));

			} catch (error) {
				authService.logout();
			}
		}
		else {
			authService.logout();
		}
	};

	useLayoutEffect(() => {
		getCurrentUser();
	}, [currentUser]);

	return (
		<Layout>
			<Routes />
		</Layout>
	);
};

export default memo(App);