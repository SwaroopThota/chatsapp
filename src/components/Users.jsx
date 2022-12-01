import { Send } from '@mui/icons-material'
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useChatContext } from '../context/ChatContext'
import { useUserContext } from '../context/UserContext'
import ProfileImg from './ProfileImg'

const Users = () => {
	const {
		data: { user: currentUser },
	} = useUserContext()
	const { dispatch } = useChatContext()
	const [usersList, setUsersList] = useState([])

	const handleClick = async (otherUser) => {
		const chatId =
			currentUser.uid > otherUser.uid
				? currentUser.uid + otherUser.uid
				: otherUser.uid + currentUser.uid
		let querySnapshot = await getDoc(doc(db, 'chats', chatId))
		if (!querySnapshot.exists()) {
			await setDoc(doc(db, 'chats', chatId), { messages: [] })
			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[chatId]: {
					otherUser: otherUser,
					date: serverTimestamp(),
					lastMessage: '',
				},
			})
			await updateDoc(doc(db, 'userChats', otherUser.uid), {
				[chatId]: {
					otherUser: currentUser,
					date: serverTimestamp(),
					lastMessage: '',
				},
			})
		}
		dispatch({
			type: 'change_user',
			payload: { chatId, otherUser: otherUser },
		})
	}

	useEffect(() => {
		const q = query(
			collection(db, 'users'),
			where('uid', '!=', currentUser.uid)
		)
		const unsub = onSnapshot(q, (querySnapshot) => {
			const newUsersList = []
			querySnapshot.forEach((doc) => newUsersList.push(doc.data()))
			setUsersList(newUsersList)
		})
		return unsub
	}, [])

	return (
		<Box height='50%'>
			<Typography variant='h5'>Users</Typography>
			<Divider sx={{ my: 2 }} />
			<Stack gap={2} height='75%' overflow='auto'>
				{usersList.map((user) => (
					<Stack
						key={user.uid}
						gap={2}
						direction='row'
						alignItems='center'
					>
						<ProfileImg photoURL={user.photoURL} />
						<div>
							<Typography variant='body1'>{user.name}</Typography>
							<Typography variant='body2' color='grey'>
								{user.email}
							</Typography>
						</div>
						<Box ml='auto'>
							<IconButton
								variant='outlined'
								size='large'
								color='primary'
								onClick={() => handleClick(user)}
							>
								<Send fontSize='inherit' />
							</IconButton>
						</Box>
					</Stack>
				))}
			</Stack>
		</Box>
	)
}

export default Users
