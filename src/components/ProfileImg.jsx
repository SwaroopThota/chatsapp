import { Avatar } from '@mui/material'
import React from 'react'
import useIsMobile from './hooks/useIsMobile'

const ProfileImg = ({ photoURL }) => {
	const size = useIsMobile() ? 40 : 56,
		style = { width: size, height: size }
	return (
		<Avatar src={photoURL} alt='Profile Pic' sx={style}>
			<img
				src='./assets/images/default_user.jpg'
				alt='default user image'
				style={{ width: 'inherit', height: 'inherit' }}
			/>
		</Avatar>
	)
}

export default ProfileImg
