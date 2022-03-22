import styled from 'styled-components';
import { Button } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';

export const WrapperButton = styled(Button)`
    background-color: ${props => props.theme.palette.primary.dark} !important;
    color: ${props => props.theme.palette.primary.contrastText} !important;
    border-radius: 50% !important;
    min-width: 40px !important;
    width: 40px;
    height: 40px;
    font-size: 1.2em !important;
`;

export const WrapperProfileIcon = styled(Person)`
    margin-right: 10px;
    color: ${props => props.theme.palette.secondary.main};
`;

export const WrapperLogoutIcon = styled(Logout)`
    margin-right: 10px;
    color: ${props => props.theme.palette.secondary.main};
`;