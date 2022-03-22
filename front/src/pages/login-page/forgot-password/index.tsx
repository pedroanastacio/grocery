import React, { memo, MouseEvent, useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PageTitle, FormFieldError } from '../../../components';
import { Send } from '@mui/icons-material';
import * as S from './style';

type Props = {
	onCancel: (e: MouseEvent<HTMLElement>) => void,
	onComplete: (e: MouseEvent<HTMLElement>) => void,
	setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

type FormValues = {
	email: string;
};

const schema: Yup.AnyObjectSchema = Yup.object().shape({
	email: Yup.string().required('O e-mail é obrigatório').max(250, 'O email deve ter até 250 caracteres').email('E-mail inválido')
});

const ForgotPassword: React.FC<Props> = ({ onCancel, onComplete, setAlertVisible, setAlertMessage }) => {

	const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver<Yup.AnyObjectSchema>(schema) });

	const onSubmit = handleSubmit(async (data) => {
		setIsSubmiting(true);

		try {
			onComplete;
		}
		catch (error: any) {
			setAlertMessage(error);
			setAlertVisible(true);
		}
		finally {
			setIsSubmiting(false);
		}
	});

	return (
		<S.Wrapper>
			<PageTitle>Recuperar senha</PageTitle>
			<form onSubmit={onSubmit}>
				<S.WrapperInput>
					<TextField
						id='user-email'
						label='E-mail'
						{...register('email')}
						error={typeof errors.email?.message !== 'undefined'}
					/>
					{errors.email && <FormFieldError>{errors.email?.message}</FormFieldError>}
				</S.WrapperInput>
				<LoadingButton
					fullWidth
					type='submit'
					size='large'
					loading={isSubmiting}
					endIcon={<Send />}
					variant='contained'
				>
					Enviar
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

export default memo(ForgotPassword);