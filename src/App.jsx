import { Container } from '@mui/material'
import { useUserContext } from './context/UserContext'
import Home from './pages/Home'
import Signin from './pages/Signin'
import MuiThemeProvider from './theme/MuiThemeProvider'

function App() {
	const {
		data: { user, loading },
	} = useUserContext()
	return (
		<MuiThemeProvider>
			<Container
				maxWidth='xl'
				style={{ height: '100vh' }}
			>
				{loading ? 'Loading...' : user ? <Home /> : <Signin />}
			</Container>
		</MuiThemeProvider>
	)
}

export default App
