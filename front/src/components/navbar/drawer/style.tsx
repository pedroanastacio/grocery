import styled from 'styled-components';
import { SwipeableDrawer, ListItemText } from '@mui/material';
import { ShoppingBasket, Login, Grass, Apple } from '@mui/icons-material';

export const WrapperDrawer = styled(SwipeableDrawer)`
    .drawer-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 200px;
        background-color: ${props => props.theme.palette.primary.contrastText};
        justify-content: space-between;
    }

    span {
        color: ${props => props.theme.palette.primary.main};
    }
`;

export const WrapperListItemText = styled(ListItemText)`
    span {
        font-size: 1.1em;
    }
`;

export const WrapperCartIcon = styled(ShoppingBasket)`
    color: ${props => props.theme.palette.primary.main};
    font-size: 30px !important;
`;

export const WrapperLoginIcon = styled(Login)`
    color: ${props => props.theme.palette.primary.main};
    font-size: 30px !important;
`;

export const WrapperAppleIcon = styled(Apple)`
    color: ${props => props.theme.palette.primary.main};
    font-size: 30px !important;
`;

export const WrapperGrassIcon = styled(Grass)`
    color: ${props => props.theme.palette.primary.main};
    font-size: 30px !important;
`;


