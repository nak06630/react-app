import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import { userState } from '@/store/user'
import { Card, CardContent, CardHeader } from '@mui/material'

export default function Main() {
  const user = useRecoilValue(userState)
  return (
    <>
      <Card>
        <CardHeader title="Main" />
        <CardContent>
          <div>ログインしました。</div>
          <div>
            <Link to="/groups/1111/accounts/">accounts/</Link>
          </div>
          <div>
            <Link to="/groups/1111/hosts/">hosts/</Link>
          </div>
          <div>
            <Link to="/groups/1111/hosts/1111/">hosts/1111/</Link>
          </div>
        </CardContent>
      </Card>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}
