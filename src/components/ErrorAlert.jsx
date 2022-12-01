import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useUserContext } from '../context/UserContext'

export default function ErrorAlert() {
	const { dispatch } = useUserContext()
	const [open, setOpen] = useState(true)
	return (
		<Collapse in={open}>
			<Alert
				action={
					<IconButton
						aria-label='close'
						color='inherit'
						size='small'
						onClick={() => {
							dispatch({ type: 'hideError' })
							setOpen(false)
						}}
					>
						<CloseIcon fontSize='inherit' />
					</IconButton>
				}
				variant='outlined'
				severity='error'
			>
				Something went wrong!
			</Alert>
		</Collapse>
	)
}
