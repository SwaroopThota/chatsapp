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
		data: { otherUser, chatId },
		dispatch: chatDispatch,
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
		await updateDoc(doc(db, 'chats', chatId), {
			messages: arrayUnion({
				id: v4(),
				senderId: currentUser.uid,
				text: t,
				date: Timestamp.now(),
			}),
		})
		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[chatId + '.lastMessage']: t,
			[chatId + '.date']: serverTimestamp(),
		})
		await updateDoc(doc(db, 'userChats', otherUser.uid), {
			[chatId + '.lastMessage']: t,
			[chatId + '.date']: serverTimestamp(),
		})
	}
	const getMsgProps = (msg) => {
		let isCurrentUserSender = msg.senderId === currentUser.uid
		const photoURL = isCurrentUserSender
			? currentUser.photoURL
			: otherUser.photoURL
		return {
			isCurrentUserSender,
			photoURL,
			text: msg.text,
			key: msg.id,
		}
	}
	useEffect(() => {
		if (!chatId) return
		const unsub = onSnapshot(doc(db, 'chats', chatId), (snapshot) => {
			setMessages(snapshot.data().messages)
		})
		return unsub
	}, [chatId])

	useEffect(() => chatDispatch({ type: 'remove_chat' }), [])

	return chatId ? (
		<Grid item lg={8} md={6} xs={12} height='100%'>
			<Paper sx={{ height: '100%', p: 1, borderRadius: 3 }}>
				<Stack gap={'1rem'} direction={'row'}>
					<ProfileImg photoURL={otherUser.photoURL} />
					<div>
						<Typography
							variant='body1'
							textTransform={'capitalize'}
						>
							{otherUser.name.toLowerCase()}
						</Typography>
						<Typography variant='body2' color='grey'>
							@{otherUser.email.split('@')[0]}
						</Typography>
					</div>
				</Stack>
				<Stack gap='1rem' my='1rem' height='75%' overflow='auto'>
					{messages.map((msg) => {
						return <Message {...getMsgProps(msg)} />
					})}
				</Stack>
				<MessageInput
					text={text}
					setText={setText}
					handleSend={handleSend}
				/>
			</Paper>
		</Grid>
	) : (
		<></>
	)
}

export default ChatBox
