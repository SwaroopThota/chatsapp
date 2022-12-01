import { Avatar, Typography } from '@mui/material'
import React from 'react'
import ProfileImg from './ProfileImg'

const AppLogo = () => {
	return (
		<Typography
			variant='h4'
			display='flex'
			alignItems='center'
			gap={1}
		>
			<ProfileImg photoURL='/assets/images/icon.png' />
			ChatsApp
		</Typography>
	)
}

export default AppLogo
