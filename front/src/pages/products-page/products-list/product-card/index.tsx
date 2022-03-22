import React, { memo } from 'react';
import { convertToReal } from '../../../../commons/utils/currency';
import * as S from './style';
import {
	Typography,
	Grid,
	CardActionArea,
} from '@mui/material';
import IProduct from '../../../../interfaces/models/product';

type Props = {
	data: IProduct
}

const ProductCard: React.FC<Props> = ({ data }) => {

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<S.WrapperCard>
				<CardActionArea>
					<div className='card-media'>
						<S.WrapperCardMediaContent
							component='img'
							image={`${data.image}`}
							alt={`${data.name}`}
						/>
					</div>
					<S.WrapperCardContent>
						<div className='card-info'>
							<Typography className='product-name'>
								{data.name}
							</Typography>
							<Typography className='product-price'>
								{convertToReal(data.price)}
							</Typography>
							{/* <Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							height: '100%',
							justifyContent: 'flex-end'
						}}
					>
						<Typography fontSize={15} color="secondary.light">
							Quantidade:
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
							<Box sx={{ mb: 2 }}>
								<IconButton>
									<IndeterminateCheckBoxOutlined color='secondary.light' />
								</IconButton>
								<TextField size='small' sx={{ width: 60 }} />
								<IconButton>
									<AddBoxOutlined color='secondary.light' />
								</IconButton>
							</Box>
							<Button variant="contained">Adicionar ao carrinho</Button>
						</Box>
					</Box> */}
						</div>
					</S.WrapperCardContent>
				</CardActionArea>
			</S.WrapperCard >
		</Grid >
	);
};

export default memo(ProductCard);