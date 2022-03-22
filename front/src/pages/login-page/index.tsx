import React, { memo, useState, useCallback } from 'react';
import LoginForm from './login-form';
import CreateUser from './create-user';
import ForgotPassword from './forgot-password';
import { Alert } from '../../components';
import * as S from './style';
import { useSelector } from 'react-redux';
import { selectorIsAuthenticated } from '../../store/selectors';
import { Navigate } from 'react-router-dom';

const DEFAULT_VIEW = 0;

const LoginPage: React.FC = () => {
	
	const [currentView, setCurrentView] = useState<number>(DEFAULT_VIEW);
	const [alertVisible, setAlertVisible] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<string>('');

	const isAuthenticated = useSelector(selectorIsAuthenticated);

	const onLogin = useCallback(() => { setCurrentView(0); }, []);
	const onCreateUser = useCallback(() => { setCurrentView(1); }, []);
	const onForgotPassword = useCallback(() => { setCurrentView(2); }, []);

	if (isAuthenticated) return <Navigate to='/' />;

	return (
		<>
			<S.Wrapper>
				<S.WrapperSplash />
				<S.WrapperSwipeableViews index={currentView}>
					<LoginForm onCreateUser={onCreateUser} onForgotPassword={onForgotPassword} setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage} />
					<CreateUser onCancel={onLogin} setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage} />
					<ForgotPassword onCancel={onLogin} onComplete={onLogin} setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage}/>
				</S.WrapperSwipeableViews>
			</S.Wrapper>
			<Alert
				open={alertVisible}
				setOpen={setAlertVisible}
				severity='error'
				message={alertMessage}
			/>
		</>
	);
};

export default memo(LoginPage);