import { Container } from '@mui/material'
import ErrorAlert from './components/ErrorAlert'
import Navbar from './components/Navbar'
import { useUserContext } from './context/UserContext'
import Home from './pages/Home'
import Signin from './pages/Signin'
import MuiThemeProvider from './theme/MuiThemeProvider'

function App() {
	const {
		data: { user, loading, darkMode, error },
		dispatch,
	} = useUserContext()
	return (
		<MuiThemeProvider>
			<Container maxWidth='xl' style={{ height: '100vh' }}>
				<Navbar user={user} dispatch={dispatch} darkMode={darkMode} />
				{error && <ErrorAlert />}
				{loading ? 'Loading...' : user ? <Home /> : <Signin />}
			</Container>
		</MuiThemeProvider>
	)
}

export default App
