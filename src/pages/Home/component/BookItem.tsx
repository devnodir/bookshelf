import React from 'react'
import { Card, CardMedia, Typography, CardActions, Button, List, ListItem } from '@mui/material'
import { IBook } from '@/types/book.type'
import { Person, MenuBook, AccessTimeFilled, QrCode2, Create, Delete } from '@mui/icons-material'
import useApiMutationID from '@/hooks/useApiMutationID'
import { BOOKS } from '@/constans/api.const'
import { useSnackbar } from 'notistack'
import { LoadingButton } from '@mui/lab'
import { IVoid } from '@/types/helper.type'

interface Props {
	item: IBook,
	onEdit: (id: IBook) => void
	refetch: IVoid
}

const BookItem: React.FC<Props> = ({ item, onEdit, refetch }) => {

	const { mutate, isLoading } = useApiMutationID("delete", BOOKS)
	const { enqueueSnackbar } = useSnackbar();


	const handleEdit = () => {
		onEdit(item)
	}

	const handleDelete = () => {
		mutate({ id: item.id }, {
			onSuccess: (res) => {
				refetch()
				enqueueSnackbar("Successfully deleted", { variant: "success" })
			},
			onError: (err) => {
				enqueueSnackbar(err?.message, { variant: "error" })
			}
		})
	}

	return (
		<Card
			sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
		>
			<CardMedia
				component="div"
				sx={{
					height: 250
				}}
			>
				<img src={item.cover || "/assets/no-image.png"} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
			</CardMedia>
			<List sx={{ flexGrow: 1 }}>
				<ListItem>
					<Typography variant="body2">{item.title}</Typography>
				</ListItem>
				<ListItem>
					<Person sx={{ mr: 1 }} />
					<Typography variant="caption">{item.author}</Typography>
				</ListItem>
				<ListItem>
					<MenuBook sx={{ mr: 1 }} />
					<Typography variant="caption">Pages: {item.pages}</Typography>
				</ListItem>
				<ListItem>
					<AccessTimeFilled sx={{ mr: 1 }} />
					<Typography variant="caption">Published: {item.published}</Typography>
				</ListItem>
				<ListItem>
					<QrCode2 sx={{ mr: 1 }} />
					<Typography variant="caption">ISBN: {item.isbn}</Typography>
				</ListItem>
			</List>
			<CardActions>
				<Button size="small" startIcon={<Create />} onClick={handleEdit}>Edit</Button>
				<LoadingButton loading={isLoading} size="small" startIcon={<Delete />} onClick={handleDelete} color='error'>Delete</LoadingButton>
			</CardActions>
		</Card>
	)
}

export default BookItem