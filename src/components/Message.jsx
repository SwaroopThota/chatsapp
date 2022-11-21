import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useRef } from 'react'
import ProfileImg from './ProfileImg'

const Message = ({ text, photoURL, isCurrentUserSender }) => {
	const ref = useRef()
	useEffect(() => {
		ref.current.scrollIntoView({
			behaviour: 'smooth',
		})
	}, [])
	return (
		<Stack
			alignItems='center'
			direction={isCurrentUserSender ? 'row-reverse' : 'row'}
			gap='1rem'
			ref={ref}
		>
			<ProfileImg photoURL={photoURL} />
			<Typography variant='body1'>{text}</Typography>
		</Stack>
	)
}

export default Message
