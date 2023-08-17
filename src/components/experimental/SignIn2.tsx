import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Avatar, Box, Button, Checkbox, Grid, Link, Paper, Stack, Typography } from '@mui/material'
import { FormGroup, FormControlLabel, FormHelperText } from '@mui/material'
import { NTextField } from '@/components/common/NTextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { teal } from '@mui/material/colors'

const schema = yup.object().shape({
  id: yup.string().required('⚠ ユーザーIDが入力されていません。'),
  pass: yup.string().required('⚠ パスワードが入力されていません。'),
  checkbox: yup.boolean().required()
})

interface Inputs {
  id: string
  pass: string
  checkbox: boolean
}

const defaultValues: Inputs = { id: '', pass: '', checkbox: true }

export default function SignIn2() {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    window.alert(JSON.stringify(data, null, 2))
  }

  return (
    <Grid>
      <Paper elevation={3} sx={{ p: 4, width: '380px', m: '20px auto' }}>
        <Grid container direction="column" alignItems="center">
          <Avatar sx={{ bgcolor: teal[400] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant={'h5'} sx={{ m: '30px' }}>
            Sign In
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <NTextField label="ユーザーID" placeholder="user@example.com" name="id" fullWidth control={control} />
            <NTextField label="パスワード" type="password" name="pass" fullWidth control={control} />
          </Stack>

          <Controller
            name="checkbox"
            control={control}
            render={({ field, formState: { errors } }) => (
              <FormGroup {...field}>
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox name="check" size="small" color="primary" defaultChecked={defaultValues.checkbox} />}
                  label={<Typography variant="caption">パスワードを忘れました</Typography>}
                  value={field.value}
                />
                <FormHelperText>{errors.checkbox?.message || ''}</FormHelperText>
              </FormGroup>
            )}
          />
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              サインイン
            </Button>

            <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography>
            <Typography variant="caption" display="block">
              アカウントを持っていますか？
              <Link href="#">アカウントを作成</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Grid>
  )
}
