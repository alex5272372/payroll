'use client'
import React from 'react'
import { TabItem, TabState } from '@/types'
import MainTabs from './MainTabs'
import MainMenu from './MainMenu'
import { navigation } from '@/lib'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Layout = ({ children }: { children: React.ReactNode; }) => {
  const [tabState, setTabState] = React.useState<TabState>({ tabs: [], activeTab: null })

  const { data: session } = useSession()
  const pathname = usePathname()

  const authNavigation = navigation.main.filter(item => (session?.user ? item.auth !== false : !item.auth))
  const authUserNavigation = navigation.user.filter(item => (session?.user ? item.auth !== false : !item.auth))

  React.useEffect(() => {
    let newTabState: TabState = { tabs: [], activeTab: null }
    const storedTabState = localStorage.getItem('tabState')
    if (storedTabState) newTabState = { ...JSON.parse(storedTabState), activeTab: null }

    const menuPath = pathname.split('/').filter(Boolean)
    if (menuPath.length) {
      let activeTab = newTabState.tabs.findIndex((tab: TabItem) =>
        tab.menuPath.every((item: string, index: number) => item === menuPath[index]))

      if (activeTab === -1) {
        newTabState.tabs.push({ menuPath })
        activeTab = newTabState.tabs.length - 1
      }
      newTabState.activeTab = activeTab
    }

    setTabState(newTabState)
    localStorage.setItem('tabState', JSON.stringify(newTabState))
  }, [pathname])

  return <>
    <MainMenu authNavigation={authNavigation} authUserNavigation={authUserNavigation} />
    <MainTabs tabState={tabState} setTabState={setTabState} />
    {children}
  </>
}

export default Layout
