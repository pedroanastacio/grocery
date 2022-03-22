import React, { memo, useEffect } from 'react';
import { ListLoading, PageTitle, SearchBar, NoSearch, Alert } from '../../components';
import ProductsList from './products-list';
import { useProductsPage } from '../../hooks/products-page-hooks';
import { useLocation, useSearchParams } from 'react-router-dom';
import * as S from './style';

type Props = {
	title: string,
}

const ProductsPage: React.FC<Props> = ({ title }) => {

	const {
		getProducts,
		setPageTitle,
		setError,
		pageTitle,
		error,
		loading,
		products
	} = useProductsPage();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	useEffect(() => { setPageTitle(title); }, [title]);
	useEffect(() => { getProducts(searchParams); }, [location, searchParams]);

	return (
		<>
			<S.Wrapper>
				<S.WrapperContent>
					<S.WrapperHeader>
						<PageTitle>
							{pageTitle}
						</PageTitle>
						<SearchBar searchParam='name' />
					</S.WrapperHeader>
					{
						loading ?
							<ListLoading />
							:
							products?.result.length === 0 ?
								<NoSearch>
								Nenhum item encontrado
								</NoSearch>
								:
								<ProductsList />
					}
				</S.WrapperContent>
			</S.Wrapper>
			<Alert 
				open={!!error}
				setOpen={() => setError('')}
				severity='error'
				message={error}
			/>
		</>
	);
};

export default memo(ProductsPage);