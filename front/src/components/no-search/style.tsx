import styled from 'styled-components';

export const WrapperMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .message {
        font-size: 1.3em;
        color: ${props => props.theme.palette.secondary.light}
    }
`;