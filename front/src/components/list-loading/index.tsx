import React, { useCallback } from 'react';
import { Grid } from '@mui/material';
import { LoadingCard } from '..';

const ListLoading: React.FC = () => {

	const renderCards = useCallback((item: any, index: number) => {
		return (
			<LoadingCard key={index} />
		);
	}, []);

	return (
		<Grid container spacing={2}>
			{Array.from(new Array(12)).map(renderCards)}
		</Grid>
	);
};

export default ListLoading;