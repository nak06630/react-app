import { Link } from 'react-router-dom'

export default function ImageListPage() {
  return (
    <div>
      装置詳細ページ
      <br />
      <div>
        <Link to="/groups/1111/hosts/">hosts/</Link>
      </div>
      <div>
        <Link to="/groups/1111/hosts/2222/">hosts/2222/</Link>
      </div>
      <div>
        <Link to="/groups/1111/settings/">settings/</Link>
      </div>
    </div>
  )
}
