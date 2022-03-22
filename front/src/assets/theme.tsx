import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: 'Bebas Neue, cursive'
	},
	palette: {
		primary: {
			light: '#32cf55',
			main: '#28a745',
			dark: '#1f8035',
			contrastText: '#f5f5f5'
		},
		secondary: {
			light: '#858585',
			main: '#4d4d4d',
			dark: '#292929',
			contrastText: '#fff'
		}
	}
});

export default theme;