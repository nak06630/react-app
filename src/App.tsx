import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { Button } from '@mui/material'

import Login from '@/pages/index'
import Main from '@/pages/main/index'
import Accounts from '@/pages/accounts/'
import Hosts from '@/pages/groups/[gpid]/hosts'
import Host from '@/pages/groups/[gpid]/hosts/[htid]'
import Settings from '@/pages/groups/[gpid]/settings'

import LayoutMain from '@/layouts/LayoutMain'

import Experimental from '@/pages/experimental/index'
import NotFound from '@/components/error/NotFound'

function Layout() {
  return (
    <>
      <nav>
        <Button component={Link} to="/">
          Main
        </Button>
        <Button component={Link} to="/experimental/">
          Experimental
        </Button>
      </nav>
      <hr />
      {/* An <Outlet> renders whatever child route is currently active, so you can think about this <Outlet> as a placeholder for the child routes we defined above. */}
      <Outlet />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<LayoutMain />}>
          <Route path="/main/" element={<Main />} />
          <Route path="/groups/:gpid/" element={<Main />} />
          <Route path="/groups/:gpid/accounts/" element={<Accounts />} />
          <Route path="/groups/:gpid/sites/" element={<Accounts />} />
          <Route path="/groups/:gpid/hosts/" element={<Hosts />} />
          <Route path="/groups/:gpid/hosts/:htid/" element={<Host />} />
          <Route path="/groups/:gpid/settings/*" element={<Settings />} />
          <Route path="/accounts/" element={<Accounts />} />
        </Route>
        <Route path="/experimental/*" element={<Experimental />} />
        {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs that we don't have explicit routes for. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
