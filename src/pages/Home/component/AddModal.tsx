import TextField from '@/components/form/TextField/TextField'
import { BOOKS } from '@/constans/api.const'
import { ISBN_PATTERN } from '@/constans/pattern.const'
import useApiMutation from '@/hooks/useApiMutation'
import { ISetState, IVoid, } from '@/types/helper.type'
import { LoadingButton } from '@mui/lab'
import { Box, Typography, Drawer } from '@mui/material'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	onClose: ISetState<boolean>
	refetch: IVoid
}

interface IFormData {
	isbn: string
}

const AddModal: React.FC<Props> = ({ onClose, refetch }) => {

	const { enqueueSnackbar } = useSnackbar();

	const { control, handleSubmit } = useForm<IFormData>()

	const { mutate, isLoading } = useApiMutation(BOOKS)

	const handleClose = () => {
		onClose(false)
	}

	const submit = (formData: IFormData) => {
		mutate(formData, {
			onSuccess: (res) => {
				handleClose()
				refetch()
				enqueueSnackbar("Successfully added", { variant: "success" })
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
					Add new book
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
					<LoadingButton
						loading={isLoading}
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 3, mb: 2 }}
					>
						Add
					</LoadingButton>
				</Box>
			</Box>
		</Drawer>
	)
}

export default AddModal