import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Grid, Alert, Button, Card, CardContent, CardHeader, Dialog, TextField, FormControlLabel, Checkbox, Typography, CardActions } from '@mui/material'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'
import QRCode from 'qrcode.react'

Auth.configure(awsconfig)

interface FormInput {
  code: string
  enable: boolean
}

const schema = yup.object({
  code: yup.string().required().min(6, '6桁の数字を入力してください').max(6, '6桁の数字を入力してください'),
  enable: yup.boolean().required()
})

export default function DialogMFASetup(props: { open: boolean; onClose: () => void }) {
  const { open, onClose } = props
  const [user] = useRecoilState(userState)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    async function fetchData() {
      const currUser = await Auth.currentAuthenticatedUser()
      if (!currUser) return
      const data = await Auth.setupTOTP(currUser)
      setToken('otpauth://totp/ReactApp:' + user?.id + '?secret=' + data + '&issuer=ReactApp')
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (open) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!user) return
    const { code, enable } = data
    try {
      const currUser = await Auth.currentAuthenticatedUser()
      await Auth.verifyTotpToken(currUser, code)
      console.log(enable)
      if (enable) {
        await Auth.setPreferredMFA(currUser, 'TOTP')
      } else {
        await Auth.setPreferredMFA(currUser, 'NOMFA')
      }
      setIsSuccess(true)
    } catch (error: any) {
      setIsAlert(true)
      const { code, message }: { code?: string; message?: string } = error
      switch (code) {
        case 'EnableSoftwareTokenMFAException':
          setError('無効なコードが入力されました。')
          break
        default:
          setError('Unauthorized: ' + code + ' : ' + message)
      }
    }
  }

  useEffect(() => setDialogOpen(open), [open])

  const handleClose = () => {
    setDialogOpen(false)
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={dialogOpen}>
      <Card sx={{ width: '320px' }}>
        {isAlert && (
          <Alert
            severity="error"
            onClose={() => {
              setIsAlert(false)
            }}
          >
            {error}
          </Alert>
        )}
        {isSuccess && (
          <Alert
            severity="success"
            onClose={() => {
              setIsSuccess(false)
            }}
          >
            設定を変更しました。
          </Alert>
        )}
        <CardHeader title="MFA設定"></CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <QRCode value={token} />
            </Grid>
            <TextField
              sx={{ py: 2 }}
              label="検証コード"
              type="number"
              {...register('code')}
              size="small"
              fullWidth
              error={'code' in errors}
              helperText={errors.code?.message}
            />
            <FormControlLabel label={<Typography variant="caption">MFAを利用します</Typography>} control={<Checkbox size="small" {...register('enable')} />} />
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" size="large" fullWidth onClick={handleSubmit(onSubmit)}>
              MFA設定
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  )
}
