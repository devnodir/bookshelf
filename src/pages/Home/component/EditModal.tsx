import TextField from '@/components/form/TextField/TextField'
import { BOOKS } from '@/constans/api.const'
import { ISBN_PATTERN } from '@/constans/pattern.const'
import useApiMutation from '@/hooks/useApiMutation'
import useApiMutationID from '@/hooks/useApiMutationID'
import { IBook } from '@/types/book.type'
import { ISetState, IVoid, } from '@/types/helper.type'
import { LoadingButton } from '@mui/lab'
import { Box, Typography, Drawer } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	onClose: ISetState<boolean>
	refetch: IVoid
	item: IBook
}

interface IFormData {
	isbn: string
	title: string
	author: string
	published: string | number
	pages: string | number
	status: string | number
}

const EditModal: React.FC<Props> = ({ onClose, refetch, item }) => {

	const { enqueueSnackbar } = useSnackbar();

	const { control, handleSubmit, reset } = useForm<IFormData>()

	const { mutate, isLoading } = useApiMutationID("patch", BOOKS)

	useEffect(() => {
		reset({
			isbn: item.isbn,
			title: item.title,
			author: item.author,
			published: item.published,
			pages: item.pages,
			status: item.status
		})
	}, [item])

	const handleClose = () => {
		onClose(false)
	}

	const submit = ({ status, ...formData }: IFormData) => {
		const data = {
			book: formData,
			status: parseFloat(status)
		}
		mutate({ data, id: item.id }, {
			onSuccess: (res) => {
				handleClose()
				refetch()
				enqueueSnackbar("Successfully updated", { variant: "success" })
			},
			onError: (err) => {
				enqueueSnackbar(err?.message, { variant: "error" })
			}
		})
	};

	return (
		<Drawer open={true} onClose={handleClose} anchor="right" PaperProps={{ sx: { width: 400 } }}>
			<Box sx={{ p: 4 }}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Edit book
				</Typography>
				<Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1, width: "100%" }}>
					<TextField
						margin="normal"
						label="ISBN"
						name="isbn"
						autoFocus
						control={control}
						rules={{ pattern: { value: ISBN_PATTERN, message: "Please enter correct isbn" }, required: true }}
					/>
					<TextField
						margin="normal"
						label="Title"
						name="title"
						control={control}
						rules={{ required: "Please enter title" }}
					/>
					<TextField
						margin="normal"
						label="Author"
						name="author"
						control={control}
						rules={{ required: "Please enter athor" }}
					/>
					<TextField
						margin="normal"
						label="Pages"
						name="pages"
						type="number"
						control={control}
						rules={{ required: "Please enter pages", valueAsNumber: true }}
					/>
					<TextField
						margin="normal"
						label="Published"
						name="published"
						control={control}
						type="number"
						rules={{ required: "Please enter published", valueAsNumber: true }}
					/>
					<TextField
						margin="normal"
						label="Status"
						name="status"
						control={control}
						type="number"
						rules={{ required: "Please enter published", valueAsNumber: true }}
					/>
					<LoadingButton
						loading={isLoading}
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 3, mb: 2 }}
					>
						UPDATE
					</LoadingButton>
				</Box>
			</Box>
		</Drawer>
	)
}

export default EditModal