import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, test, expect, vi } from 'vitest'
import SignIn2 from './SignIn2'

const setup = () => {
  const user = userEvent.setup()
  window.alert = vi.fn()
  render(<SignIn2 />)
  const userid = screen.getByRole('textbox', { name: 'ユーザーID' })
  const passwd = screen.getByLabelText('パスワード') // type: password は getByRoleでは参照できない。
  const forgot = screen.getByRole('checkbox', { name: 'パスワードを忘れました' })
  const submit = screen.getByRole('button', { name: 'サインイン' })
  return { user, userid, passwd, forgot, submit }
}

describe('SignIn', () => {
  test('すべての情報が正しく入力されている場合は、入力情報が取得できる', async () => {
    const { user, userid, passwd, forgot, submit } = setup()
    await user.type(userid, 'sample@example.com')
    await user.type(passwd, 'P@ssW0rd')
    await user.click(forgot)
    await user.click(submit)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(JSON.stringify({ id: 'sample@example.com', pass: 'P@ssW0rd', checkbox: false }, null, 2))
    })
  })

  test('ユーザーIDが未入力の場合、エラーメッセージが表示される', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: 'サインイン' }))

    await waitFor(() => {
      expect(screen.getByText('⚠ ユーザーIDが入力されていません。')).toBeInTheDocument()
      expect(screen.getByText('⚠ パスワードが入力されていません。')).toBeInTheDocument()
    })
  })

  test('パスワードが未入力の場合、エラーメッセージが表示される', async () => {
    const { user } = setup()
    await user.type(screen.getByRole('textbox', { name: 'ユーザーID' }), 'sample@example.com')
    await user.click(screen.getByRole('button', { name: 'サインイン' }))

    await waitFor(() => {
      expect(screen.getByText('⚠ パスワードが入力されていません。')).toBeInTheDocument()
    })
  })
})
