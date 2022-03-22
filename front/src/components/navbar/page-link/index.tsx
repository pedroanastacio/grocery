import React, { memo } from 'react';
import * as S from './style';
import { Typography } from '@mui/material';
import { useMatch, useResolvedPath } from 'react-router-dom';
import IPage from '../../../interfaces/page';
import { generateSlug } from '../../../commons/utils/slug';

type Props = {
	page: IPage
}

const PageLink: React.FC<Props> = ({ page }) => {

	const path = `${page.path}/${generateSlug(page.name)}`;
	const resolved = useResolvedPath(path);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<S.WrapperLink
			match={match}
			to={path}
		>
			<Typography className='text'>{page.name}</Typography>
		</S.WrapperLink>
	);
};

export default memo(PageLink);