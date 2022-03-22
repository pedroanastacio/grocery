import styled from 'styled-components';
import { Card } from '@mui/material';

export const WrapperCard = styled(Card)`
    display: flex;
    flex-direction: column;
    margin-bottom: .1em;

    .card-media {
        flex: 1;
    }

    .card-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: right;
        height: 100%;
        padding: .8em;
    }
`;


