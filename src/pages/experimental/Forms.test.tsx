import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, beforeEach, test, expect, vi } from 'vitest'
import Forms from './Forms'

const setup = () => {
  const user = userEvent.setup()
  render(<Forms />)
  return { user }
}

describe('Forms', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('送信時、window.alertに値が渡される', async () => {
    const { user } = setup()
    window.alert = vi.fn()

    // TextFieldの例 type=password は、screen.getByLabelText('パスワード') になるので注意
    await user.type(screen.getByRole('textbox', { name: 'メールアドレス' }), 'sample@example.com')

    // RadioGroup の例
    await user.click(screen.getByRole('radio', { name: 'りんご' }))

    // Selectの例
    // 1. Select をクリックして選択肢（option）のリストを画面表示する。id以外の参照方法不明
    await user.click(within(screen.getByTestId('せれくと')).getByRole('button'))
    // 2. 続けて表示された option のうち、1つ目をクリックする。
    await user.click(screen.getAllByRole('option')[1])

    // CheckboxGroup の例
    await user.click(screen.getByRole('checkbox', { name: 'りんご3' }))

    // submitボタンの例
    await user.click(screen.getByRole('button', { name: '送信' }))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            text1: 'sample@example.com',
            radio1: 'apple',
            select1: 'orange2',
            checkbox1: ['apple3']
          },
          null,
          2
        )
      )
    })
  })

  test('メールアドレスが未入力の場合、エラーメッセージが表示される', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: '送信' }))
    await waitFor(() => {
      expect(screen.getByText('⚠ メールアドレスを入力してください')).toBeInTheDocument()
    })
  })
})
