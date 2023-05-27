import { TextField as Input, BaseTextFieldProps } from "@mui/material";
import { useController, RegisterOptions, FieldValues, Control, Path } from "react-hook-form";

interface Props<T extends FieldValues = any> extends BaseTextFieldProps {
	control: Control<T>
	name: Path<T>
	rules?: RegisterOptions
}

function TextField<T extends FieldValues>({ control, name, rules, ...props }: Props<T>) {

	const { field, fieldState: { error }, } = useController({ name, control, rules, });

	return (
		<Input
			onChange={field.onChange}
			onBlur={field.onBlur}
			value={field.value}
			name={field.name}
			inputRef={field.ref}
			error={Boolean(error)}
			helperText={error?.message}
			{...props}
		/>
	);
}

export default TextField