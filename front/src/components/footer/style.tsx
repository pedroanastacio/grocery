import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.palette.primary.main};
    height: fit-content;
    max-height: 50px;
    padding: 20px;

    .message {
        color: ${props => props.theme.palette.primary.contrastText};
        font-size: .9em;
    }
`;
