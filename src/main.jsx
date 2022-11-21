import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChatProvider } from './context/ChatContext'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<ChatProvider>
				<App />
			</ChatProvider>
		</UserProvider>
	</React.StrictMode>
)