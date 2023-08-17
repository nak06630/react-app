import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, test, expect, vi } from 'vitest'
import SignIn from '@/components/auth/SignIn'

const mockedUsedNavigate = vi.fn()
vi.mock('react-router-dom', () => {
  return { useNavigate: () => mockedUsedNavigate }
})

vi.mock('recoil', async () => {
  const actual: any = await vi.importActual('recoil')
  return { ...actual, useSetRecoilState: () => vi.fn() }
})

vi.mock('aws-amplify', () => {
  return {
    Auth: {
      configure: () => vi.fn(),
      signIn: (email: string, password: string) => {
        console.log(email, password)
        return {
          signInUserSession: {
            idToken: {
              jwtToken: 'dummy',
              payload: {
                'cognito:username': 'test@example.com'
              }
            }
          }
        }
        // return { challengeName: 'SOFTWARE_TOKEN_MFA' }
      }
    }
  }
})

const setup = () => {
  const user = userEvent.setup()
  render(<SignIn />)
  const userid = screen.getByRole('textbox', { name: 'ユーザーID' })
  const passwd = screen.getByLabelText('パスワード') // type: password は getByRoleでは参照できない。
  const submit = screen.getByRole('button', { name: 'ログイン' })
  return { user, userid, passwd, submit }
}

describe('SignIn', () => {
  test('すべての情報が正しく入力されている場合はページ遷移', async () => {
    const { user, userid, passwd, submit } = setup()
    await user.type(userid, 'sample@example.com')
    await user.type(passwd, 'P@ssW0rd')
    await user.click(submit)

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledWith('/main/')
    })
  })

  test('ユーザーIDが未入力の場合、エラーメッセージが表示される', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: 'ログイン' }))

    await waitFor(() => {
      expect(screen.getByText('⚠ メールアドレスを入力してください')).toBeInTheDocument()
    })
  })

  test('パスワードが未入力の場合、エラーメッセージが表示される', async () => {
    const { user } = setup()
    await user.type(screen.getByRole('textbox', { name: 'ユーザーID' }), 'sample@example.com')
    await user.click(screen.getByRole('button', { name: 'ログイン' }))

    await waitFor(() => {
      expect(screen.getByText('⚠ パスワードを入力してください')).toBeInTheDocument()
    })
  })
})
