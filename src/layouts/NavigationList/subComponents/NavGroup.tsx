import { Collapse, List } from '@mui/material'
//import { FC, useEffect } from 'react'
import { FC } from 'react'

import { AccordionManager } from '../hooks/useAccordionManager'
import { NavigationGroupItem } from '../NavigationItemType'
import { NavGroupHeader } from './NavGroupHeader'
import { NavItem } from './NavItem'
//import { useLocation } from 'react-router-dom'

export type NavGroupProps = {
  /** グループ項目 */
  item: NavigationGroupItem
  /** ナビゲーションの番地 */
  navIndexes: number[]
  /** アコーディオン情報を管理するインスタンス */
  accordionManager: AccordionManager
}

export const NavGroup: FC<NavGroupProps> = ({ item, navIndexes, accordionManager }) => {
  const isOpen = true // const isOpen = accordionManager.isOpen(navIndexes)
  //  const { pathname } = useLocation()

  /*
   メニュー以外の手段でページ遷移した場合にメニューを開く
  useEffect(() => {
    if (item.href === pathname && !isOpen) {
      accordionManager.toggle(navIndexes)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
*/
  return (
    <>
      <NavGroupHeader
        item={item}
        navIndexes={navIndexes}
        onToggle={() => {
          accordionManager.toggle(navIndexes)
        }}
      />
      <Collapse in={isOpen} timeout="auto">
        <List disablePadding>
          {item.subs.map((subItem, index) =>
            'subs' in subItem ? (
              <NavGroup key={index} item={subItem} navIndexes={[...navIndexes, index]} accordionManager={accordionManager} />
            ) : (
              <NavItem key={index} item={subItem} navIndexes={[...navIndexes, index]} />
            )
          )}
        </List>
      </Collapse>
    </>
  )
}
