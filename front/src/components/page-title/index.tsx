import React, { memo } from 'react';
import { Typography } from '@mui/material';

type Props = {
	children: string
}

const PageTitle: React.FC<Props> = ({ children }) => {
	return (
		<Typography color="primary" fontSize="2.5em">
			{children}
		</Typography>
	);
};

export default memo(PageTitle);