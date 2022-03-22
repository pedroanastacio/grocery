import React, { memo } from 'react';
import App from './App';
import { ResetCSS } from './global/resetCSS';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import theme from './assets/theme';
import { Provider } from 'react-redux';
import { store } from './store';

const Providers: React.FC = () => {
	return (
		<main>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<SCThemeProvider theme={theme}>
						<ResetCSS />
						<Router>
							<App />
						</Router>
					</SCThemeProvider>
				</ThemeProvider>
			</Provider>
		</main>
	);
};

export default memo(Providers);
