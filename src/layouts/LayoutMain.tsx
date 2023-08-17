import { useState, useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Menu, MenuItem, Box, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'
import { NavigationDrawer } from '@/layouts/NavigationDrawer'

const title = process.env.VITE_TITLE
const drawerWidth = 240

Auth.configure(awsconfig)

export default function Layout() {
  const user = useRecoilValue(userState)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [isOpen, setIsOpen] = useState(true)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOut = async () => {
    try {
      await Auth.signOut()
      navigate('/')
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  useEffect(() => {
    if (!pathname.match(/^\/experimental\//)) {
      if (!user) navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="h6" component="div">
            {user?.name}
          </Typography>
          {
            <div>
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={signOut}>Sign out</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        isOpen={isOpen}
        variant={'permanent'}
        width={drawerWidth}
        onClose={() => {
          setIsOpen(false)
        }}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
