import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'
import { ChatProvider, useChatContext } from '../context/ChatContext'
import { Grid } from '@mui/material'

const Home = () => {
	document.title = 'Welcome to ChatsApp'
	return (
		<Grid container spacing={2} height='85%'>
			<ChatProvider>
				<Sidebar />
				<ChatBox />
			</ChatProvider>
		</Grid>
	)
}

export default Home
