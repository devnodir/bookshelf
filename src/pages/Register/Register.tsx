import * as React from 'react';
import { Button, Box } from '@mui/material';
import Copyright from '@/components/elements/Copyright/Copyright';
import { useForm } from 'react-hook-form';
import TextField from '@/components/form/TextField/TextField';
import Wrapper from './component/Wrapper';
import useApiMutation from '@/hooks/useApiMutation';
import { SIGN_UP } from '@/constans/api.const';
import { setIsAuth, setUserData } from '@/utils/dispatch';
import { setLocalStorage } from '@/utils/localStorage';
import { USER_KEY, USER_SECRET } from '@/constans/general.const';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

interface IFormData {
	name: string
	email: string
	key: string
	secret: string
}

const Register: React.FC = () => {

	const { enqueueSnackbar } = useSnackbar();

	const { control, handleSubmit } = useForm<IFormData>()

	const { mutate, isLoading } = useApiMutation(SIGN_UP)

	const submit = (formData: IFormData) => {
		mutate(formData, {
			onSuccess: (res) => {
				setIsAuth(true)
				setUserData(res.data)
				setLocalStorage(USER_KEY, formData[USER_KEY])
				setLocalStorage(USER_SECRET, formData[USER_SECRET])
				enqueueSnackbar("Successfully registered", { variant: "success" })
			},
			onError: (err) => {
				enqueueSnackbar(err?.message, { variant: "error" })
			}
		})
	};

	return (
		<Wrapper>
			<Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1, width: "80%" }}>
				<TextField
					margin="normal"
					label="Full name"
					name="name"
					autoComplete="name"
					autoFocus
					control={control}
					rules={{ required: "Please enter your name" }}
				/>
				<TextField
					margin="normal"
					label="Email"
					name="email"
					autoComplete="email"
					control={control}
					rules={{ required: "Please enter your email" }}
				/>
				<TextField
					margin="normal"
					label="Your key"
					name="key"
					control={control}
					rules={{ required: "Please enter your key" }}
				/>
				<TextField
					margin="normal"
					label="Your secret"
					name="secret"
					autoComplete="email"
					control={control}
					rules={{ required: "Please enter your secret" }}
				/>
				<LoadingButton
					loading={isLoading}
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					sx={{ mt: 3, mb: 2 }}
				>
					Submit
				</LoadingButton>
				<Copyright sx={{ mt: 5 }} />
			</Box>
		</Wrapper>
	);
}

export default Register