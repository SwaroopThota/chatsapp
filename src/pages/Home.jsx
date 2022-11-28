import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'
import { useChatContext } from '../context/ChatContext'
import { Grid } from '@mui/material'

const Home = () => {
	document.title = 'Welcome to ChatsApp'
	const {
		data: { otherUser },
	} = useChatContext()
	return (
		<Grid container spacing={2} height='85%'>
			<Sidebar />
			{otherUser && <ChatBox />}
		</Grid>
	)
}

export default Home
