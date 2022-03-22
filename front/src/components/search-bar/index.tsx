import React, { useState, memo, FormEvent, useCallback } from 'react';
import * as S from './style';
import { TextField, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { createSearchParams, useNavigate, useLocation } from 'react-router-dom';

type Props = {
	searchParam: string
}

const SearchBar: React.FC<Props> = ({ searchParam }) => {

	const [searchTerm, setSearchTerm] = useState<string>('');
	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if(searchTerm !== '') {
			navigate({
				pathname: location.pathname,
				search: `?${createSearchParams({
					[searchParam]: searchTerm
				})}`
			});	
		}
		else {
			navigate({ pathname: location.pathname });	
		}
	}, [searchTerm, location]);

	return (
		<S.WrapperSearchBar onSubmit={handleSubmit}>
			<TextField
				label='Pesquisar'
				size='small'
				color='primary'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<IconButton	type='submit' color='secondary'>
				<Search fontSize='small' />
			</IconButton>
		</S.WrapperSearchBar>
	);
};

export default memo(SearchBar);
