import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import React from 'react'
import GoogleButton from 'react-google-button'
import { auth } from '../../firebase'
import {
	Box,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import AppLogo from '../components/AppLogo'

const Signin = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth)
	document.title = 'SignIn to ChatsApp'
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	return (
		<>
			<AppLogo />
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
					<Typography variant='h4'>Lorem, ipsum dolor.</Typography>
					<Typography variant='subtitle1' my={2}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Vel labore sed eos provident maiores aut nostrum
						asperiores possimus obcaecati iure deleniti quisquam, ad
						expedita delectus quod autem soluta suscipit. Numquam?
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
