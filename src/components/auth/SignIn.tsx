import { useState } from 'react'
import { Box, Alert, Button, Stack, TextField, Typography, Grid, Paper, Avatar } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Auth } from 'aws-amplify'
import awsconfig from '@/aws-exports'
import { useSetRecoilState } from 'recoil'
import { userState } from '@/store/user'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

Auth.configure(awsconfig)

interface SampleFormInput {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required('⚠ メールアドレスを入力してください').email('⚠ メールアドレス形式で入力してください'),
  password: yup
    .string()
    .required('⚠ パスワードを入力してください')
    .matches(/^(?=.*[!-/:-@[-`{-~])(?=.*[0-9])(?=.*[a-z])[!-~]{8,}$/, '⚠ パスワードの形式が不正です')
})

export default function CardSignIn() {
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SampleFormInput>({
    resolver: yupResolver(schema)
  })

  interface CognitoUser {
    signInUserSession: {
      idToken: {
        jwtToken: string
        payload: {
          sub: string
          'cognito:username': string
          name: string
          email: string
          phone_number?: string
          auth_time: number
          iat: number
          exp: number
        }
      }
    }
    challengeName: string
  }

  const onSubmit: SubmitHandler<SampleFormInput> = async (data) => {
    try {
      const user: CognitoUser = await Auth.signIn(data.email, data.password)

      const { challengeName } = user

      if (!challengeName) {
        const idToken = user.signInUserSession.idToken
        setUser({
          token: idToken.jwtToken,
          id: idToken.payload['cognito:username'],
          sub: idToken.payload.sub,
          name: idToken.payload.name,
          email: idToken.payload.email,
          phone_number: idToken.payload.phone_number,
          auth_time: idToken.payload.auth_time,
          iat: idToken.payload.iat,
          exp: idToken.payload.exp,
          signInResponse: user
        })

        navigate('/main/')
        return
      }

      // Todo:
      if (challengeName === 'SOFTWARE_TOKEN_MFA') {
        const code = prompt('トークンを入力してください。')
        if (!code) {
          alert('コードは必須です。')
          return
        }
        await Auth.confirmSignIn(user, code, 'SOFTWARE_TOKEN_MFA')
        const idToken = user.signInUserSession.idToken
        setUser({
          token: idToken.jwtToken,
          id: idToken.payload['cognito:username'],
          sub: idToken.payload.sub,
          name: idToken.payload.name,
          email: idToken.payload.email,
          phone_number: idToken.payload.phone_number,
          auth_time: idToken.payload.auth_time,
          iat: idToken.payload.iat,
          exp: idToken.payload.exp,
          signInResponse: user
        })
        navigate('/main/')
        // Todo:
      } else if (challengeName === 'NEW_PASSWORD_REQUIRED') {
        // const { requiredAttributes } = user.challengeParam
        const newPassword = prompt('新しいパスワードを入力してください。')
        if (!newPassword) {
          alert('新しいパスワードは必須です。')
          return
        }
        await Auth.completeNewPassword(user, newPassword)
        navigate('/main/')
      } else {
        console.log(challengeName)
      }
    } catch (error: any) {
      setIsAlert(true)
      const { code, message }: { code?: string; message?: string } = error
      switch (code) {
        case 'UserNotFoundException':
        case 'NotAuthorizedException':
          setError('ユーザー名またはパスワードが違います。')
          break
        default:
          setError('Unauthorized: ' + code + ' : ' + message)
      }
    }
  }

  return (
    <Grid>
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
      <Paper elevation={3} sx={{ p: 4, width: '440px', m: '20px auto' }}>
        <Grid container direction="column" alignItems="center">
          <Avatar sx={{ bgcolor: '#002b62' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant={'h5'} sx={{ m: '30px' }}>
            ログイン
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField label="ユーザーID" type="email" size="small" {...register('email')} error={'email' in errors} helperText={errors.email?.message} />
            <TextField
              label="パスワード"
              type="password"
              size="small"
              {...register('password')}
              error={'password' in errors}
              helperText={errors.password?.message}
            />
          </Stack>

          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              ログイン
            </Button>

            <Typography variant="caption">
              <Link href="/signup">アカウントを作成します</Link>
            </Typography>
            <Typography variant="caption" display="block">
              <Link href="/forgotPassword">パスワードを忘れました</Link>
            </Typography>
            <Typography variant="caption" display="block">
              <Link href="/experimental/">実験用</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Grid>
  )
}
