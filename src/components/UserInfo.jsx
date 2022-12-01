import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import ProfileImg from './ProfileImg'
import { useChatContext } from '../context/ChatContext'

const UserInfo = ({ user, dispatch }) => {
	const { dispatch: chatDispatch } = useChatContext()
	const handleSignOut = () => {
		chatDispatch({ type: 'remove_user' })
		dispatch({ type: 'signOutUser' })
	}
	return (
		<Stack gap={2} direction='row' alignItems='center'>
			<ProfileImg photoURL={user.photoURL} />
			<div>
				<Typography variant='body1'>{user.name}</Typography>
				<Button
					variant='outlined'
					color='error'
					size='small'
					onClick={handleSignOut}
					startIcon={<LogoutIcon />}
				>
					logout
				</Button>
			</div>
		</Stack>
	)
}

export default UserInfo
