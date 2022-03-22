import React from 'react';
import * as S from './style';
import { Typography } from '@mui/material';

type Props = {
	children: string
}

const NoSearch: React.FC<Props> = ({ children }) => {
	return (
		<S.WrapperMessage>
			<Typography className="message">
				{children}
			</Typography>
		</S.WrapperMessage>
	);
};

export default NoSearch;