import { NightsStay, WbSunny } from '@mui/icons-material'
import { Stack, Switch } from '@mui/material'
import React from 'react'
import AppLogo from './AppLogo'
import UserInfo from './UserInfo'

const Navbar = ({ user, dispatch, darkMode }) => {
	return (
		<Stack
			direction='row'
			justifyContent='space-between'
			alignItems='center'
		>
			<AppLogo />
			<Stack direction='row' alignItems={'center'}>
				<Switch
					checked={darkMode}
					size='large'
					onChange={() => dispatch({ type: 'toggleDarkMode' })}
					checkedIcon={<NightsStay />}
					icon={<WbSunny color='warning' />}
				/>
				{user && <UserInfo user={user} dispatch={dispatch} />}
			</Stack>
		</Stack>
	)
}

export default Navbar
