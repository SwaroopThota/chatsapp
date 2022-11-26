import { Avatar } from '@mui/material'
import React from 'react'

const ProfileImg = ({ photoURL }) => {
	return (
		<Avatar src={photoURL} alt='Profile Pic' sx={{ width: 56, height: 56 }}>
			<img
				src='./assets/images/default_user.jpg'
				alt='default user image'
				style={{ width: 'inherit', height: 'inherit' }}
			/>
		</Avatar>
	)
}

export default ProfileImg
