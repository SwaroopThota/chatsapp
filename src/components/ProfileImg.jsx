import { Avatar } from '@mui/material'
import React from 'react'

const ProfileImg = ({ photoURL }) => {
	return (
		<Avatar
			src={photoURL}
			alt='profile pic'
			onError={(event) => {
				event.target.src = './assets/images/default_user.jpg'
				event.onerror = null
			}}
			sx={{ width: 56, height: 56 }}
		/>
	)
}

export default ProfileImg