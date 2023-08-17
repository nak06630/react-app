import { Link } from 'react-router-dom'
import { Card } from '@mui/material'

export default function ImageListPage() {
  return (
    <Card>
      設定一覧
      <br />
      <div>
        <Link to="/hosts/">hosts/</Link>
      </div>
      <div>
        <Link to="/hosts/1111/">hosts/1111/</Link>
      </div>
    </Card>
  )
}
