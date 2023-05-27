import React from 'react'
import { Link, Typography } from '@mui/material';

const Copyright: React.FC<any> = (props) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://devnodir.uz/">
				DEVNODIR
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default Copyright