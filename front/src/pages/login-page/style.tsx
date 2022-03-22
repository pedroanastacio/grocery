import styled from 'styled-components';
import splashImage from '../../assets/images/splash.jpg';
import SwipeableViews from 'react-swipeable-views';

export const Wrapper = styled.div`
    display: flex;
    flex: 1;

    ${props => props.theme.breakpoints.up('md')} {
        min-width: 400px;
    }

    ${props => props.theme.breakpoints.down('md')} {
        align-items: center;
        justify-content: center;
    }

`;

export const WrapperSplash = styled.div`
    background: url(${splashImage}) no-repeat center;
    background-size: cover;
    flex: 1;

    ${props => props.theme.breakpoints.down('md')} {
        display: none;
    }
`;

export const WrapperSwipeableViews = styled(SwipeableViews)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 450px;
    height: 100%;
 
    ${props => props.theme.breakpoints.up('md')} {
        min-width: 400px;
    }

    .react-swipeable-view-container {
        height: 100%;
    }
`;
