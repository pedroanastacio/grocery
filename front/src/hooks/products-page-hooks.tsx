import { useContextSelector } from 'use-context-selector';
import { ProductsPageContext } from '../providers/products-page-provider';

export const useProductsPage = () => {
	const products = useContextSelector(ProductsPageContext, context => context.products);
	const pageTitle = useContextSelector(ProductsPageContext, context => context.pageTitle);
	const loading = useContextSelector(ProductsPageContext, context => context.loading);
	const error = useContextSelector(ProductsPageContext, context => context.error);
	const getProducts = useContextSelector(ProductsPageContext, context => context.getProducts);
	const setPageTitle = useContextSelector(ProductsPageContext, context => context.setPageTitle);
	const setError = useContextSelector(ProductsPageContext, context => context.setError);

	return {
		products,
		pageTitle,
		loading,
		error,
		getProducts,
		setPageTitle,
		setError
	};
};