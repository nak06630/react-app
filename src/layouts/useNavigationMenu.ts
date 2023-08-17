import { useState, useEffect } from 'react'
import { NavigationItem } from './NavigationList'
import { Dashboard, Home, Settings } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'

export const useNavigationMenu = () => {
  const { pathname } = useLocation()
  const [items, setItems] = useState<NavigationItem[]>([])

  useEffect(() => {
    let subs: NavigationItem[] = []
    const group = pathname.match(/^\/groups\/([^/]+)\//)

    /* 異常 */
    if (!group) {
      setItems([])
      return
    }

    /* アカウント */
    const accounts = pathname.match(/^\/groups\/([^/]+)\/accounts\//)
    if (accounts) {
      setItems([
        { title: 'アカウント', icon: Dashboard, href: `/groups/${group[1]}/accounts` },
        { title: 'ダッシュボード', icon: Dashboard, href: `/groups/${group[1]}/` }
      ])
      return
    }

    /* 装置詳細（groups/{gpid}/hosts/{htid} ）で追加メニューを開く */
    const host = pathname.match(/^\/groups\/([^/]+)\/hosts\/([0-9a-f]+)\//)
    if (host) {
      subs = [
        { title: '装置詳細', href: `/groups/${host[1]}/hosts/${host[2]}/` },
        { title: '装置設定', href: `/groups/${host[1]}/hosts/${host[2]}/settings/` }
      ]
    }

    setItems([
      { title: 'ダッシュボード', icon: Dashboard, href: `/groups/${group[1]}/` },
      { title: '拠点', icon: Home, href: `/groups/${group[1]}/sites/` },
      { title: '装置', icon: Settings, href: `/groups/${group[1]}/hosts/`, subs: subs },
      { title: '設定', icon: Settings, href: '/groups/1111/settings/' }
    ])
  }, [pathname])

  return { items }
}
