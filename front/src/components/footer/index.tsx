import React, {memo} from 'react';
import { Typography } from '@mui/material';
import * as S from './style';

const Footer: React.FC = () => {
	return (
		<S.Wrapper>
			<Typography className='message'>© Pedro Anastácio - {new Date().getFullYear()}</Typography>
		</S.Wrapper>
	);
};

export default memo(Footer);