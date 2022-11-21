import {
	arrayUnion,
	doc,
	onSnapshot,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore'
import { Send } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase'
import { useChatContext } from '../context/ChatContext'
import { useUserContext } from '../context/UserContext'
import { v4 } from 'uuid'
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import ProfileImg from './ProfileImg'
import { Box } from '@mui/system'
import Message from './Message'

const ChatBox = () => {
	const {
		data: { otherUser, combinedId },
	} = useChatContext()
	const {
		data: { user: currentUser },
	} = useUserContext()
	const [messages, setMessages] = useState([])
	const [text, setText] = useState('')
	const handleSend = async () => {
		const t = text
		setText('')
		if (t.trim().length == 0) return
		await updateDoc(doc(db, 'chats', combinedId), {
			messages: arrayUnion({
				id: v4(),
				senderId: currentUser.uid,
				text: t,
				date: Timestamp.now(),
			}),
		})
		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[combinedId + '.lastMessage']: t,
			[combinedId + '.date']: serverTimestamp(),
		})
		await updateDoc(doc(db, 'userChats', otherUser.uid), {
			[combinedId + '.lastMessage']: t,
			[combinedId + '.date']: serverTimestamp(),
		})
	}
	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'chats', combinedId), (snapshot) => {
			setMessages(snapshot.data().messages)
		})
		return () => unsub()
	}, [])

	return (
		<Box sx={{ height: '100vh', px: '2rem' }}>
			<Stack gap={'1rem'} direction={'row'}>
				<ProfileImg photoURL={otherUser.photoURL} />
				<div>
					<Typography variant='h6'>{otherUser.name}</Typography>
					<Typography variant='body2' color='grey'>
						{otherUser.email}
					</Typography>
				</div>
			</Stack>
			<Stack
				gap='1rem'
				my='1rem'
				sx={{ height: '75%', overflowY: 'auto' }}
			>
				{messages.map((msg) => {
					let isCurrentUserSender = msg.senderId === currentUser.uid
					const photoURL = isCurrentUserSender
						? currentUser.photoURL
						: otherUser.photoURL
					return (
						<Message
							isCurrentUserSender={isCurrentUserSender}
							photoURL={photoURL}
							text={msg.text}
						/>
					)
				})}
			</Stack>
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
				<IconButton
					aria-label='delete'
					size='large'
					onClick={handleSend}
				>
					<Send fontSize='inherit' color='primary' />
				</IconButton>
			</Stack>
		</Box>
	)
}

export default ChatBox
