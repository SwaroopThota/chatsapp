import { NightsStay, WbSunny } from '@mui/icons-material'
import {
	Button,
	IconButton,
	Paper,
	Stack,
	Switch,
	Typography,
} from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import AppLogo from './AppLogo'
import ProfileImg from './ProfileImg'
import useIsMobile from './hooks/useIsMobile'

const Navbar = ({ user, dispatch }) => {
	return (
		<Stack
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			py={2}
		>
			<AppLogo />
			{user && <UserInfo user={user} dispatch={dispatch} />}
		</Stack>
	)
}

const UserInfo = ({ user, dispatch }) => {
	const isMobile = useIsMobile()
	const handleSignOut = () => {
		dispatch({ type: 'signOutUser' })
	}
	return (
		<Paper elevation={2} sx={{ p: 1, borderRadius: 4 }}>
			<Stack gap={1} direction='row' alignItems='center'>
				<ProfileImg photoURL={user.photoURL} />
				<div>
					{!isMobile && (
						<Typography
							variant='body1'
							textTransform={'capitalize'}
						>
							{user.name.split(' ')[0].toLowerCase()}
						</Typography>
					)}
					{isMobile ? (
						<IconButton onClick={handleSignOut} color='error'>
							<LogoutIcon />
						</IconButton>
					) : (
						<Button
							variant='outlined'
							color='error'
							size='small'
							onClick={handleSignOut}
							startIcon={<LogoutIcon />}
						>
							Logout
						</Button>
					)}
				</div>
			</Stack>
		</Paper>
	)
}

export default Navbar
