import { IChildren } from '@/types/helper.type'
import React, { Fragment } from 'react'
import Navbar from './Navbar'

interface Props {
	children: IChildren
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<Fragment>
			<Navbar />
			{children}
		</Fragment>
	)
}

export default Layout