import { BOOKS } from '@/constans/api.const'
import useApi from '@/hooks/useApi'
import useApiMutation from '@/hooks/useApiMutation'
import useApiMutationID from '@/hooks/useApiMutationID'
import { IBook, IBookData } from '@/types/book.type'
import { ISetState, IVoid, } from '@/types/helper.type'
import { parseDataArray } from '@/utils/methods'
import { queryClient } from '@/utils/props'
import { AccessTimeFilled, Close, MenuBook, Person, Save, Search } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Modal, Paper, InputAdornment, TextField, IconButton, CircularProgress, List, ListItem, Typography, Grid } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect, useMemo, useState } from 'react'
import SearchItem from './SearchItem'

interface Props {
	onClose: ISetState<boolean>
	refetch: IVoid
}


const SearchModal: React.FC<Props> = ({ onClose, refetch }) => {

	const [value, setValue] = useState("")
	const [lastVal, setLastVal] = useState("")

	const { data, isLoading, isFetching } = useApi(`${BOOKS}/${lastVal}`, { suspense: false, enabled: Boolean(lastVal) })

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			setLastVal(value)
		}, 500)
		return () => {
			clearTimeout(delayDebounceFn)
		}
	}, [value])

	useEffect(() => {
		return () => refetch()
	}, [])

	const books: IBook[] = useMemo(() => {
		return value ? parseDataArray(data) : []
	}, [data, value])

	const handleClose = () => {
		onClose(false)
	}

	const handleClear = () => {
		setValue("")
		setLastVal("")
	}

	const paperStyle = {
		height: "80vh",
		width: "80%",
		maxWidth: 700,
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%,-50%)"
	}

	return (
		<Modal open={true} onClose={handleClose} >
			<Paper sx={paperStyle}>
				<Box sx={{ p: 4 }}>
					<TextField
						label="Search by title books"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						size="medium"
						sx={{ mb: 2 }}
						InputProps={{
							startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
							endAdornment: <InputAdornment position="end">
								{
									(isLoading || isFetching) ? <CircularProgress size={20} /> : (value && <IconButton onClick={handleClear}><Close /></IconButton>)
								}
							</InputAdornment>
						}}
					/>
					<div>
						<Box sx={{ height: "calc(80vh - 120px)", overflowY: "auto" }}>
							{
								books.map((item, index) => (
									<ListItem key={index}>
										<SearchItem item={item} />
									</ListItem>
								))
							}
						</Box>
					</div>
				</Box>
			</Paper>
		</Modal>
	)
}

export default SearchModal