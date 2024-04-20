import { Routes, Route } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@mui/material'
import { Dashboard, Map as MapIcon, Edit, Hub, LineAxis, TableRowsOutlined } from '@mui/icons-material'

/** 実験用コードは @/components/experimental/ に配置 */
import Forms from './form/Forms'
import LineChart from './LineChart'
import Map from './Map'
import Vis from './Vis'
import Table from './table'

/** NavigationMenu */
export const ExperimentalMenu = () => {
  return [
    { title: 'Top', icon: Dashboard, href: `/experimental/` },
    { title: 'Forms', icon: Edit, href: `/experimental/form/` },
    { title: 'linechart', icon: LineAxis, href: `/experimental/linechart` },
    { title: 'map', icon: MapIcon, href: `/experimental/map` },
    { title: 'Vis', icon: Hub, href: `/experimental/vis` },
    { title: 'Table', icon: TableRowsOutlined, href: `/experimental/table/` }
  ]
}

/** Router (path は、/experimental は省略) */
export const ExperimentalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExperimentalPage />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/linechart" element={<LineChart />} />
      <Route path="/map" element={<Map />} />
      <Route path="/vis" element={<Vis />} />
      <Route path="/table" element={<Table />} />
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
