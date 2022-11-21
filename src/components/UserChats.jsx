import { Box, Stack, Typography } from '@mui/material'
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
	const [chatList, setChatList] = useState([])

	const handleClick = (otherUser) => {
		const combinedId =
			currentUser.uid > otherUser.uid
				? currentUser.uid + otherUser.uid
				: otherUser.uid + currentUser.uid
		dispatch({
			type: 'changeUser',
			payload: { combinedId: combinedId, otherUser: otherUser },
		})
	}
	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'userChats', currentUser.uid),
			(snapshot) => {
				setChatList(Object.entries(snapshot.data()))
			}
		)
		return () => unsub
	}, [])
	return (
		<>
			<Typography variant='h5'>Recent Chats</Typography>
			<Stack gap={2} height='36vh' overflow='auto'>
				{chatList &&
					chatList.map((chat) => (
						<Stack
							key={chat[0]}
							gap='1rem'
							direction='row'
							onClick={() => handleClick(chat[1].otherUser)}
							sx={{ cursor: 'pointer' }}
						>
							<ProfileImg photoURL={chat[1].otherUser.photoURL} />
							<div>
								<Typography variant='body1'>
									{chat[1].otherUser.name}
								</Typography>
								<Typography
									variant='body2'
									color='grey'
									noWrap={false}
								>
									{chat[1].lastMessage}
								</Typography>
							</div>
						</Stack>
					))}
			</Stack>
		</>
	)
}

export default UserChats
