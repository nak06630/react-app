import { Link } from 'react-router-dom'

export default function ImageListPage() {
  return (
    <div>
      装置一覧ページ
      <br />
      <div>
        <Link to="/groups/1111/hosts/3333/">hosts/3333/</Link>
      </div>
      <div>
        <Link to="/groups/1111/settings/">settings/</Link>
      </div>
    </div>
  )
}
