import styled from 'styled-components';

export const WrapperSearchBar = styled.form`
    display: flex;
    flex: 1;
    align-items: top;
    justify-content: flex-end;

    input {
        width: 250px;
    }

    ${props => props.theme.breakpoints.down('sm')} {
        width: 100%;

        input {
            width: 100vw;
        }
    }
`;

