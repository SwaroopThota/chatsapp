import {
	arrayUnion,
	doc,
	onSnapshot,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useChatContext } from '../context/ChatContext'
import { useUserContext } from '../context/UserContext'
import { v4 } from 'uuid'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import ProfileImg from './ProfileImg'
import Message from './Message'
import MessageInput from './MessageInput'

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
		return unsub
	}, [combinedId])

	return (
		<Grid item lg={8} md={6} xs={12} height='100%'>
			<Paper sx={{ height: '100%', p: 1, borderRadius: 3 }}>
				<Stack gap={'1rem'} direction={'row'}>
					<ProfileImg photoURL={otherUser.photoURL} />
					<div>
						<Typography variant='h6'>{otherUser.name}</Typography>
						<Typography variant='body2' color='grey'>
							{otherUser.email}
						</Typography>
					</div>
				</Stack>
				<Stack gap='1rem' my='1rem' height='75%' overflow='auto'>
					{messages.map((msg) => {
						let isCurrentUserSender =
							msg.senderId === currentUser.uid
						const photoURL = isCurrentUserSender
							? currentUser.photoURL
							: otherUser.photoURL
						return (
							<Message
								isCurrentUserSender={isCurrentUserSender}
								photoURL={photoURL}
								text={msg.text}
								key={msg.id}
							/>
						)
					})}
				</Stack>
				<MessageInput
					text={text}
					setText={setText}
					handleSend={handleSend}
				/>
			</Paper>
		</Grid>
	)
}

export default ChatBox
