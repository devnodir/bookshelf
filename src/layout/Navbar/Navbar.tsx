import React from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { ImportContacts, Logout } from '@mui/icons-material'
import { removeLocalStorage } from '@/utils/localStorage'
import { USER_KEY, USER_SECRET } from '@/constans/general.const'
import useAppSelector from '@/hooks/useAppSelector'

const Navbar: React.FC = () => {

	const { userData } = useAppSelector(({ auth }) => auth)

	const logout = () => {
		removeLocalStorage(USER_KEY)
		removeLocalStorage(USER_SECRET)
		window.location.reload()
	}

	return (
		<AppBar position="relative">
			<Toolbar>
				<ImportContacts sx={{ mr: 2 }} />
				<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
					Bookshelf
				</Typography>
				<Box display="flex" flexDirection="column">
					<Typography variant="body2">
						{userData?.name}
					</Typography>
					<Typography variant="caption" sx={{ textAlign: "right" }}>
						{userData?.email}
					</Typography>
				</Box>
				<IconButton color="error" onClick={logout} sx={{ ml: 2 }}>
					<Logout />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar