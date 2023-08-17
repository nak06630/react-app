import { FC } from 'react'

/** 単一ナビゲーション */
export type NavigationSingleItem = {
  icon?: FC
  title: string
  href: string
}

/** グループナビゲーション */
export type NavigationGroupItem = {
  icon?: FC
  title: string
  href: string
  subs: NavigationItem[] | []
}

/** ナビゲーション項目 */
export type NavigationItem = NavigationSingleItem | NavigationGroupItem
