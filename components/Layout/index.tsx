'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuItem, TabState } from '@/types'
import Header from './Header'
import MainMenuDropdown from './MainMenuDropdown'
import ProfileDropdown from './ProfileDropdown'
import { navigation } from '@/lib'
import { TabGroup } from '@headlessui/react'
import { useSession } from 'next-auth/react'

const Layout = ({ children }: { children: React.ReactNode; }) => {
  const [tabState, setTabState] = React.useState<TabState>({ tabs: [], activeTab: null })
  
  const { data: session } = useSession()
  const authNavigation = navigation.mainMenu.filter(item => (session?.user ? item.auth !== false : !item.auth))
  const authUserNavigation = navigation.userMenu.filter(item => (session?.user ? item.auth !== false : !item.auth))

  React.useEffect(() => {
    const storedTabState = localStorage.getItem('tabState')
    if (storedTabState) {
      setTabState(JSON.parse(storedTabState))
    }
  }, [])

  return <>
    <nav className={'flex space-x-4 py-2 px-4 bg-gray-800'}>
      <Link href="/">
        <Image
          alt="Logo"
          src="/logo.png"
          className="h-8 w-8 rounded-md"
          height={32}
          width={32}
        />
      </Link>

      {authNavigation.map((item: MenuItem) =>
        <MainMenuDropdown key={item.id} item={item} tabState={tabState}></MainMenuDropdown>)}

      <ProfileDropdown
        navigation={authUserNavigation || []}
        user={session?.user}
      ></ProfileDropdown>
    </nav>

    <TabGroup>
      <Header tabState={tabState} />
      {children}
    </TabGroup>
  </>
}

export default Layout
