'use client'
import React from 'react'
import Image from 'next/image'
import { MenuItem, TabItem, TabState } from '@/types'
import Header from './Header'
import MainMenuDropdown from './MainMenuDropdown'
import ProfileDropdown from './ProfileDropdown'
import { navigation } from '@/lib'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

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
    <nav className={'flex space-x-4 py-2 px-4 bg-gray-800'}>
      <Link href="/">
        <Image
          alt="Logo"
          src="/logo.png"
          className="h-8 w-8 rounded-md cursor-pointer"
          height={32}
          width={32}
        />
      </Link>

      {authNavigation.map((item: MenuItem) =>
        <MainMenuDropdown key={item.id} item={item}></MainMenuDropdown>)}

      <ProfileDropdown
        navigation={authUserNavigation || []}
        user={session?.user}
      ></ProfileDropdown>
    </nav>

    <Header tabState={tabState} setTabState={setTabState} />
    {children}
  </>
}

export default Layout
