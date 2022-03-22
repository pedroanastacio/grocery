import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import * as S from './style';
import IPage from '../../../interfaces/page';
import { generateSlug } from '../../../commons/utils/slug';

type Props = {
	show: boolean,
	toggleShow: (status: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
	items: IPage[]
};

const Drawer: React.FC<Props> = ({ show, toggleShow, items }) => {

	const [currentPage, setCurrentPage] = useState<string>('');
	const location = useLocation();

	useEffect(() => {
		const path: string[] = location.pathname.split('/');
		setCurrentPage(path.pop() || '');
	}, [location]);

	const setIcon = useCallback((pageName): React.ReactNode => {
		switch (pageName) {
		case 'Frutas':
			return (
				<ListItemIcon>
					<S.WrapperAppleIcon />
				</ListItemIcon>
			);
		case 'Verduras':
			return (
				<ListItemIcon>
					<S.WrapperGrassIcon />
				</ListItemIcon>
			);
		default: return;
		}
	}, []);

	const list = useCallback((items: IPage[]): React.ReactNode => (
		<List>
			{items.map((page: IPage) => (
				<Link to={`${page.path}/${generateSlug(page.name)}`} key={`${page.name}-page`}>
					<ListItemButton	selected={currentPage === generateSlug(page.name)}>
						{setIcon(page.name)}
						<S.WrapperListItemText primary={page.name} />
					</ListItemButton>
				</Link>
			))}
		</List>
	), [currentPage]);

	return (
		<S.WrapperDrawer
			anchor='left'
			open={show}
			onClose={toggleShow(false)}
			onOpen={toggleShow(true)}
			disableBackdropTransition={true}
		>
			<Box className='drawer-content'>
				{list(items)}
				<List>
					<Link to='/carrinho'>
						<ListItemButton selected={currentPage === 'carrinho'}>

							<ListItemIcon>
								<S.WrapperCartIcon />
							</ListItemIcon>
							<S.WrapperListItemText primary='Carrinho' />

						</ListItemButton>
					</Link>
					<Link to='/login' replace={true}>
						<ListItemButton selected={currentPage === 'login'}>
							<ListItemIcon>
								<S.WrapperLoginIcon />
							</ListItemIcon>
							<S.WrapperListItemText primary='Entrar' />
						</ListItemButton>
					</Link>
				</List>
			</Box>
		</S.WrapperDrawer>
	);
};

export default memo(Drawer);