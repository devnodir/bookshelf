import { BOOKS } from '@/constans/api.const'
import useApiMutation from '@/hooks/useApiMutation'
import { IBook } from '@/types/book.type'
import { Save, AccessTimeFilled, Person } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

interface Props {
	item: IBook
}


const SearchItem: React.FC<Props> = ({ item }) => {

	const { enqueueSnackbar } = useSnackbar();

	const [isSaved, setSaved] = useState(false)

	const { mutate, isLoading } = useApiMutation(BOOKS)

	const handleSave = () => {
		mutate({ isbn: item.isbn }, {
			onSuccess: (res) => {
				setSaved(true)
			},
			onError: (err) => {
				enqueueSnackbar(err?.message, { variant: "error" })
			}
		})
	}

	return (
		<Box sx={{ bgcolor: grey[800], width: "100%", p: 1, borderRadius: 2 }}>
			<Grid container>
				<Grid item lg={10}>
					<Typography variant='body1' sx={{ width: "100%" }}>{item.title}</Typography>
					<Box display="flex" gap={2}>
						<Box display="flex" alignItems="center">
							<Person sx={{ mr: 1, fontSize: 14 }} />
							<Typography variant='caption'>{item.author}</Typography>
						</Box>
						<Box display="flex" alignItems="center">
							<AccessTimeFilled sx={{ mr: 1, fontSize: 14 }} />
							<Typography variant='caption'>{item.published}</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item lg={2} display="flex" alignItems="center" justifyContent="end">
					<LoadingButton disabled={isSaved} loading={isLoading} startIcon={<Save />} onClick={handleSave}>{isSaved ? "Saved" : "Save"}</LoadingButton>
				</Grid>
			</Grid>
		</Box>
	)
}

export default SearchItem