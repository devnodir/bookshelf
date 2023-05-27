import * as React from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography } from '@mui/material';
import { IChildren } from '@/types/helper.type';

interface Props {
	children: IChildren
}

const Wrapper: React.FC<Props> = ({ children }) => {

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={8}
				sx={{
					backgroundImage: 'url(/assets/login.webp)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1 }}>
						<img src="/assets/logo.png" alt="" style={{ width: "100%" }} />
					</Avatar>
					<Typography component="h1" variant="h5">
						Welcome to Bookshelf
					</Typography>
					{children}
				</Box>
			</Grid>
		</Grid>
	);
}

export default Wrapper