import { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'
import { useRecoilState } from 'recoil'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { userState } from '@/store/user'
import { Alert, Button, Card, CardContent, CardHeader, Dialog, Stack, TextField } from '@mui/material'

Auth.configure(awsconfig)

interface FormInput {
  code: string
}

const schema = yup.object({
  code: yup.string().required('必須です')
})

export default function DialogMFASetup(props: any) {
  const { open, onClose } = props
  const [user] = useRecoilState(userState)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
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
      if (!user) return
      const data = await Auth.setupTOTP(user)
      setToken('otpauth://totp/AWSCognito:' + user.id + '?secret=' + data + '&issuer=Next-App')
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (open) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!user) return
    const code = data.code
    try {
      const res = await Auth.verifyTotpToken(user, code)
      await Auth.setPreferredMFA(user, 'TOTP')
      console.log(res)
    } catch (error: any) {
      setIsAlert(true)
      const { code, message }: { code?: string; message?: string } = error
      switch (code) {
        case 'CodeMismatchException':
          setError('無効なコードが入力されました。')
          break
        case 'LimitExceededException':
          setError('しばらく待ってから再登録してください。')
          break
        case 'ExpiredCodeException':
          setError('コードは無効です。')
          break
        case 'NotAuthorizedException':
        case 'CodeDeliveryFailureException':
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
      <Card>
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
        <CardHeader title="MFA設定"></CardHeader>
        <CardContent>
          <QRCode value={token} />
          <Stack spacing={3}>
            <TextField required label="検証コード" type="code" {...register('code')} error={'code' in errors} helperText={errors.code?.message} />
            <Button color="primary" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
              MFA設定
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Dialog>
  )
}
