import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import Login from '@/pages/index'

import LayoutMain from '@/layouts/LayoutMain'

import Main from '@/pages/main/index'
import Accounts from '@/pages/accounts/'
//import Hosts from '@/pages/groups/[gpid]/hosts'
//import Host from '@/pages/groups/[gpid]/hosts/[htid]'
//import Settings from '@/pages/groups/[gpid]/settings'

import { ExperimentalRoutes } from '@/pages/experimental'
import NotFound from '@/components/error/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<LayoutMain />}>
          <Route path="/main/" element={<Main />} />
          <Route path="/groups/:gpid/" element={<Main />} />
          <Route path="/groups/:gpid/accounts/" element={<Accounts />} />
        </Route>
        <Route element={<LayoutMain />}>
          <Route path="/experimental/*" element={<ExperimentalRoutes />} />
        </Route>
        {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs that we don't have explicit routes for. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
