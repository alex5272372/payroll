import React from 'react'
import Header from '@/components/Header'
import { Disclosure } from '@headlessui/react'
import MainMenu from './MainMenu'
import ProfileDropdown from './ProfileDropdown'
import MobileMenuButton from './MobileMenuButton'
import MobileMenu from './MobileMenu'
import { signIn } from '@/auth'
import { signOut } from '@/auth'

const navigation = [
  { name: 'Calendar', current: true },
  { name: 'Catalogs', current: false },
  { name: 'Documents', current: false },
  { name: 'Reports', current: false },
]

const userNavigation = [
  { name: 'Profile', onClick: () => {} },
  { name: 'Sign in', onClick: async () => {
    await signIn()
  } },
  { name: 'Sign out', onClick: async () => {
    await signOut()
  } },
]

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="h-16 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <MainMenu navigation={navigation}></MainMenu>
          <ProfileDropdown userNavigation={userNavigation}></ProfileDropdown>
          <MobileMenuButton></MobileMenuButton>
        </div>

        <MobileMenu navigation={navigation} userNavigation={userNavigation}></MobileMenu>
      </Disclosure>

      <Header />
      {children}
    </div>
  )
}

export default Layout
