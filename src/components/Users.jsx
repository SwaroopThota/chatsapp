import { Send } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
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
		const combinedId =
			currentUser.uid > otherUser.uid
				? currentUser.uid + otherUser.uid
				: otherUser.uid + currentUser.uid
		let querySnapshot = await getDoc(doc(db, 'chats', combinedId))
		if (!querySnapshot.exists()) {
			await setDoc(doc(db, 'chats', combinedId), { messages: [] })
			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[combinedId]: {
					otherUser: otherUser,
					date: serverTimestamp(),
					lastMessage: '',
				},
			})
			await updateDoc(doc(db, 'userChats', otherUser.uid), {
				[combinedId]: {
					otherUser: currentUser,
					date: serverTimestamp(),
					lastMessage: '',
				},
			})
		}
		dispatch({
			type: 'changeUser',
			payload: { combinedId: combinedId, otherUser: otherUser },
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
		<>
			<Typography variant='h5'>Users</Typography>
			<Stack gap={2} height='36vh' overflow='auto'>
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
							<Button
								variant='outlined'
								color='info'
								onClick={() => handleClick(user)}
								startIcon={<Send />}
							>
								Message
							</Button>
						</Box>
					</Stack>
				))}
			</Stack>
		</>
	)
}

export default Users
