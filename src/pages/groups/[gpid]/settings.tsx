import { Link } from 'react-router-dom'

export default function ImageListPage() {
  return (
    <div>
      ダッシュボード
      <br />
      <div>
        <Link to="/groups/111/hosts/">hosts/</Link>
      </div>
      <div>
        <Link to="/groups/111/settings/">settings/</Link>
      </div>
    </div>
  )
}
