/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import type { SelectProps as MuiSelectProps } from '@mui/material'
import { useController } from 'react-hook-form'
import type { FieldValues, UseControllerProps } from 'react-hook-form'

// https://tech-blog.rakus.co.jp/entry/20221028/rhf

type SelectProps = {
  label: string
  value: string
}

type SelectFormProps = MuiSelectProps & {
  inputRef?: MuiSelectProps['ref']
  errorMessage?: string
  selectPropsList: SelectProps[]
  selectedValue: string
}

const SelectForm: React.FC<SelectFormProps> = ({ inputRef, errorMessage, selectPropsList, selectedValue, label, ...rest }) => {
  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>{label}</InputLabel>
        <Select ref={inputRef} value={selectedValue} label={label} data-testid={label} {...rest}>
          {selectPropsList.map((props) => (
            <MenuItem key={props.value} value={props.value}>
              {props.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </div>
  )
}

type NSelectFormProps<T extends FieldValues> = Omit<SelectFormProps, 'selectedValue'> & UseControllerProps<T>

export const NSelect = <T extends FieldValues>(props: NSelectFormProps<T>): JSX.Element => {
  const { name, control } = props
  const {
    field: { ref, onChange, value: selectedValue, ...rest },
    fieldState: { error }
  } = useController<T>({ name, control })

  return (
    <SelectForm
      inputRef={ref}
      size="small"
      onChange={(e) => onChange(e)}
      {...rest}
      {...props}
      selectedValue={selectedValue}
      errorMessage={(error && error.message) || props.errorMessage}
    />
  )
}
