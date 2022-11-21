import { Avatar, Typography } from '@mui/material'
import React from 'react'

const AppLogo = () => {
  return (
		<Typography
			variant='h4'
			display='flex'
			alignItems='center'
			gap={1}
			my={2}
		>
			<Avatar
				alt='logo'
				src='/assets/images/icon.png'
				sx={{ width: 56, height: 56 }}
			/>
			ChatsApp
		</Typography>
  )
}

export default AppLogo