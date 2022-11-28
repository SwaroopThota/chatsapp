import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline, responsiveFontSizes } from '@mui/material'
import { useUserContext } from '../context/UserContext'

const MuiThemeProvider = ({ children }) => {
	const {
		data: { darkMode },
	} = useUserContext()
	let theme = createTheme({
		palette: {
			mode: darkMode ? 'dark' : 'light',
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
