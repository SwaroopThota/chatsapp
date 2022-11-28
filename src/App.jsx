import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import { useUserContext } from './context/UserContext'
import Home from './pages/Home'
import Signin from './pages/Signin'
import MuiThemeProvider from './theme/MuiThemeProvider'

function App() {
	const {
		data: { user, loading, darkMode },
		dispatch,
	} = useUserContext()
	return (
		<MuiThemeProvider>
			<Container maxWidth='xl' style={{ height: '100vh' }}>
				<Navbar user={user} dispatch={dispatch} darkMode={darkMode} />
				{loading ? 'Loading...' : user ? <Home /> : <Signin />}
			</Container>
		</MuiThemeProvider>
	)
}

export default App
