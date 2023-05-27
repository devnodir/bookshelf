import theme from '@/theme';
import { IChildren } from '@/types/helper.type'
import { ThemeProvider as MUThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react'

interface Props {
	children: IChildren
}

const ThemeProvider: React.FC<Props> = ({ children }) => {

	return (
		<MUThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MUThemeProvider>
	)
}

export default ThemeProvider