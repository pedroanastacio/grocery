import React, { useCallback, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';
import productsService from '../services/products';
import IProduct from '../interfaces/models/product';
import IListResult from '../interfaces/listResult';

type Props = {
	children: React.ReactNode
}

type ProductsPageContextType = {
	products: IListResult<IProduct>,
	pageTitle: string,
	loading: boolean,
	error: string,
	getProducts: (searchParams: URLSearchParams) => Promise<void>,
	setPageTitle: React.Dispatch<React.SetStateAction<string>>,
	setError: React.Dispatch<React.SetStateAction<string>>,
}

export const ProductsPageContext = createContext<ProductsPageContextType>({
	products: { total: 0, result: [] },
	pageTitle: '',
	loading: false,
	error: '',
	getProducts: () => Promise.resolve(),
	setPageTitle: () => null,
	setError: () => null,
});

const ProductsPageProvider = ({ children }: Props) => {

	const [products, setProducts] = useState<IListResult<IProduct>>({ total: 0, result: [] });
	const [pageTitle, setPageTitle] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const getProducts = useCallback(async (searchParams: URLSearchParams): Promise<void> => {
		setLoading(true);	
		const [,,categorySlug] = location.pathname.split('/');

		try {
			const newProducts: IListResult<IProduct> = await productsService.getProductsByCategory(categorySlug, searchParams);
			setLoading(false);
			setProducts(newProducts);
		} catch(error: any) {
			setError(error);
		} 
	}, []);
   
	const contextValue = useMemo(() => ({ 
		products,
		pageTitle,
		loading, 
		error,
		getProducts, 
		setPageTitle,
		setError
	}), [products, pageTitle, loading, error]);

	return (
		<ProductsPageContext.Provider value={contextValue}>
			{children}
		</ProductsPageContext.Provider>
	);
};

export default ProductsPageProvider;