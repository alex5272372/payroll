import React from 'react'
import Header from './Header'
import { Disclosure } from '@headlessui/react'
import MainMenu from './MainMenu'
import ProfileDropdown from './ProfileDropdown'
import MobileMenuButton from './MobileMenuButton'
import MobileMenu from './MobileMenu'
import { auth } from '@/auth'

const userNavigation = [
  { id: 'profile', name: 'Profile', auth: true },
  { id: 'signOut', name: 'Sign out', auth: true },
  { id: 'signIn', name: 'Sign in', auth: false },
]

const navigation = [
  { id: 'calendar', name: 'Calendar' },
  { id: 'catalogs', name: 'Catalogs', auth: true },
  { id: 'documents', name: 'Documents', auth: true },
  { id: 'reports', name: 'Reports', auth: true },
]

const tabs = [
  { id: 'calendar', name: 'Calendar', active: true },
  { id: 'users', name: 'Users' },
]

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const session = await auth()
  const authUserNavigation = userNavigation.filter(item => session?.user ? item.auth !== false : !item.auth)
  const authNavigation = navigation.filter(item => session?.user ? item.auth !== false : !item.auth)

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="py-2 px-4 flex items-center justify-between">
          <MainMenu navigation={authNavigation}></MainMenu>
          <ProfileDropdown
            navigation={authUserNavigation}
            user={session?.user}
          ></ProfileDropdown>
          <MobileMenuButton></MobileMenuButton>
        </div>

        <MobileMenu
          navigation={authNavigation}
          userNavigation={authUserNavigation}
          user={session?.user}
        ></MobileMenu>
      </Disclosure>

      <Header tabs={tabs} />
      {children}
    </div>
  )
}

export default Layout
