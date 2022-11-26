import { Avatar, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useUserContext } from '../context/UserContext'
import LogoutIcon from '@mui/icons-material/Logout'
import ProfileImg from './ProfileImg'

const UserInfo = () => {
	const {
		data: { user },
		dispatch,
	} = useUserContext()
	return (
		<Stack gap={2} direction='row'>
			<ProfileImg photoURL={user.photoURL} />
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
