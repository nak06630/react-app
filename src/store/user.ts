import { atom } from 'recoil'

interface User {
  token: string // idToken.jwtToken
  id: string // 'cognito:username'
  name: string
  email: string
  phone_number?: string
  auth_time: number
  iat: number
  exp: number
  signInResponse?: object // debug: Auth.signIn
}

export const userState = atom<User | null>({
  key: 'User',
  default: null,
  dangerouslyAllowMutability: true // https://zenn.dev/sikkim/articles/f63c6f9d365ecf
})
