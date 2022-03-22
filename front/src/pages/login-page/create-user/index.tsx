import React, { memo, MouseEvent, useState, useCallback, useRef } from 'react';
import { PageTitle, FormFieldError } from '../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as S from './style';
import { Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import userService from '../../../services/user';
import { useNavigate } from 'react-router-dom';
import IUser, { userRoles } from '../../../interfaces/models/user';

type Props = {
	onCancel: (e: MouseEvent<HTMLElement>) => void,
	setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

type FormValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const schema: Yup.AnyObjectSchema = Yup.object().shape({
	name: Yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres').max(250, 'O nome deve ter até 250 caracteres'),
	email: Yup.string().required('O e-mail é obrigatório').max(250, 'O email deve ter até 250 caracteres').email('E-mail inválido'),
	password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter pelo menos 8 caracteres').max(20, 'A senha deve ter até 20 caracteres'),
	confirmPassword: Yup.string().required('A confirmação de senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres').max(20, 'A senha deve ter até 20 caracteres').oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
});

const CreateUser: React.FC<Props> = ({ onCancel, setAlertVisible, setAlertMessage }) => {

	const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const navigate = useNavigate();
	const mountedRef = useRef(null);
	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver<Yup.AnyObjectSchema>(schema) });

	const onSubmit = handleSubmit(async (data) => {
		setIsSubmiting(true);

		const userData: IUser = {
			name: data.name,
			email: data.email,
			password: data.password,
			roles: [userRoles.user]
		};

		try {
			await userService.create(userData);
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

	const handleClickShowConfirmPassword = useCallback((): void => {
		setShowConfirmPassword(!showConfirmPassword);
	}, [showConfirmPassword]);

	return (
		<S.Wrapper>
			<PageTitle>Criar Conta</PageTitle>
			<form onSubmit={onSubmit}>
				<S.WrapperInput>
					<TextField
						id='new-user-name'
						label='Nome'
						{...register('name')}
						error={typeof errors.name?.message !== 'undefined'}
					/>
					{errors.name && <FormFieldError>{errors.name?.message}</FormFieldError>}
				</S.WrapperInput>
				<S.WrapperInput>
					<TextField
						id='new-user-email'
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
							id='new-user-password'
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
				</S.WrapperInput>
				<S.WrapperInput>
					<FormControl
						variant='outlined'
						error={typeof errors.confirmPassword?.message !== 'undefined'}
					>
						<InputLabel htmlFor='confirm-password'>Confirmar Senha</InputLabel>
						<OutlinedInput
							id='confirm-password'
							type={showConfirmPassword ? 'text' : 'password'}
							label='Confirmar Senha'
							{...register('confirmPassword')}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										onClick={handleClickShowConfirmPassword}
										edge='end'
									>
										{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					{errors.confirmPassword && <FormFieldError>{errors.confirmPassword?.message}</FormFieldError>}
				</S.WrapperInput>
				<LoadingButton
					fullWidth
					type='submit'
					size='large'
					loading={isSubmiting}
					variant='contained'
				>
					Criar conta
				</LoadingButton>
			</form>
			<S.WrapperHasAccount>
				<Typography>
					Já possui uma conta? <span onClick={onCancel}>Clique aqui</span>
				</Typography>
			</S.WrapperHasAccount>
		</S.Wrapper>
	);
};

export default memo(CreateUser);