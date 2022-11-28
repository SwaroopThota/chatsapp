import { Grid, Paper } from '@mui/material'
import UserChats from './UserChats'
import Users from './Users'

const Sidebar = () => {
	return (
		<Grid item lg={4} md={6} xs={12} height='100%'>
			<Paper sx={{ height: '100%', p: 1, borderRadius: 3 }} elevation={2}>
				<Users />
				<UserChats />
			</Paper>
		</Grid>
	)
}

export default Sidebar
