import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Card, CardHeader, CardContent, CardActions, styled, Button, Stack } from '@mui/material'
import { NTextField } from '@/components/common/NTextField'
import { NRadioGroup } from '@/components/common/NRadioGroup'
import { NSelect } from '@/components/common/NSelect'
import { NCheckboxGroup } from '@/components/common/NCheckboxGroup'

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
  width: '100%',
  padding: '16px'
})

const schema = yup.object().shape({
  text1: yup.string().email('⚠ メールアドレス形式で入力してください').required('⚠ メールアドレスを入力してください'),
  radio1: yup.string().required('2'), // でない
  select1: yup.string().required('3'), // でない
  checkbox1: yup.array().min(1, '⚠ 1つ以上選択してください')
})

type Inputs = {
  text1: string
  radio1: string
  select1: string
  checkbox1: string[]
}

const defaultValues: Inputs = {
  text1: '',
  radio1: 'apple',
  select1: 'apple2',
  checkbox1: []
}

const radio1_props = [
  { label: 'りんご', value: 'apple' },
  { label: 'みかん', value: 'orange' },
  { label: 'ばなな', value: 'banana' }
]

const select1_props = [
  { label: 'りんご2', value: 'apple2' },
  { label: 'みかん2', value: 'orange2' },
  { label: 'ばなな2', value: 'banana2' }
]

const checkbox1_props = [
  { label: 'りんご3', value: 'apple3' },
  { label: 'みかん3', value: 'orange3' },
  { label: 'ばなな3', value: 'banana3' }
]

export default function Forms() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    window.alert(JSON.stringify(data, null, 2))
  }

  return (
    <Card sx={{ maxWidth: 400, m: 5 }}>
      <CardHeader title="Formサンプル" subheader="sample" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Stack spacing={3}>
            <NTextField label="メールアドレス" name="text1" control={control} fullWidth />
            <NRadioGroup label="らじお" name="radio1" control={control} radioPropsList={radio1_props} />
            <NSelect label="せれくと" name="select1" control={control} selectPropsList={select1_props} />
            <NCheckboxGroup label="ちぇっくぼっくす" name="checkbox1" control={control} checkBoxPropsList={checkbox1_props} />
          </Stack>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained">
            送信
          </Button>
          <Button onClick={() => reset()}>リセット</Button>
        </CardActions>
      </Form>
    </Card>
  )
}
