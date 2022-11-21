import { Avatar, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useUserContext } from '../context/UserContext'
import LogoutIcon from '@mui/icons-material/Logout'

const UserInfo = () => {
	const {
		data: { user },
		dispatch,
	} = useUserContext()
	return (
		<Stack gap={2} direction='row'>
			<Avatar
				src={user.photoURL}
				alt='profile pic'
				onError={(event) => {
					event.target.src = './assets/images/default_user.jpg'
					event.onerror = null
				}}
				sx={{ width: 56, height: 56 }}
			/>
			<div>
				<Typography variant='body1'>{user.name}</Typography>
				<Button
					variant='outlined'
					color='error'
					size='small'
					onClick={() => dispatch({ type: 'signOutUser' })}
					startIcon={<LogoutIcon />}
				>
					logout
				</Button>
			</div>
		</Stack>
	)
}

export default UserInfo
