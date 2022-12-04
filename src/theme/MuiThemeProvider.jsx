import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline, responsiveFontSizes, useMediaQuery } from '@mui/material'

const MuiThemeProvider = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	let theme = createTheme({
		palette: {
			mode: prefersDarkMode ? 'dark' : 'light',
		},
	})
	theme = responsiveFontSizes(theme)
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default MuiThemeProvider
