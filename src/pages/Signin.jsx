import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import React from 'react'
import GoogleButton from 'react-google-button'
import { auth } from '../../firebase'
import { Box, Grid, Stack, Typography } from '@mui/material'
import useIsMobile from '../components/hooks/useIsMobile'

const Signin = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth)
	document.title = 'Sign in to ChatsApp!!!'
	const isMobile = useIsMobile()
	return (
		<>
			<Grid container>
				<Grid item md={6} xs={12}>
					<Stack
						spacing={-10}
						direction={isMobile ? 'row' : 'column'}
						justifyContent='space-evenly'
					>
						<Box alignSelf='flex-start'>
							<object
								data='/assets/svg/girl_messaging.svg'
								width={250}
								style={{
									display: isMobile ? 'none' : 'block',
								}}
							></object>
						</Box>
						<Box alignSelf='center'>
							<object
								data='/assets/svg/both_messaging.svg'
								width={isMobile ? 200 : 250}
							></object>
						</Box>
						<Box alignSelf='flex-end'>
							<object
								data='/assets/svg/guy_messaging.svg'
								width={250}
								style={{
									display: isMobile ? 'none' : 'block',
								}}
							></object>
						</Box>
					</Stack>
				</Grid>
				<Grid item md={6} my={4}>
					<Typography variant='h4'>
						ChatsApp - Fun, Easy, Social.
					</Typography>
					<Typography variant='subtitle1' my={2}>
						Chatsapp is a realtime web-based chat application that
						allows you to chat with your friends in real time.
						Chatsapp is very user friendly and easy to use. You can
						create a new account within seconds and start chatting
						with your friends right away. Chatsapp is a great way to
						stay connected with your loved ones.
					</Typography>
					<Box>
						<GoogleButton onClick={() => signInWithGoogle()} />
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

export default Signin
