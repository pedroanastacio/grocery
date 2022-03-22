import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`;

export const WrapperContent = styled.div`
    max-width: 1200px;
    padding: 20px;
    flex: 1;
`;

export const WrapperHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 16px;

    ${props => props.theme.breakpoints.down('sm')} {
        flex-direction: column;
        align-items: flex-start;
    }
`;