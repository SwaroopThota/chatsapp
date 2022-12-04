import { Container } from '@mui/material'
import ErrorAlert from './components/ErrorAlert'
import Navbar from './components/Navbar'
import { useUserContext } from './context/UserContext'
import Home from './pages/Home'
import Signin from './pages/Signin'

function App() {
	const {
		data: { user, loading, error },
		dispatch,
	} = useUserContext()
	return (
		<Container maxWidth='xl' style={{ height: '100vh' }}>
			<Navbar user={user} dispatch={dispatch} />
			{error && <ErrorAlert />}
			{loading ? 'Loading...' : user ? <Home /> : <Signin />}
		</Container>
	)
}

export default App
