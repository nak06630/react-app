import { FormHelperText, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

// https://tech-blog.rakus.co.jp/entry/20221028/rhf

type TextFieldProps = MuiTextFieldProps & {
  inputRef?: MuiTextFieldProps['ref']
  errorMessage?: string
}

const TextField: React.FC<TextFieldProps> = ({ inputRef, errorMessage, ...rest }: TextFieldProps) => {
  return (
    <div>
      <MuiTextField ref={inputRef} error={!!errorMessage} {...rest} />
      {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </div>
  )
}

type NTextFieldProps<T extends FieldValues> = TextFieldProps & UseControllerProps<T>

export const NTextField = <T extends FieldValues>(props: NTextFieldProps<T>) => {
  const { name, control } = props
  const {
    field: { ref, ...rest },
    fieldState: { error }
  } = useController<T>({ name, control })

  return <TextField inputRef={ref} size="small" {...rest} {...props} errorMessage={(error && error.message) || props.errorMessage} />
}
