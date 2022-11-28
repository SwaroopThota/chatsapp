import { Send } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

const MessageInput = ({ text, setText, handleSend }) => {
	return (
		<Stack direction='row'>
			<TextField
				id='message'
				label='Type Something...'
				name='message'
				variant='outlined'
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') handleSend()
				}}
				fullWidth
				autoComplete='off'
			/>
			<IconButton aria-label='delete' size='large' onClick={handleSend}>
				<Send fontSize='inherit' color='primary' />
			</IconButton>
		</Stack>
	)
}

export default MessageInput
