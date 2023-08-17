import { Routes, Route, Link } from 'react-router-dom'
import { Button } from '@mui/material'

import Home from './components/Home'
import SignIn2 from './SignIn2'
import Forms from './Forms'
import LineChart from './LineChart'
import Map from './Map'
import Vis from './Vis'
import SampleReactTable from './SampleReactTable'
import NotFound from '@/components/error/NotFound'

// pages/experimnental/componentsに実験用のコンポーネントをおいてここに追加する。
const experimentals = [
  { path: 'signin2', component: <SignIn2 /> },
  { path: 'forms', component: <Forms /> },
  { path: 'linechart', component: <LineChart /> },
  { path: 'map', component: <Map /> },
  { path: 'vis', component: <Vis /> },
  { path: 'samplereacttable', component: <SampleReactTable /> },
  { path: '404', component: <NotFound /> }
]

export default function Experimental() {
  return (
    <>
      <nav>
        <Button component={Link} to="/">
          Main
        </Button>
        {experimentals.map((item) => (
          <Button key={item.path} component={Link} to={'/experimental/' + item.path}>
            {item.path}
          </Button>
        ))}
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        {experimentals.map((item) => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
      </Routes>
    </>
  )
}
