import React, { memo, useCallback, ChangeEvent, useMemo } from 'react';
import ProductCard from './product-card';
import { Grid, Pagination } from '@mui/material';
import { useProductsPage } from '../../../hooks/products-page-hooks';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import IProduct from '../../../interfaces/models/product';
import * as S from './style';
import { validateNumberQueryParam } from '../../../commons/utils/validateNumberQueryParam';

const DEFAULT_PER_PAGE = 12;	
const DEFAULT_PAGE = 1;

const ProductsList: React.FC = () => {

	const { products } = useProductsPage();
	const [searchParams, setSearchParams] = useSearchParams();
	
	const renderProducts = useCallback((product: IProduct, index: number) => {
		return <ProductCard key={index} data={product} />;
	}, []);

	const handlePaginationClick = useCallback((event: ChangeEvent<unknown>, page: number) => {
		const perPage = searchParams.get('perPage') || DEFAULT_PER_PAGE.toString();
		const name = searchParams.get('name');
		const sort = searchParams.get('sort');

		setSearchParams(
			createSearchParams({
				page: page.toString(),
				perPage,
				...(name !== null && { name }),
				...(sort !== null && { sort })
			})
		);
	}, []);

	const pageCountCalc = (total: number, perPage: number): number => {
		return total % perPage === 0 ? total / perPage : Math.ceil(total / perPage);
	};

	const pageCount = useMemo(() => pageCountCalc(products.total, validateNumberQueryParam(searchParams.get('perPage'), DEFAULT_PER_PAGE)), [searchParams, products]);

	return (
		<>
			<Grid container spacing={2}>
				{products?.result.map(renderProducts)}
			</Grid>
			<S.WrapperPagination>
				<Pagination
					count={pageCount}
					variant='outlined'
					shape='rounded'
					color='primary'
					showFirstButton
					showLastButton
					page={validateNumberQueryParam(searchParams.get('page'), DEFAULT_PAGE)}
					onChange={handlePaginationClick}
				/>
			</S.WrapperPagination>
		</>
	);
};

export default memo(ProductsList);