import { useState, useEffect } from 'react'
import { NavigationItem } from './NavigationList'
import { Dashboard, Home, Settings } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { ExperimentalMenu } from '@/pages/experimental/index'

// pages/experimnental/componentsに実験用のコンポーネントをおいてここに追加する。
export const useNavigationMenu = () => {
  const { pathname } = useLocation()
  const [items, setItems] = useState<NavigationItem[]>([])

  useEffect(() => {
    let subs: NavigationItem[] = []

    if (pathname.match(/^\/experimental\//)) {
      setItems(ExperimentalMenu)
      return
    }

    /* アカウント */
    const accounts = pathname.match(/^\/groups\/([^/]+)\/accounts\//)
    if (accounts) {
      setItems([
        { title: 'アカウント', icon: Dashboard, href: `/groups/${accounts[1]}/accounts` },
        { title: 'ダッシュボード', icon: Dashboard, href: `/groups/${accounts[1]}/` }
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
      /* returnしない */
    }

    const group = pathname.match(/^\/groups\/([^/]+)\//)
    if (group) {
      setItems([
        { title: 'ダッシュボード', icon: Dashboard, href: `/groups/${group[1]}/` },
        { title: '拠点', icon: Home, href: `/groups/${group[1]}/sites/` },
        { title: '装置', icon: Settings, href: `/groups/${group[1]}/hosts/`, subs: subs },
        { title: '設定', icon: Settings, href: '/groups/1111/settings/' }
      ])
    } else {
      console.log('[useNavigationMenu] Error')
      setItems([])
    }
  }, [pathname])

  return { items }
}
