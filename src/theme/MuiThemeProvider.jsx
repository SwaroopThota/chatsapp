import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline, useMediaQuery } from '@mui/material'
import React from 'react'

const MuiThemeProvider = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const theme = createTheme({
		palette: {
			mode: prefersDarkMode ? 'dark' : 'light',
		},
	})
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default MuiThemeProvider
