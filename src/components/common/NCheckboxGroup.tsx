import { Checkbox, FormLabel, FormControlLabel, FormGroup, FormHelperText } from '@mui/material'
import type { FormGroupProps } from '@mui/material'
import { useController } from 'react-hook-form'
import type { FieldValues, UseControllerProps } from 'react-hook-form'

// https://tech-blog.rakus.co.jp/entry/20221028/rhf

type CheckboxProps = {
  value: string
  label: string
}

type CheckboxGroupProps = FormGroupProps & {
  inputRef?: FormGroupProps['ref']
  errorMessage?: string
  checkBoxPropsList: CheckboxProps[]
  checkedValues: string[]
  label: string
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ inputRef, checkBoxPropsList, checkedValues, label, errorMessage, ...rest }: CheckboxGroupProps) => {
  return (
    <div>
      <FormLabel sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{label}</FormLabel>
      <FormGroup ref={inputRef} {...rest}>
        {checkBoxPropsList.map((props) => (
          <FormControlLabel
            key={props.value}
            control={<Checkbox size="small" value={props.value} checked={checkedValues.includes(props.value)} />}
            label={props.label}
          />
        ))}
      </FormGroup>
      {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </div>
  )
}

type NCheckboxGroupProps<T extends FieldValues> = Omit<CheckboxGroupProps, 'checkedValues'> & UseControllerProps<T>

export const NCheckboxGroup = <T extends FieldValues>(props: NCheckboxGroupProps<T>): JSX.Element => {
  const { name, control, label } = props
  const {
    field: { ref, onChange, value: checkedValues, ...rest },
    fieldState: { error }
  } = useController<T>({ name, control })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCheckedValueList: string[] = []
    if (e.target.checked) {
      // チェックボックスがチェックされた時、チェックされた値を重複値の無い配列に追加
      newCheckedValueList = [...new Set([...checkedValues, e.target.value])]
    } else {
      // チェックボックスが外された時は、チェックが外された値を配列から削除
      newCheckedValueList = [...checkedValues].filter((value) => value !== e.target.value)
    }
    return newCheckedValueList
  }

  return (
    <CheckboxGroup
      inputRef={ref}
      row
      label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(handleChange(e))}
      {...rest}
      checkBoxPropsList={props.checkBoxPropsList}
      checkedValues={[...checkedValues]}
      errorMessage={(error && error.message) || props.errorMessage}
    />
  )
}
