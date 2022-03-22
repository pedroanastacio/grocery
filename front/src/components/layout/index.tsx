import React, { memo } from 'react';
import * as S from './style';
import { Footer, NavBar } from '..';
import ProductsPageProvider from '../../providers/products-page-provider';

type Props = {
	children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<S.WrapperLayout>
			<NavBar />
			<S.WrapperContent>
				<ProductsPageProvider>
					{children}
				</ProductsPageProvider>
			</S.WrapperContent>
			<Footer />
		</S.WrapperLayout>
	);
};

export default memo(Layout);