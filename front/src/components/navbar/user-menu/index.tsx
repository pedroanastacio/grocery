import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import authService from '../../../services/auth';
import { useSelector } from 'react-redux';
import { selectorUsername } from '../../../store/selectors';
import * as S from './style';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const username = useSelector(selectorUsername);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		authService.logout();
	};

	const handleProfile = () => {
		navigate('/profile');
	};

	return (
		<div>
			<S.WrapperButton
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				{username.charAt(0).toUpperCase()}
			</S.WrapperButton>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleProfile}>
					<S.WrapperProfileIcon />
					Perfil
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<S.WrapperLogoutIcon />
					Sair
				</MenuItem>
			</Menu>
		</div>
	);
};

export default UserMenu;