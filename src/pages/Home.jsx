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
		<>
			<Grid container height='100vh'>
				<Grid item lg={4} md={6} xs={12}>
					<Sidebar />
				</Grid>
				<Grid item lg={8} md={6} xs={12}>
					{otherUser && <ChatBox />}
				</Grid>
			</Grid>
		</>
	)
}

export default Home
