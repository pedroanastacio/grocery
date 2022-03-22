import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import * as S from './style';

const LoadingCard: React.FC = () => {
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<S.WrapperCard>
				<div className='card-media'>
					<Skeleton width='100%' height={200} variant='rectangular' />
				</div>
				<div className='card-info'>
					<Skeleton width={60} height={30} />
					<Skeleton width={100} height={30} />
				</div>
			</S.WrapperCard>
		</Grid>
	);
};

export default LoadingCard;