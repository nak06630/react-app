import { Routes, Route } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@mui/material'
import { Dashboard, Map as MapIcon, Edit, Hub, LineAxis, AccountCircle, TableRowsOutlined } from '@mui/icons-material'

/** 実験用コードは @/components/experimental/ に配置 */
import SignIn2 from '@/components/experimental/SignIn2'
import Forms from '@/components/experimental/Forms'
import LineChart from '@/components/experimental/LineChart'
import Map from '@/components/experimental/Map'
import Vis from '@/components/experimental/Vis'
import SampleReactTable from '@/components/experimental/SampleReactTable'

/** NavigationMenu */
export const ExperimentalMenu = () => {
  return [
    { title: 'Top', icon: Dashboard, href: `/experimental/` },
    { title: 'Signin2', icon: AccountCircle, href: `/experimental/signin2` },
    { title: 'Forms', icon: Edit, href: `/experimental/forms` },
    { title: 'linechart', icon: LineAxis, href: `/experimental/linechart` },
    { title: 'map', icon: MapIcon, href: `/experimental/map` },
    { title: 'Vis', icon: Hub, href: `/experimental/vis` },
    { title: 'SampleReactTable', icon: TableRowsOutlined, href: `/experimental/samplereacttable` }
  ]
}

/** Router (path は、/experimental は省略) */
export const ExperimentalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExperimentalPage />} />
      <Route path="/signin2" element={<SignIn2 />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/linechart" element={<LineChart />} />
      <Route path="/map" element={<Map />} />
      <Route path="/vis" element={<Vis />} />
      <Route path="/samplereacttable" element={<SampleReactTable />} />
    </Routes>
  )
}

/** ExperimentalPage(TopPage) */
export default function ExperimentalPage() {
  return (
    <Card>
      <CardHeader title="Experimental" />
      <CardContent>左メニュー参照</CardContent>
    </Card>
  )
}
