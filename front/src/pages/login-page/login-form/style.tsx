import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 15px;
    justify-content: space-around;
`;

export const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 20px;
`;

export const WrapperForgotPassword = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;

    p {
        color: ${props => props.theme.palette.primary.main};
        font-size: 0.8em;
        cursor: pointer;
    }
`;

export const WrapperCreateAccount = styled.div`
    p {
        color: ${props => props.theme.palette.secondary.main};
        text-align: center;

        span {
            color: ${props => props.theme.palette.primary.main};
            cursor: pointer;
        }
    }
`;

