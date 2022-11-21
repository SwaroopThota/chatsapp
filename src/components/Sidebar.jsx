import { Stack } from '@mui/material'
import UserChats from './UserChats'
import Users from './Users'
import UserInfo from '../components/UserInfo'
import AppLogo from '../components/AppLogo'

const Sidebar = () => {
	return (
		<>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				pr='1rem'
			>
				<AppLogo />
				<UserInfo />
			</Stack>
			<Stack gap={2}>
				<Users />
				<UserChats />
			</Stack>
		</>
	)
}

export default Sidebar
