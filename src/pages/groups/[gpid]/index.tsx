import { Card, CardHeader, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Page() {
  return (
    <Card>
      <CardHeader title="ダッシュボード" />
      <CardContent>
        <div>
          <Link to="/groups/1111/hosts/">hosts/</Link>
        </div>
        <div>
          <Link to="/groups/1111/settings/">settings/</Link>
        </div>
      </CardContent>
    </Card>
  )
}
