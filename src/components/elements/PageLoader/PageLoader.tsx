import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const PageLoader: React.FC = () => {
	return (
		<Backdrop
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={true}
		>
			<CircularProgress />
		</Backdrop>
	)
}

export default PageLoader