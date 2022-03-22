import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PageTitle, FormFieldError } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as S from './style';

type FormValues = {
    name: string;
    email: string;

};

const schema: Yup.AnyObjectSchema = Yup.object().shape({
	name: Yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres').max(250, 'O nome deve ter até 250 caracteres'),
	email: Yup.string().required('O e-mail é obrigatório').max(250, 'O email deve ter até 250 caracteres').email('E-mail inválido')
});

const ProfilePage: React.FC = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver<Yup.AnyObjectSchema>(schema) });

	return (
		<S.Wrapper>
			<S.WrapperContent>
				<PageTitle>Perfil</PageTitle>
				<form>
					<Grid container spacing={2}>
						<Grid item 
							xs={12}
							sm={6} 
							md={8}
						>
							<TextField
								fullWidth 
								id='user-name'
								label='Nome'
								{...register('name')}
								error={typeof errors.name?.message !== 'undefined'}
							/>
							{errors.name && <FormFieldError>{errors.name?.message}</FormFieldError>}
						</Grid>
						<Grid item 
							xs={12}
							sm={6} 
							md={4}
						>
							<TextField
								fullWidth 
								id='user-email'
								label='E-mail'
								{...register('email')}
								error={typeof errors.email?.message !== 'undefined'}
							/>
							{errors.email && <FormFieldError>{errors.email?.message}</FormFieldError>}
						</Grid>
					</Grid>
				</form>
			</S.WrapperContent>
		</S.Wrapper>

	);
};

export default ProfilePage;