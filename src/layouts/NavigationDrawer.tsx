import { Box, Drawer as MuiDrawer, DrawerProps, Toolbar } from '@mui/material'
import { CSSObject, styled } from '@mui/material/styles'
import { FC, useMemo, useState } from 'react'

const MiniVariantDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isHover' && prop !== 'width' && prop !== 'keepMounted'
})<DrawerProps & { width: number; isHover?: boolean }>(({ theme, open, width, isHover }) => {
  const drawerWidth = open
    ? width
    : // border分加える
      `calc(${theme.spacing(7)} + 1px)`
  const drawerAndPaperStyles: CSSObject = {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden'
  }
  return {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    ...drawerAndPaperStyles,
    '& .MuiDrawer-paper': {
      ...drawerAndPaperStyles,
      width: isHover ? width : drawerWidth
    }
  }
})

export type NavigationDrawerChildProps = {
  /** ドロワー部分hover時 */
  isHover: boolean
  /** ドロワーオープン時 */
  isOpen: boolean
  /** ドロワーのバリアント状態 */
  variant: NavigationDrawerProps['variant']
}

export type NavigationDrawerProps = {
  /** 開閉フラグ */
  isOpen: boolean
  /** ドロワーの幅 */
  width?: number
  /** バリアント */
  variant: 'temporary' | 'permanent'
  /** 閉じる時 */
  onClose: DrawerProps['onClose']
}

import { useNavigationMenu } from './useNavigationMenu'
import { NavigationList } from './NavigationList/NavigationList'

export const NavigationDrawer: FC<NavigationDrawerProps> = ({ isOpen, width = 250, variant, onClose }) => {
  const [isHover, setIsHover] = useState(false)
  const Drawer = variant === 'temporary' ? MuiDrawer : MiniVariantDrawer
  const { items } = useNavigationMenu()

  const childContent = useMemo(() => {
    return <NavigationList items={items} forceCollapse={variant === 'permanent' && !isHover && !isOpen} />
  }, [items, isHover, isOpen, variant])

  const additionalProps =
    variant === 'permanent'
      ? {
          isHover
        }
      : {}
  return (
    <Drawer
      open={isOpen}
      width={width}
      anchor="left"
      variant={variant}
      keepMounted
      {...additionalProps}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
      onClose={onClose}
    >
      {variant === 'permanent' && <Toolbar />}
      <Box sx={{ width, overflowX: 'hidden', overflowY: 'auto' }}>{childContent}</Box>
    </Drawer>
  )
}
