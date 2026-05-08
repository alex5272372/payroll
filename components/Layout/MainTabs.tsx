import { useEffect, useReducer } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { TabItem, TabState } from '@/types'
import { MenuItemPath } from '@/types/enums/navigation'
import type { MenuItem } from '@/types/navigation'
import { navigation } from '@/lib/data/navigation'

type TabAction =
  | { type: 'init'; pathname: MenuItemPath }
  | { type: 'close'; index: number }

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case 'init': {
      let newState: TabState = state
      const storedTabState = localStorage.getItem('tabState')
      if (storedTabState) newState = { ...JSON.parse(storedTabState), activeTab: null }
      if (action.pathname === MenuItemPath.HOME) return newState

      let activeTab = newState.tabs.findIndex((tab: TabItem) => tab.menuPath === action.pathname)

      if (activeTab === -1) {
        newState.tabs.push({ menuPath: action.pathname })
        activeTab = newState.tabs.length - 1
      }
      newState.activeTab = activeTab

      localStorage.setItem('tabState', JSON.stringify(newState))
      return newState
    }
    case 'close': {
      const tabs: TabItem[] = state.tabs.filter((_, i: number) => i !== action.index)
      const activeTab: number | null =
        state.activeTab === null || tabs.length === 0 ? null
          : state.activeTab > 0 || state.activeTab > action.index || state.activeTab === tabs.length
            ? state.activeTab - 1 : state.activeTab

      const newState: TabState = { tabs, activeTab }
      localStorage.setItem('tabState', JSON.stringify(newState))
      return newState
    }
    default:
      return state
  }
}

const MainTabs = () => {
  const [tabState, dispatch] = useReducer(tabReducer, { tabs: [], activeTab: null })

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    dispatch({ type: 'init', pathname: pathname as MenuItemPath })
  }, [pathname])

  const closeTab = (event: React.MouseEvent, index: number) => {
    event.stopPropagation()

    dispatch({ type: 'close', index })

    if (index === tabState.activeTab) {
      const nextTabItem: TabItem | null = tabState.tabs[index + 1] || tabState.tabs[index - 1] || null
      router.push(nextTabItem === null ? MenuItemPath.HOME : nextTabItem.menuPath)
    }
  }

  const mapTabs = (tab: TabItem, index: number) => {
    const menuItem: MenuItem | undefined = navigation.find((item: MenuItem) => tab.menuPath === item.path)

    return <div
      key={index}
      className={`flex items-center h-8 py-1 px-2 rounded-t-md ${
        index === tabState.activeTab
          ? 'bg-gray-100 text-gray-900'
          : 'bg-gray-700 text-gray-100 hover:bg-gray-500'}`}
    >
      <Link
        href={tab.menuPath}
        className={`flex ${index !== tabState.activeTab && 'cursor-pointer'}`}
      >
        {menuItem && <menuItem.icon className='h-6' />}
        <p className='hidden md:block ml-2'>{menuItem?.name || '#'}</p>
      </Link>

      <XMarkIcon
        className={`ml-2 h-5 cursor-pointer ${index === tabState.activeTab
          ? 'hover:bg-gray-300'
          : 'hover:bg-gray-700'}`}
        onClick={e => closeTab(e, index)}
      />
    </div>
  }

  return <header className="flex h-10 space-x-2 pt-2 px-4 bg-gray-600">
    {tabState.tabs.map(mapTabs)}
  </header>
}

export default MainTabs
