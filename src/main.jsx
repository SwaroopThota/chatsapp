import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/UserContext'
import MuiThemeProvider from './theme/MuiThemeProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<MuiThemeProvider>
				<App />
			</MuiThemeProvider>
		</UserProvider>
	</React.StrictMode>
)
