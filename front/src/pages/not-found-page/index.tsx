import React, { memo } from 'react';
import { Typography } from '@mui/material';
import * as S from './style';

const NotFoundPage: React.FC = () => {
	return (
		<S.Wrapper>
			<Typography className='error'>Erro 404</Typography>
			<Typography className='message'>Página não encontrada!</Typography>
		</S.Wrapper>
	);
};

export default memo(NotFoundPage);