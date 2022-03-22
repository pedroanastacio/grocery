import styled from 'styled-components';
import { Storefront, ShoppingBasket, Menu } from '@mui/icons-material';
import { Button } from '@mui/material';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    padding: 10px;
    background-color: ${props => props.theme.palette.primary.main};

    a {
        display: flex;
        width: fit-content;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

export const WrapperLogo = styled.div`
    .title {
        margin-left: 5px;
        margin-right: 50px;
        padding-top: 5px;
        color: ${props => props.theme.palette.secondary.contrastText};
        font-size: 2.1em;
    }   

    ${props => props.theme.breakpoints.down('md')} {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const WrapperNavItems = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${props => props.theme.breakpoints.down('md')} {
        display: none;
    }
`;

export const WrapperNavLinks = styled.div`
    ul {
        display: flex;
        list-style-type: none;
    }
`;

export const WrapperNavButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
`;

export const WrapperDrawerButton = styled.div`
    display: none;

    ${props => props.theme.breakpoints.down('md')} {
        display: flex;
        justify-content: flex-start;
    }
`;

export const WrapperStorefront = styled(Storefront)`
    color: ${props => props.theme.palette.secondary.contrastText};
    font-size: 35px !important;
`;

export const WrapperShoppingBasket = styled(ShoppingBasket)`
    color: ${props => props.theme.palette.secondary.contrastText};
    font-size: 35px !important;
    margin-right: 20px;
`;

export const WrapperLoginButton = styled(Button)`
    span {
        font-size: 1.2em;
    }    
`;

export const WrapperMenu = styled(Menu)`
    color: ${props => props.theme.palette.secondary.contrastText};
    font-size: 35px !important;
`;




