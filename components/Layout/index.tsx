import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'
import { auth } from '@/lib/auth'
import { MenuItem, TabItem } from '@/types'
import Header from './Header'
import MainMenuDropdown from './MainMenuDropdown'
import ProfileDropdown from './ProfileDropdown'
import { navigation } from '@/lib'
import { TabGroup } from '@headlessui/react'

const tabs: TabItem[] = [
  { id: 'calendar', name: 'Calendar', icon: CalendarIcon, active: true },
  { id: 'users', name: 'Users', icon: UserIcon },
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

    <TabGroup>
      <Header tabs={tabs} />
      {children}
    </TabGroup>
  </>
}

export default Layout
