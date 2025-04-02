import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { MenuItem, TabItem } from '@/types'
import Header from './Header'
import MainMenuDropdown from './MainMenuDropdown'
import ProfileDropdown from './ProfileDropdown'
import { navigation } from '@/lib'

const tabs: TabItem[] = [
  { id: 'calendar', name: 'Calendar', active: true },
  { id: 'users', name: 'Users' },
]

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const session = await auth()
  const authNavigation = navigation.mainMenu.filter(item => (session?.user ? item.auth !== false : !item.auth))
  const authUserNavigation = navigation.userMenu.filter(item => (session?.user ? item.auth !== false : !item.auth))

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

      {authNavigation.map((item: MenuItem) => <MainMenuDropdown key={item.id} item={item}></MainMenuDropdown>)}

      <ProfileDropdown
        navigation={authUserNavigation || []}
        user={session?.user}
      ></ProfileDropdown>
    </nav>

    <Header tabs={tabs} />
    {children}
  </>
}

export default Layout
