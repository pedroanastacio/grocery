import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .error {
        font-size: 4.5em;
        color: ${props => props.theme.palette.primary.dark};
    }

    .message {
        font-size: 2.2em;
        color: ${props => props.theme.palette.secondary.light};
    }
`;