import React, { memo, useCallback, useState, MouseEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputLabel, OutlinedInput, InputAdornment, IconButton, TextField, FormControl, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Login } from '@mui/icons-material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import * as S from './style';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormFieldError, PageTitle } from '../../../components';
import authService from '../../../services/auth';

type Props = {
	onCreateUser: (e: MouseEvent<HTMLElement>) => void,
	onForgotPassword: (e: MouseEvent<HTMLElement>) => void,
	setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

type FormValues = {
	email: string;
	password: string;
};

const schema: Yup.AnyObjectSchema = Yup.object().shape({
	email: Yup.string().required('O e-mail é obrigatório').max(250, 'O email deve ter até 250 caracteres').email('E-mail inválido'),
	password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

const LoginForm: React.FC<Props> = ({ onCreateUser, onForgotPassword, setAlertVisible, setAlertMessage }) => {

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
	const navigate = useNavigate();
	const mountedRef = useRef(true);
	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver<Yup.AnyObjectSchema>(schema) });

	const onSubmit = handleSubmit(async (data) => {
		setIsSubmiting(true);

		try {
			await authService.login(data.email, data.password);
			navigate('/');
		}
		catch (error: any) {
			setAlertMessage(error);
			setAlertVisible(true);
		}
		finally {
			// eslint-disable-next-line no-unsafe-finally
			if (!mountedRef.current) return;
			setIsSubmiting(false);
		}
	});

	const handleClickShowPassword = useCallback((): void => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	return (
		<S.Wrapper>
			<PageTitle>Entrar</PageTitle>
			<form onSubmit={onSubmit}>
				<S.WrapperInput>
					<TextField
						id='email'
						label='E-mail'
						{...register('email')}
						error={typeof errors.email?.message !== 'undefined'}
					/>
					{errors.email && <FormFieldError>{errors.email?.message}</FormFieldError>}
				</S.WrapperInput>
				<S.WrapperInput>
					<FormControl
						variant='outlined'
						error={typeof errors.password?.message !== 'undefined'}
					>
						<InputLabel htmlFor='password'>Senha</InputLabel>
						<OutlinedInput
							id='password'
							type={showPassword ? 'text' : 'password'}
							label='Senha'
							{...register('password')}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										onClick={handleClickShowPassword}
										edge='end'
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					{errors.password && <FormFieldError>{errors.password?.message}</FormFieldError>}
					<S.WrapperForgotPassword>
						<Typography onClick={onForgotPassword}>Esqueci minha senha</Typography>
					</S.WrapperForgotPassword>
				</S.WrapperInput>
				<LoadingButton
					fullWidth
					type='submit'
					size='large'
					loading={isSubmiting}
					endIcon={<Login />}
					variant='contained'
				>
					Entrar
				</LoadingButton>
			</form>
			<S.WrapperCreateAccount>
				<Typography>
					Ainda não tem uma conta? <span onClick={onCreateUser}>Crie uma conta agora</span>
				</Typography>
			</S.WrapperCreateAccount>
		</S.Wrapper>
	);
};

export default memo(LoginForm);