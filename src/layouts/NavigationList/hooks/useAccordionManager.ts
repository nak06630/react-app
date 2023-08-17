import { useState } from 'react'

type AccordionState = {
  /** トップ階層で開いているindex番号 */
  depth0: number[]
}

/** ナビゲーションの番地 */
type NavIndexes = number[]

export type AccordionManager = {
  /** アコーディオンをトグルする */
  toggle: (navIndexes: NavIndexes) => void
  /** アコーディオンの開閉フラグの取得 */
  isOpen: (navIndexes: NavIndexes) => boolean
}

export type UseAccordionManagerOptions = {
  /** 一時的に全て閉じている状態にするか */
  isTemporaryAllClose?: boolean
}

/**
 * 開閉フラグを管理するhooks
 */
export const useAccordionManager = ({ isTemporaryAllClose }: UseAccordionManagerOptions = {}): AccordionManager => {
  const [accordionState, setAccordionState] = useState<AccordionState>({
    depth0: []
  })

  return {
    toggle: (navIndexes) => {
      const [depth0Index, depth1Index] = navIndexes
      // トップ階層のtoggleの場合
      if (depth1Index == null) {
        if (accordionState.depth0.includes(depth0Index)) {
          setAccordionState({
            ...accordionState,
            depth0: accordionState.depth0.filter((openIndex) => openIndex !== depth0Index)
          })
        } else {
          setAccordionState({
            ...accordionState,
            depth0: [depth0Index]
          })
        }
        return
      }
    },
    isOpen: (navIndexes) => {
      if (isTemporaryAllClose) {
        return false
      }

      const [depth0Index] = navIndexes
      return accordionState.depth0.includes(depth0Index)
    }
  }
}
