import { Box, Divider, Stack, Typography } from '@mui/material'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useChatContext } from '../context/ChatContext'
import { useUserContext } from '../context/UserContext'
import ProfileImg from './ProfileImg'

const UserChats = () => {
	const {
		data: { user: currentUser },
	} = useUserContext()
	const { dispatch } = useChatContext()
	const [chats, setChats] = useState(null)

	const handleClick = (otherUser) => {
		const chatId =
			currentUser.uid > otherUser.uid
				? currentUser.uid + otherUser.uid
				: otherUser.uid + currentUser.uid
		dispatch({
			type: 'change_chat',
			payload: {
				chatId,
				otherUser,
			},
		})
	}

	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'userChats', currentUser.uid),
			(snapshot) => {
				if (snapshot.exists()) {
					let arr = Object.entries(snapshot.data()).sort(
						(a, b) => b[1].date - a[1].date
					)
					setChats(arr)
				}
			}
		)
		return unsub
	}, [])
	return (
		chats && (
			<Box height='50%'>
				<Typography variant='h5'>Recent Chats</Typography>
				<Divider
					sx={{
						my: 2,
					}}
				/>
				<Stack gap={2} height='75%' overflow='auto'>
					{chats.map((chat) => (
						<Chat
							handleClick={handleClick}
							chat={chat}
							key={chat[0]}
						/>
					))}
				</Stack>
			</Box>
		)
	)
}

export default UserChats

function Chat({ handleClick, chat }) {
	return (
		<Stack
			gap='1rem'
			direction='row'
			onClick={() => handleClick(chat[1].otherUser)}
			sx={{
				cursor: 'pointer',
			}}
		>
			<ProfileImg photoURL={chat[1].otherUser.photoURL} />
			<div>
				<Typography variant='body1' textTransform={'capitalize'}>
					{chat[1].otherUser.name.split(' ')[0].toLowerCase()}
				</Typography>
				<Typography variant='body2' color='grey' noWrap={false}>
					{chat[1].lastMessage}
				</Typography>
			</div>
		</Stack>
	)
}
