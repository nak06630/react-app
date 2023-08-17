import { Link, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { FC } from 'react'
import { NavigationGroupItem } from '../NavigationItemType'
import { Link as RouterLink } from 'react-router-dom'

export type NavGroupHeaderProps = {
  /** グループ項目 */
  item: NavigationGroupItem
  /** ナビゲーションの番地 */
  navIndexes: number[]
  /** 開閉フラグをトグルする */
  onToggle: () => void
}

export const NavGroupHeader: FC<NavGroupHeaderProps> = ({ item, navIndexes, onToggle }) => {
  const Icon = item.icon
  const depth = navIndexes.length - 1

  return (
    <Link component={RouterLink} to={item.href} underline="none" color="inherit">
      <ListItemButton
        color="primary"
        sx={{ minHeight: '56px' }}
        onClick={() => {
          onToggle()
        }}
      >
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={item.title} inset={depth < 1 && Icon == null} />
        {depth === 0 && <ExpandMoreIcon />}
      </ListItemButton>
    </Link>
  )
}
