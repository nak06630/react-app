import { FormControl, FormLabel, FormControlLabel, FormHelperText, Radio, RadioGroup as MuiRadioGroup } from '@mui/material'
import type { RadioGroupProps as MuiRadioGroupProps } from '@mui/material'
import { useController } from 'react-hook-form'
import type { FieldValues, UseControllerProps } from 'react-hook-form'

// https://tech-blog.rakus.co.jp/entry/20221028/rhf

type RadioProps = {
  value: string
  label: string
}

type RadioGroupProps = MuiRadioGroupProps & {
  inputRef?: MuiRadioGroupProps['ref']
  errorMessage?: string
  radioPropsList: RadioProps[]
  label?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({ inputRef, radioPropsList, errorMessage, label, ...rest }: RadioGroupProps) => {
  return (
    <div>
      <FormControl error={!!errorMessage}>
        <FormLabel sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{label}</FormLabel>
        <MuiRadioGroup ref={inputRef} {...rest}>
          {radioPropsList.map((el) => (
            <FormControlLabel key={el.value} value={el.value} label={el.label} control={<Radio size="small" />} />
          ))}
        </MuiRadioGroup>
      </FormControl>
      {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </div>
  )
}

type NRadioGroupProps<T extends FieldValues> = RadioGroupProps & UseControllerProps<T>

export const NRadioGroup = <T extends FieldValues>(props: NRadioGroupProps<T>): JSX.Element => {
  const { name, control, label, ...rest } = props
  const {
    field: { ref, ...restControllerProps }
  } = useController<T>({ name, control })

  return <RadioGroup inputRef={ref} label={label} row {...restControllerProps} {...rest} />
}
